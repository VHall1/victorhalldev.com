import {
  unstable_defineLoader as defineLoader,
  type LinksFunction,
} from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetchers,
  useRouteLoaderData,
} from "@remix-run/react";
import globalsCss from "./globals.css?url";
import { cn } from "./utils/cn";
import { getTheme } from "./utils/session.server";

export const links: LinksFunction = () => [
  // The current vite implementation has an issue where styles may dissapear between hot reloads.
  // Following recommended workaround suggested by the Remix team:
  // https://remix.run/docs/en/main/guides/vite#styles-disappearing-in-development-when-document-remounts
  { rel: "stylesheet", href: globalsCss },
  {
    rel: "icon",
    href: "https://res.cloudinary.com/davlbxibi/image/upload/v1716409614/remix-portfolio/byw1g36xmmfgv1di8m5h.png",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  // Can't just straight up use the useLoaderData hook in the Layout export.
  // For a more nuanced explanation of why that's the case:
  // https://remix.run/docs/en/main/file-conventions/root#layout-export
  const loaderData = useRouteLoaderData<typeof loader>("root");

  // Eagerly load new theme regardless to avoid lag when transitioning between dark/light themes.
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
      <body className={cn({ dark: theme === "dark" })} suppressHydrationWarning>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export const loader = defineLoader(async ({ request, context }) => {
  const theme = await getTheme(request, context);
  return { theme };
});
