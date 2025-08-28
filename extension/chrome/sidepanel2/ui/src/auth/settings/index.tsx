import { Link } from "@tanstack/react-router"
import { IconArrowBackUp as IconBack } from "@tabler/icons-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ExternalLink } from "@/components/ui/external-link"
import AuthLayout from "../auth-layout"
import { TokenForm } from "./components/token-form"

export default function Settings() {
  return (
    <AuthLayout>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg tracking-tight">
            <span className="flex flex-col space-y-2 text-left">
              <p className="text-muted-foreground text-sm">
                <Link to="/" className="flex">
                  <IconBack className="size-4" />
                  Back
                </Link>
              </p>
            </span>
            Authentication
          </CardTitle>
          <CardDescription>
            Enter your access token below.
            <br />
            Don't have one?{" "}
            <ExternalLink href="https://ai.dhnt.io/settings/">
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
  )
}
