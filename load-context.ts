import { type SessionStorage } from "@remix-run/server-runtime";
import { type PlatformProxy } from "wrangler";
import { type Theme } from "~/utils/session.server";

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Omit<PlatformProxy<Env>, "dispose">;
    session: SessionStorage<{
      theme: Theme;
    }>;
  }
}
