import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetchers,
  useMatches,
  useRouteLoaderData,
} from "@remix-run/react";
import type { CustomHandle } from "types";
import tailwindStyles from "./styles/tailwind.css?url";
import { cn } from "./utils/cn";
import { getTheme } from "./utils/session.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyles },
  {
    rel: "icon",
    href: "https://res.cloudinary.com/davlbxibi/image/upload/v1716409614/remix-portfolio/byw1g36xmmfgv1di8m5h.png",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  // disables hydration if route handle includes { hydrate: false }
  const matches = useMatches();
  const disableScripts = matches.some(
    (match) => (match.handle as CustomHandle | undefined)?.hydrate === false
  );

  // get theme from loader or optimisically get value from theme fetcher (if available)
  const loaderData = useRouteLoaderData<typeof loader>("root");
  const themeFetcher = useFetchers().find((fetcher) => fetcher.key === "theme");
  const theme =
    themeFetcher?.formData?.get("nextTheme")?.toString() ?? loaderData?.theme;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Hey, I'm Victor. I'm a Full Stack Developer and a React enthusiast"
        />
        <title>Victor Hall</title>
        <Meta />
        <Links />
      </head>
      <body className={cn({ dark: theme === "dark" })}>
        {children}
        <ScrollRestoration />
        {disableScripts ? null : <Scripts />}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const theme = await getTheme(request);
  return { theme };
}
