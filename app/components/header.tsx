import { Link } from "@remix-run/react";
import { CodeIcon, MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";

export function Header() {
  return (
    <header className="fixed w-full top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-16 flex items-center justify-between">
        {/* Left */}
        <Link className="flex items-center gap-2" to="/#hero">
          <CodeIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">Victor Hall</span>
        </Link>

        {/* Right - Desktop */}
        <nav className="hidden md:flex items-center gap-4">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="/#hero"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="/#about"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="/#projects"
          >
            Projects
          </Link>
        </nav>

        {/* Right - Mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetClose>
              <span className="sr-only">Close</span>
            </SheetClose>
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
                to="/#about"
              >
                About
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
      </div>
    </header>
  );
}
