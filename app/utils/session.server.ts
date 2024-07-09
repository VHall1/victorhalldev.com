import { createCookieSessionStorage } from "@remix-run/cloudflare";
import { type AppLoadContext } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";

export const themeKeys = ["dark", "light"] as const;
export type Theme = (typeof themeKeys)[number];

export default (env: Env) => {
  invariant(env.SESSION_SECRET, "SESSION_SECRET must be set");
  return createCookieSessionStorage<{ theme: Theme }>({
    cookie: {
      name: "__session",
      httpOnly: true,
      // 7 days
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
      secrets: [env.SESSION_SECRET],
      secure: process.env.NODE_ENV === "production",
    },
  });
};

export async function getTheme(request: Request, context: AppLoadContext) {
  const cookie = request.headers.get("Cookie");
  const session = await context.session.getSession(cookie);
  return session.get("theme");
}

export function isValidTheme(theme: string): theme is Theme {
  return themeKeys.includes(theme as Theme);
}
