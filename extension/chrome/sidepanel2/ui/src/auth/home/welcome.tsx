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
      <div>
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription>Authentication is required</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div>
              <Link to={"/settings"}>
                <span>Signin with access token</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
