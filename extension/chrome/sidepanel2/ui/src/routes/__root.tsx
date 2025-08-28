import { QueryClient } from "@tanstack/react-query"
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
// import NotFoundError from "@/errors/not-found-error";
import { Index } from "@/auth/home"
import GeneralError from "@/errors/general-error"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { Toaster } from "@/components/ui/sonner"
import { NavigationProgress } from "@/components/navigation-progress"

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    return (
      <>
        <NavigationProgress />
        <Outlet />
        <Toaster duration={50000} />
        {import.meta.env.MODE === "development" && (
          <>
            <ReactQueryDevtools buttonPosition="bottom-left" />
            <TanStackRouterDevtools position="bottom-right" />
          </>
        )}
      </>
    )
  },
  // notFoundComponent: NotFoundError,
  notFoundComponent: Index,
  errorComponent: GeneralError,
})
