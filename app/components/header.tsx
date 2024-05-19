import { Link } from "@remix-run/react";
import { CodeIcon, MenuIcon } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  return (
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
  );
}
