"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import { IconMoon, IconSun } from "@/components/ui/icons";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  React.useEffect(() => {
    const storedTheme = cookies.get("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [setTheme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        React.startTransition(() => {
          const newTheme = theme === "light" ? "dark" : "light";
          setTheme(newTheme);
          cookies.set("theme", newTheme, {
            expires: 365 * 100,
            path: "/",
            domain: ".openaide.localhost",
          });
        });
      }}
    >
      {!theme ? null : theme === "dark" ? (
        <IconSun className="transition-all" />
      ) : (
        <IconMoon className="transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

// import { useTheme } from "next-themes";

// const ThemeToggleButton = () => {
//   const { setTheme, resolvedTheme } = useTheme();

//   return (
//     <button
//       onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
//     >
//       {`Toggle ${resolvedTheme === "light" ? "dark" : "light"} mode`}
//     </button>
//   );
// };

// export default ThemeToggleButton;
