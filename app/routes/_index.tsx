import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Await, Link, defer, useLoaderData } from "@remix-run/react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@victorhalldev/react";
import { Suspense } from "react";
import { Shell } from "~/components/shell";
import { downloadCMSFiles } from "~/utils/github.server";

export default function Index() {
  const { projects } = useLoaderData<typeof loader>();

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
          <Suspense fallback={<p>Loading projects...</p>}>
            <Await
              resolve={projects}
              errorElement={
                <p className="text-destructive">failed to load projects</p>
              }
            >
              {(resolvedProjects) => (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {resolvedProjects.map((rawProject) => {
                    const parsedProject = JSON.parse(rawProject.content) as {
                      title: string;
                      description: string;
                      demo: string;
                      source: string;
                    };
                    return (
                      <Card
                        key={`projects-${parsedProject.source}`}
                        className="transition-all hover:scale-[1.02] hover:shadow-md overflow-hidden flex flex-col"
                      >
                        <CardContent className="py-4">
                          <CardTitle>{parsedProject.title}</CardTitle>
                          <CardDescription className="mt-2">
                            {parsedProject.description}
                          </CardDescription>
                        </CardContent>
                        <CardFooter className="mt-auto flex gap-1.5">
                          <Button size="sm" asChild>
                            <Link
                              to={parsedProject.demo}
                              className="flex items-center gap-1.5"
                            >
                              Demo
                              <ExternalLinkIcon className="h-3 w-3" />
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link
                              to={parsedProject.source}
                              className="flex items-center gap-1.5"
                            >
                              Source
                              <ExternalLinkIcon className="h-3 w-3" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              )}
            </Await>
          </Suspense>
        </div>
      </section>
    </Shell>
  );
}

export function loader({ context }: LoaderFunctionArgs) {
  const projects = downloadCMSFiles(context, "projects");
  return defer({ projects });
}
