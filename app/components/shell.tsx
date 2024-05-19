import { SiGithub, SiLinkedin } from "@icons-pack/react-simple-icons";
import { Link } from "@remix-run/react";
import { CodeIcon, MenuIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "./ui/button";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="sticky top-0 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
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
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="#"
          >
            Contact
          </Link>
        </nav>
        <Button className="md:hidden" size="icon" variant="outline">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </header>
      <main>{children}</main>
      <footer className="bg-accent py-6 md:py-8">
        <div className="container px-4 md:px-6 flex items-center justify-between">
          <p className="text-sm text-accent-foreground">
            Made with ♥️ by Victor Hall
          </p>
          <div className="flex items-center gap-4">
            <Link
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
              to="https://github.com/vhall1"
            >
              <SiGithub className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
              to="https://linkedin.com/in/vhall1/"
            >
              <SiLinkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
