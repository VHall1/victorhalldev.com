import { Link } from "@remix-run/react";
import { ExternalLinkIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "~/components/ui/card";

export function Projects() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card
          key={`projects-${project.source}`}
          className="transition-all hover:scale-[1.02] hover:shadow-md"
        >
          <img
            src={project.image}
            className="aspect-[16/10] rounded-t-lg"
            alt=""
          />
          <CardContent className="py-4">
            <CardTitle>{project.name}</CardTitle>
            <CardDescription className="mt-2">
              {project.description}
            </CardDescription>
          </CardContent>
          <CardFooter className="flex gap-1.5">
            <Button size="sm" asChild>
              <Link to={project.demo} className="flex items-center gap-1.5">
                Demo
                <ExternalLinkIcon className="h-3 w-3" />
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link to={project.source} className="flex items-center gap-1.5">
                Source
                <ExternalLinkIcon className="h-3 w-3" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

// TODO: load these from a cms?
const projects = [
  {
    name: "🔥 FS Chat",
    image: "/fs-chat.png",
    description:
      "Chat with others in real-time. Built with React, TypeScript, WebSockets and Ruby on Rails. Hosted on Vercel",
    source: "https://github.com/VHall1/fs-chat",
    demo: "https://app.fs-chat.dev/",
  },
  {
    name: "📈 Expense Tracker",
    image: "/expense-tracker.png",
    description:
      "Expense tracker app. Built with React and Typescript. Original project by @bradtraversy. Hosted on Netlify",
    source: "https://github.com/VHall1/react-expense-tracker",
    demo: "https://pensive-ptolemy-58671a.netlify.app/",
  },
  {
    name: "⛅ React Weather",
    image: "/weather.png",
    description:
      "Simple weather app. Built with React and OpenWeatherMap. Hosted on Netlify",
    source: "https://github.com/VHall1/react-weather",
    demo: "https://vigilant-leakey-c36a17.netlify.app/",
  },
  {
    name: "Tic Tac Toe",
    description:
      "Play the classic Tic-Tac-Toe game. Built with React, Vite and Tailwind. Tested with Cypress",
    source: "https://stackblitz.com/edit/vitejs-vite-19ndkp",
    demo: "https://stackblitz.com/edit/vitejs-vite-19ndkp",
  },
  {
    name: "Todo List",
    description:
      "Simple todo list app. Built with React, Vite, Redux and Tailwind. Tested with Cypress",
    source: "https://stackblitz.com/edit/vitejs-vite-bxxnm7",
    demo: "https://stackblitz.com/edit/vitejs-vite-bxxnm7",
  },
];
