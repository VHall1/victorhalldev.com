import { Link } from "@remix-run/react";
import { Shell } from "~/components/shell";
import { Button } from "~/components/ui/button";
import { Projects } from "./projects";

export default function Index() {
  return (
    <Shell>
      <section
        className="py-12 md:py-20 lg:py-24 h-screen flex items-center"
        id="hero"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Hey, I&apos;m Victor 👨‍💻
            </h1>
            <p className="text-lg md:text-xl">
              I&apos;m a Full Stack Developer and a React enthusiast
            </p>
            <Button size="lg" asChild>
              <Link to="#projects">View Projects</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-20 lg:py-24" id="projects">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start gap-4 mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
              My Projects
            </h2>
          </div>
          <Projects />
        </div>
      </section>
    </Shell>
  );
}
