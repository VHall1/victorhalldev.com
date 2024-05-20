import { Octokit as createOctokit } from "@octokit/core";
import { throttling } from "@octokit/plugin-throttling";

const Octokit = createOctokit.plugin(throttling);

const octokit = new Octokit({
  auth: process.env.BOT_GITHUB_TOKEN,
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
      octokit.log.warn(`Abuse detected for request ${method} ${url}`);
    },
  },
});
