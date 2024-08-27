import { SiGithub, SiLinkedin } from "@icons-pack/react-simple-icons";
import { Link, useFetcher, useRouteLoaderData } from "@remix-run/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { loader } from "~/root";
import { Separator } from "./ui/separator";

export function Footer() {
  const themeFetcher = useFetcher({ key: "theme" });
  const rootLoaderData = useRouteLoaderData<typeof loader>("root");
  const theme =
    themeFetcher?.formData?.get("nextTheme")?.toString() ??
    rootLoaderData?.theme;
  const isDarkMode = theme === "dark";

  return (
    <footer>
      <div className="container py-8 lg:py-20 pb-20 px-4">
        <Separator />
        <div className="pt-8 flex items-center justify-between">
          <p className="leading-7">Made with ♥️ by Victor Hall</p>
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
      </div>
    </footer>
  );
}
