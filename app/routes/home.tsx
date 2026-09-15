import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "RouteSync Admin" },
    {
      name: "description",
      content: "AI-powered real-time public transport intelligence platform",
    },
  ];
}

export default function Home() {
  return <Welcome />;
}