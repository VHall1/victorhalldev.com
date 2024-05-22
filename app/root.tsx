import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "@remix-run/react";
import type { CustomHandle } from "types";
import tailwindStyles from "./styles/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyles },
  {
    rel: "icon",
    href: "https://res.cloudinary.com/davlbxibi/image/upload/v1716409614/remix-portfolio/byw1g36xmmfgv1di8m5h.png",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const matches = useMatches();
  const disableScripts = matches.some(
    (match) => (match.handle as CustomHandle | undefined)?.hydrate === false
  );

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Victor Hall</title>
        <Meta />
        <Links />
      </head>
      <body>
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
