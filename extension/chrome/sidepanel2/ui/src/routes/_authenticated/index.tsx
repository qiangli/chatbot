import { createFileRoute } from "@tanstack/react-router";
import Home from "@/auth/home";

export const Route = createFileRoute("/_authenticated/")({
  component: Home,
});
