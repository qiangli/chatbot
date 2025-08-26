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
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div>
              <Link to={"/signin"}>
                <span>{">  Sign In"}</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
