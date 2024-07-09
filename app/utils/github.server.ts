import {
  cachified,
  totalTtl,
  type Cache,
  type CacheEntry,
} from "@epic-web/cachified";
import { Octokit as createOctokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
import { throttling } from "@octokit/plugin-throttling";
import { type AppLoadContext } from "@remix-run/cloudflare";
import { LRUCache } from "lru-cache";

const Octokit = createOctokit.plugin(restEndpointMethods, throttling);

const lruInstance = new LRUCache<string, CacheEntry>({ max: 1000 });

const lru: Cache = {
  set(key, value) {
    const ttl = totalTtl(value?.metadata);
    return lruInstance.set(key, value, {
      ttl: ttl === Infinity ? undefined : ttl,
      start: value?.metadata?.createdTime,
    });
  },
  get(key) {
    return lruInstance.get(key);
  },
  delete(key) {
    return lruInstance.delete(key);
  },
};

export default (env: Env) => {
  return new Octokit({
    auth: env.CONTENT_GITHUB_TOKEN,
    throttle: {
      onRateLimit: (retryAfter, options) => {
        const method = "method" in options ? options.method : "METHOD_UNKNOWN";
        const url = "url" in options ? options.url : "URL_UNKNOWN";
        console.warn(
          `Request quota exhausted for request ${method} ${url}. Retrying after ${retryAfter} seconds.`
        );

        return true;
      },
      onSecondaryRateLimit: (_, options) => {
        const method = "method" in options ? options.method : "METHOD_UNKNOWN";
        const url = "url" in options ? options.url : "URL_UNKNOWN";
        // does not retry, only logs a warning
        console.warn(`Abuse detected for request ${method} ${url}`);
      },
    },
  });
};

export async function downloadCMSFiles(
  github: AppLoadContext["github"],
  relativeFileOrDirectory: string
) {
  const files = await downloadDirectory(
    github,
    `content/${relativeFileOrDirectory}`
  );
  return files.filter(({ path }) => !path.endsWith("$schema.json"));
}

const safePath = (s: string) => s.replace(/\\/g, "/");
async function downloadDirectory(
  github: AppLoadContext["github"],
  dir: string
): Promise<{ path: string; content: string }[]> {
  const dirList = await downloadDirList(github, dir);
  const result = await Promise.all(
    dirList.map(async ({ path: fileDir, type, sha }) => {
      switch (type) {
        case "file": {
          const content = await downloadFileBySha(github, sha);
          return { path: safePath(fileDir), content };
        }
        case "dir": {
          return downloadDirectory(github, fileDir);
        }
        default: {
          throw new Error(`Unexpected repo file type: ${type}`);
        }
      }
    })
  );

  return result.flat();
}

async function downloadFileBySha(
  github: AppLoadContext["github"],
  sha: string
) {
  return cachified({
    key: `file-${sha}`,
    cache: lru,
    // 15 minutes
    ttl: 1000 * 60 * 15,
    async getFreshValue() {
      const { data } = await github.rest.git.getBlob({
        owner: "vhall1",
        repo: "remix-portfolio",
        file_sha: sha,
      });
      const encoding = data.encoding as Parameters<typeof Buffer.from>["1"];
      return Buffer.from(data.content, encoding).toString();
    },
  });
}

async function downloadDirList(github: AppLoadContext["github"], path: string) {
  return cachified({
    key: `dir-${path}`,
    cache: lru,
    // 15 minutes
    ttl: 1000 * 60 * 15,
    async getFreshValue() {
      const resp = await github.rest.repos.getContent({
        owner: "vhall1",
        repo: "remix-portfolio",
        ref: "main",
        path,
      });
      const data = resp.data;
      if (!Array.isArray(data)) {
        throw new Error(
          `GitHub did not return an array of files while trying to download content from ${path}.`
        );
      }
      // costs a lil more to get fresh but saves cache space
      return data.map(({ path, type, sha }) => ({
        path,
        type,
        sha,
      }));
    },
  });
}
