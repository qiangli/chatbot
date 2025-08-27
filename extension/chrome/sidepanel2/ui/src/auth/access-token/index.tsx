import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "@/components/ui/external-link";
import AuthLayout from "../auth-layout";
import { TokenForm } from "./components/token-form";

export default function AccessToken() {
  return (
    <AuthLayout>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle className="text-lg tracking-tight">
            Authentication
          </CardTitle>
          <CardDescription>
            Enter your access token below.
            <br />
            Don't have one?{" "}
            <ExternalLink href="https://ai.dhnt.io/settings/access-token">
              Generate
            </ExternalLink>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TokenForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </AuthLayout>
  );
}
