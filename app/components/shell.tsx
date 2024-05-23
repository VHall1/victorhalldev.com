import { Link } from "@remix-run/react";
import { CodeIcon, MenuIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";

export function Shell({ children }: { children: ReactNode }) {
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
      <Footer />
    </>
  );
}
