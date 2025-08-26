import { Link } from "@tanstack/react-router";
import {
  // IconBrandGithub,
  IconArrowBackUp as IconBack,
  // IconSquare,
} from "@tabler/icons-react";
// import Logo from "@/assets/ai.png";
import { UserAuthForm } from "./components/user-auth-form";

export default function SignIn() {
  return (
    <div className="relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link to="/" className="flex underline">
            <span className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <IconSquare className="size-4" />
            </span>
            DHNT.io
          </Link>
          &nbsp;AI Lab
        </div>

        <img
          src={Logo}
          className="relative m-auto"
          width={301}
          height={60}
          alt="dhnt.io"
        />

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg"></p>
            <footer className="flex text-sm">
              All roads lead to Rome
              <a href="https://github.com/qiangli/ai" target="_blank">
                <IconBrandGithub size={18} />
              </a>
            </footer>
          </blockquote>
        </div>
      </div> */}

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-left">
            <p className="text-muted-foreground text-sm">
              <Link to="/" className="flex">
                <IconBack className="size-4" />
                Back
              </Link>
            </p>
          </div>
          <UserAuthForm />
          <p className="text-muted-foreground px-8 text-center text-sm">
            By clicking login, you agree to our{" "}
            <a
              href="/terms"
              className="hover:text-primary underline underline-offset-4"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="hover:text-primary underline underline-offset-4"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
