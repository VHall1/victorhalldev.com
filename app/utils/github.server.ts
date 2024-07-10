import { cachified } from "@epic-web/cachified";
import { Octokit as createOctokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
import { throttling } from "@octokit/plugin-throttling";
import { type AppLoadContext } from "@remix-run/cloudflare";
import { Buffer } from "node:buffer";

const Octokit = createOctokit.plugin(restEndpointMethods, throttling);

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

const safePath = (s: string) => s.replace(/\\/g, "/");

export async function downloadCMSFiles(
  context: AppLoadContext,
  relativeFileOrDirectory: string
) {
  const { github, kv } = context;

  async function downloadDirectory(
    dir: string
  ): Promise<{ path: string; content: string }[]> {
    const dirList = await downloadDirList(dir);
    const result = await Promise.all(
      dirList.map(async ({ path: fileDir, type, sha }) => {
        switch (type) {
          case "file": {
            const content = await downloadFileBySha(sha);
            return { path: safePath(fileDir), content };
          }
          case "dir": {
            return downloadDirectory(fileDir);
          }
          default: {
            throw new Error(`Unexpected repo file type: ${type}`);
          }
        }
      })
    );

    return result.flat();
  }

  async function downloadDirList(path: string) {
    return cachified({
      key: `dir-${path}`,
      cache: kv,
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

  async function downloadFileBySha(sha: string) {
    return cachified({
      key: `file-${sha}`,
      cache: kv,
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

  const files = await downloadDirectory(`content/${relativeFileOrDirectory}`);
  return files.filter(({ path }) => !path.endsWith("$schema.json"));
}
