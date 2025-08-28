import { createFileRoute } from "@tanstack/react-router"
import { Index } from "@/auth/home"

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
})
