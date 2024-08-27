import { unstable_defineLoader as defineLoader } from "@remix-run/cloudflare";
import { Await, Link, useLoaderData } from "@remix-run/react";
import { ExternalLinkIcon } from "lucide-react";
import { Suspense } from "react";
import { Shell } from "~/components/shell";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
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
              <Link to="#about">Learn more</Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      {/* TODO: move this data to some sort of CMS */}
      <section className="container py-8 lg:py-20 px-6" id="about">
        <h2 className="text-3xl pb-10 font-semibold tracking-tight">
          Experience
        </h2>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col lg:flex-row gap-2">
            <span className="min-w-36">Sep 2023 - Now</span>
            <div>
              <h3 className="text-lg font-semibold">Software Developer @ AO</h3>
              <ul className="ml-6 list-disc [&>li]:mt-2">
                <li>
                  Collaborated with a cross-functional team, directly engaging
                  with stakeholders and designers to gather requirements and
                  feedback, ensuring projects were aligned with business
                  objectives
                </li>
                <li>
                  Worked closely with designers to quickly deliver high-fidelity
                  applications using Figma designs, improving user experience
                  and accelerating the development timeline
                </li>
                <li>
                  Enhanced developer experience by integrating ESLint, Prettier,
                  and TypeScript into the React codebase, resulting in more
                  consistent code quality and early detection of potential
                  errors
                </li>
                <li>
                  Streamlined the CI/CD pipeline by implementing GitHub Actions
                  and pre-commit hooks, incorporating automated cloud testing,
                  linting, and formatting to improve deployment efficiency.
                </li>
                <li>
                  Tackled technical debt by upgrading critical parts of the
                  codebase, including migrating to Webpack 5 and React 17, to
                  enhance performance and maintainability
                </li>
                <li>
                  Refactored and documented several React components, making the
                  codebase more modular, reusable, and easier to maintain
                </li>
                <li>
                  Expanded my skill set by transitioning to a Full Stack role,
                  learning Laravel to contribute to server-side development and
                  support both frontend and backend projects
                </li>
                <li>
                  Conducted detailed code reviews with a focus on React, while
                  continuously learning and incorporating best practices from
                  peer feedback
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-2">
            <span className="min-w-36">Feb 2021 - Aug 2023</span>
            <div>
              <h3 className="text-lg font-semibold">
                Full Stack Software Engineer @ Woven
              </h3>
              <ul className="ml-6 list-disc [&>li]:mt-2">
                <li>
                  Collaborated with a diverse cross-functional team, directly
                  engaging with stakeholders and customers to gather
                  requirements and feedback, ensuring alignment with business
                  goals
                </li>
                <li>
                  Partnered with designers to rapidly deliver high-fidelity
                  applications based on Figma designs, enhancing user experience
                  and speeding up the development cycle
                </li>
                <li>
                  Spearheaded the creation of a free trial product, leading to a
                  significant reduction in customer acquisition and training
                  costs
                </li>
                <li>
                  Enhanced developer experience by integrating ESLint, Prettier,
                  and TypeScript into the React codebase, leading to more
                  consistent code quality and catching potential errors earlier
                  in the development process
                </li>
                <li>
                  Optimized the CI/CD pipeline by implementing GitHub Actions
                  and pre-commit hooks, adding automated cloud testing, linting,
                  and formatting to streamline the deployment process
                </li>
                <li>
                  Addressed technical debt by upgrading key parts of the
                  codebase, including migration to Webpack 5 and adopting
                  react-query, which improved data management and security
                </li>
                <li>
                  Refactored and migrated several React components from
                  class-based to functional components with hooks, resulting in
                  more reusable and maintainable code
                </li>
                <li>
                  Transitioned to a Full Stack role, learning Ruby on Rails to
                  help maintain the server application, contributing to both
                  frontend and backend development
                </li>
                <li>
                  Conducted thorough code reviews with a focus on React, while
                  also learning and applying best practices from peer reviews
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-8 lg:py-20 px-6" id="projects">
        <h2 className="text-3xl pb-10 font-semibold tracking-tight">
          My Projects
        </h2>
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
      </section>
    </Shell>
  );
}

export const loader = defineLoader(({ context }) => {
  const projects = downloadCMSFiles(context, "projects");
  return { projects };
});
