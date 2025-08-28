import { createFileRoute } from "@tanstack/react-router"
import { SignOut } from "@/auth/signout"

export const Route = createFileRoute("/_authenticated/signout")({
  component: SignOut,
})
