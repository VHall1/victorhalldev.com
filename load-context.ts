import { type Octokit } from "@octokit/core";
import { type Api } from "@octokit/plugin-rest-endpoint-methods";
import {
  type AppLoadContext,
  type SessionStorage,
} from "@remix-run/cloudflare";
import { type PlatformProxy } from "wrangler";
// this runs before vite finishes loading plugins, so have to use the full path here.
import { type Cache } from "@epic-web/cachified";
import { cloudflareKvCacheAdapter } from "cachified-adapter-cloudflare-kv";
import github from "./app/utils/github.server";
import session, { type Theme } from "./app/utils/session.server";

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
    session: SessionStorage<{
      theme: Theme;
    }>;
    github: Octokit & Api;
    kv: Cache;
  }
}

type GetLoadContext = (args: {
  request: Request;
  context: { cloudflare: Cloudflare }; // load context _before_ augmentation
}) => AppLoadContext;

// Shared implementation compatible with Vite, Wrangler, and Cloudflare Pages
export const getLoadContext: GetLoadContext = ({ context }) => {
  const env = context.cloudflare.env;
  return {
    ...context,
    kv: cloudflareKvCacheAdapter({ kv: env.__CACHE }),
    session: session(env),
    github: github(env),
  };
};
