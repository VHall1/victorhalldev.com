import { SiGithub, SiLinkedin } from "@icons-pack/react-simple-icons";
import { Link, useFetcher, useRouteLoaderData } from "@remix-run/react";
import { MoonIcon, SunIcon } from "lucide-react";
import type { loader } from "~/root";
import { Button } from "./ui/button";

export function Footer() {
  const themeFetcher = useFetcher({ key: "theme" });
  const rootLoaderData = useRouteLoaderData<typeof loader>("root");
  const theme =
    themeFetcher?.formData?.get("nextTheme")?.toString() ??
    rootLoaderData?.theme;
  const isDarkMode = theme === "dark";

  return (
    <footer className="bg-accent py-6 md:py-8">
      <div className="container px-4 md:px-6 flex items-center justify-between">
        <p className="text-sm text-accent-foreground">
          Made with ♥️ by Victor Hall
        </p>
        <div className="flex items-center">
          <Link
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 mr-4"
            to="https://github.com/vhall1"
          >
            <SiGithub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 mr-1"
            to="https://linkedin.com/in/vhall1/"
          >
            <SiLinkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <themeFetcher.Form
            method="post"
            action="/action/set-theme"
            preventScrollReset
          >
            <input
              type="hidden"
              name="nextTheme"
              value={isDarkMode ? "light" : "dark"}
            />
            <Button
              size="icon"
              variant="link"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
              type="submit"
              aria-label="toggle colour scheme"
            >
              {isDarkMode ? (
                <MoonIcon className="h-5 w-5" />
              ) : (
                <SunIcon className="h-5 w-5" />
              )}
            </Button>
          </themeFetcher.Form>
        </div>
      </div>
    </footer>
  );
}
