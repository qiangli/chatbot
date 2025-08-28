import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Welcome() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription>Authentication is required</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <Link to={"/settings"}>
            <span>Signin with access token</span>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}
