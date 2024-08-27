import {
  unstable_defineAction as defineAction,
  type ActionFunctionArgs,
} from "@remix-run/cloudflare";
import { isValidTheme } from "~/utils/session.server";

export const action = defineAction(
  async ({ request, context }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const nextTheme = formData.get("nextTheme")?.toString();
    if (!nextTheme || !isValidTheme(nextTheme)) {
      throw new Response(undefined, { status: 400 });
    }
    const cookie = request.headers.get("Cookie");
    const session = await context.session.getSession(cookie);
    session.set("theme", nextTheme);
    return new Response(undefined, {
      headers: { "Set-Cookie": await context.session.commitSession(session) },
    });
  }
);
