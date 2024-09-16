import { CodeIcon, Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Link } from "@remix-run/react";
import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@victorhalldev/react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-screen-xl h-14 flex items-center justify-between">
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
            to="/#projects"
          >
            Projects
          </Link>
        </nav>

        {/* Right - Mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="md:hidden">
              <HamburgerMenuIcon className="h-4 w-4" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetClose>
              <Cross2Icon className="h-4 w-4" />
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
