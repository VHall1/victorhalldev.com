import { Octokit as createOctokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
import { throttling } from "@octokit/plugin-throttling";

const safePath = (s: string) => s.replace(/\\/g, "/");

const Octokit = createOctokit.plugin(restEndpointMethods, throttling);

function getClient(token?: string) {
  return new Octokit({
    auth: token,
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
}

export async function downloadCMSFiles(
  relativeFileOrDirectory: string,
  token?: string
) {
  const files = await downloadDirectory(
    `content/${relativeFileOrDirectory}`,
    token
  );
  return files.filter(({ path }) => !path.endsWith("$schema.json"));
}

async function downloadDirectory(
  dir: string,
  token?: string
): Promise<{ path: string; content: string }[]> {
  const dirList = await downloadDirList(dir, token);
  const result = await Promise.all(
    dirList.map(async ({ path: fileDir, type, sha }) => {
      switch (type) {
        case "file": {
          const content = await downloadFileBySha(sha, token);
          return { path: safePath(fileDir), content };
        }
        case "dir": {
          return downloadDirectory(fileDir, token);
        }
        default: {
          throw new Error(`Unexpected repo file type: ${type}`);
        }
      }
    })
  );

  return result.flat();
}

async function downloadFileBySha(sha: string, token?: string) {
  const { data } = await getClient(token).rest.git.getBlob({
    owner: "vhall1",
    repo: "remix-portfolio",
    file_sha: sha,
  });
  const encoding = data.encoding as Parameters<typeof Buffer.from>["1"];
  return Buffer.from(data.content, encoding).toString();
}

async function downloadDirList(path: string, token?: string) {
  const resp = await getClient(token).rest.repos.getContent({
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

  return data;
}
