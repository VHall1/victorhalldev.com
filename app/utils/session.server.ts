import { createCookieSessionStorage } from "@remix-run/node";
import invariant from "tiny-invariant";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const themeKeys = ["dark", "light"] as const;
export type Theme = (typeof themeKeys)[number];

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<{ theme: Theme }>({
    cookie: {
      name: "__session",
      httpOnly: true,
      // 7 days
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
      secrets: [process.env.SESSION_SECRET],
      secure: process.env.NODE_ENV === "production",
    },
  });

export async function getTheme(request: Request) {
  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  return session.get("theme");
}

export function isValidTheme(
  theme: string
): theme is (typeof themeKeys)[number] {
  return themeKeys.includes(theme as (typeof themeKeys)[number]);
}

export { commitSession, destroySession, getSession };
