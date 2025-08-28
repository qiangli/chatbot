import React from "react";
// import { cn } from "@/lib/utils";
// import { Separator } from "@/components/ui/separator";
import { ProfileDropdown } from "./profile-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean;
  ref?: React.Ref<HTMLElement>;
}

export const Header = ({
  // className,
  // fixed,
  // children,
  ...props
}: HeaderProps) => {
  // const [offset, setOffset] = React.useState(0);

  // React.useEffect(() => {
  //   const onScroll = () => {
  //     setOffset(document.body.scrollTop || document.documentElement.scrollTop);
  //   };

  //   // Add scroll listener to the body
  //   document.addEventListener("scroll", onScroll, { passive: true });

  //   // Clean up the event listener on unmount
  //   return () => document.removeEventListener("scroll", onScroll);
  // }, []);

  return (
    // <header
    //   className={cn(
    //     "bg-background flex h-16 items-center gap-3 p-4 sm:gap-4",
    //     fixed && "header-fixed peer/header fixed z-50 w-[inherit] rounded-md",
    //     offset > 10 && fixed ? "shadow-sm" : "shadow-none",
    //     className,
    //   )}
    //   {...props}
    // >
    //   <Separator orientation="vertical" className="h-6" />
    //   {children}
    // </header>
    <header
      className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between"
      {...props}
    >
      <div className="flex items-center gap-2"></div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {/* <button onClick={navigateHome} className="btn btn-primary">
          <IconHome size={18} stroke={1.5} />
        </button> */}
        <ProfileDropdown />
      </div>
      {/* <Separator orientation="vertical" className="h-6" />
       {children} */}
    </header>
  );
};

Header.displayName = "Header";

export const TopHeader = () => {
  return (
    <Header>
      {/* <div>
        <ThemeToggle />
        <ProfileDropdown />
      </div> */}
    </Header>
  );
};
