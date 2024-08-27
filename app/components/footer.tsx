import { SiGithub, SiLinkedin } from "@icons-pack/react-simple-icons";
import { useFetcher, useRouteLoaderData } from "@remix-run/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { loader } from "~/root";
import type { action } from "~/routes/action.set-theme";

export function Footer() {
  const themeFetcher = useFetcher<typeof action>({ key: "theme" });
  const rootLoaderData = useRouteLoaderData<typeof loader>("root");
  const theme =
    themeFetcher?.formData?.get("nextTheme")?.toString() ??
    rootLoaderData?.theme;
  const isDarkMode = theme === "dark";

  return (
    <footer className="container px-0 bg-accent lg:bg-background border-t">
      <div className="container lg:px-0 py-8 flex items-center justify-between">
        <p className="leading-7">
          Made with ♥️ by <a href="https://github.com/vhall1">Victor Hall</a>
        </p>
        <div className="flex items-center">
          <a
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 mr-4"
            href="https://github.com/vhall1"
          >
            <SiGithub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 mr-1"
            href="https://linkedin.com/in/vhall1/"
          >
            <SiLinkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
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
