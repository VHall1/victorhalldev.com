import { SiGithub, SiLinkedin } from "@icons-pack/react-simple-icons";
import { Link, useFetcher, useRouteLoaderData } from "@remix-run/react";
import { CodeIcon, MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { loader } from "~/root";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";

export function Shell({ children }: { children: ReactNode }) {
  const themeFetcher = useFetcher();
  const rootLoaderData = useRouteLoaderData<typeof loader>("root");
  const isDarkMode = rootLoaderData?.theme === "dark";

  return (
    <>
      <header className="sticky top-0 z-50 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <Link className="flex items-center gap-2" to="/#hero">
          <CodeIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">Victor Hall</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="/#hero"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="/#projects"
          >
            Projects
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <Link className="flex items-center gap-2" to="/#hero">
                <CodeIcon className="h-6 w-6" />
                <span className="text-lg font-semibold">Victor Hall</span>
              </Link>
            </SheetHeader>
            <div className="flex flex-col gap-3 pl-6 pb-10 my-4">
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                to="/#hero"
              >
                Home
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                to="/#projects"
              >
                Projects
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </header>
      <main>{children}</main>
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
    </>
  );
}
