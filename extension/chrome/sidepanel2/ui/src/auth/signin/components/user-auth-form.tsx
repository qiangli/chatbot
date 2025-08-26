import { HTMLAttributes, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Link } from '@tanstack/react-router'
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

type UserAuthFormProps = HTMLAttributes<HTMLFormElement>;

const formSchema = z.object({
  email: z.email({
    error: (iss) => (iss.input === "" ? "Please enter your email" : undefined),
  }),
  password: z.string(),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "passwordless",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    console.log(data);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  const login = (url: string) => {
    window.location.href = url;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-3", className)}
        {...props}
      >
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">
              Authenticate with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={() => login("/cloud/login/github")}
          >
            <IconBrandGithub className="h-4 w-4" /> GitHub
          </Button>
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={() => login("/cloud/login/google")}
          >
            <IconBrandGoogle className="h-4 w-4" /> Google
          </Button>
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={() => login("/cloud/login/linkedin")}
          >
            <IconBrandLinkedin className="h-4 w-4" /> LinkedIn
          </Button>
        </div>
      </form>
    </Form>
  );
}
