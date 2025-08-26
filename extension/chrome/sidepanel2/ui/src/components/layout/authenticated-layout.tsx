import { useEffect } from "react";
// import Cookies from 'js-cookie'
import { Outlet } from "@tanstack/react-router";
import { useAuth } from "@/stores/auth-store";
import { cn } from "@/lib/utils";
// import { SearchProvider } from '@/context/search-context'
import { useMe } from "@/hooks/use-me";
// import { SidebarProvider } from '@/components/ui/sidebar'
// import { AppSidebar } from '@/components/layout/app-sidebar'
// import SkipToMain from '@/components/skip-to-main'

interface Props {
  children?: React.ReactNode;
}

export function AuthenticatedLayout({ children }: Props) {
  // const defaultOpen = Cookies.get('sidebar_state') !== 'false'

  const { setUser } = useAuth();
  const { user, loading } = useMe();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setUser(user);
      }
    };

    fetchUserData();
  }, [user, setUser]);

  if (loading) return <div>Loading...</div>;

  console.log("user", user);

  return (
    // <SearchProvider>
    //   <SidebarProvider defaultOpen={defaultOpen}>
    //     <SkipToMain />
    //     <AppSidebar />
    <div
      id="content"
      className={cn(
        "ml-auto w-full max-w-full",
        "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
        "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
        "sm:transition-[width] sm:duration-200 sm:ease-linear",
        "flex h-svh flex-col",
        "group-data-[scroll-locked=1]/body:h-full",
        "has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh",
      )}
    >
      {children ? children : <Outlet />}
    </div>
    //   </SidebarProvider>
    // </SearchProvider>
  );
}
