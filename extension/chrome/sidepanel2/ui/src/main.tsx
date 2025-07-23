import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

import { CustomRuntimeProvider } from "@/components/runtime-provider";
import { ThemeProvider } from "@/components/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CustomRuntimeProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <App />
      </ThemeProvider>
    </CustomRuntimeProvider>
  </StrictMode>,
);
