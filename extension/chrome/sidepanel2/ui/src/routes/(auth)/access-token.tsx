import { createFileRoute } from "@tanstack/react-router";
import AccessToken from "@/auth/access-token";

export const Route = createFileRoute("/(auth)/access-token")({
  component: AccessToken,
});
