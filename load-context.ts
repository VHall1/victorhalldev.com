import { type Octokit } from "@octokit/core";
import { type Api } from "@octokit/plugin-rest-endpoint-methods";
import { type SessionStorage } from "@remix-run/cloudflare";
import { type PlatformProxy } from "wrangler";
import { type Theme } from "~/utils/session.server";

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Omit<PlatformProxy<Env>, "dispose">;
    session: SessionStorage<{
      theme: Theme;
    }>;
    github: Octokit & Api;
  }
}
