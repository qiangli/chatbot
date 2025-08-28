import { createFileRoute } from "@tanstack/react-router"
import { SignIn } from "@/auth/signin"

export const Route = createFileRoute("/(auth)/signin")({
  component: SignIn,
})
