import { HTMLAttributes, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router"
import { useAuth } from "@/stores/auth-store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"

type TokenFormProps = HTMLAttributes<HTMLFormElement>

const formSchema = z.object({
  token: z.string().min(1, "Access token is required"),
})

export function TokenForm({ className, ...props }: TokenFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { accessToken, setAccessToken } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: accessToken ?? "",
    },
  })

  const navigate = useNavigate()

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    setAccessToken(data.token)

    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 3000);
    setIsLoading(false)
    navigate({ to: "/" })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-3", className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Your access token"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2" disabled={isLoading}>
          Sign In
        </Button>
      </form>
    </Form>
  )
}
