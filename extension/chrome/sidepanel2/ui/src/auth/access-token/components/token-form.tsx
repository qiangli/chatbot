import { HTMLAttributes, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { useAuth } from "@/stores/auth-store";
import { useNavigate } from "@tanstack/react-router";

// import { PasswordInput } from '@/components/password-input'

type TokenFormProps = HTMLAttributes<HTMLFormElement>;

const formSchema = z.object({
  // email: z.email({
  //   error: (iss) =>
  //     iss.input === '' ? 'Please enter your email' : undefined,
  // }),
  token: z.string().min(1, "Access token is required"),
});

export function TokenForm({ className, ...props }: TokenFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // email: '',
      token: "",
    },
  });

  // const { setAccessToken } = useAuth();
  const navigate = useNavigate();

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    console.log(data);

    // setAccessToken(data.token);
    localStorage.setItem("access-token", data.token);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    navigate({ to: "/" });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-3", className)}
        {...props}
      >
        {/* <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='guest@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl>
                <Input placeholder="Your access token" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2" disabled={isLoading}>
          Save
        </Button>
      </form>
    </Form>
  );
}
