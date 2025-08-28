import { createFileRoute } from "@tanstack/react-router"
import Settings from "@/auth/settings"

export const Route = createFileRoute("/(auth)/settings")({
  component: Settings,
})
