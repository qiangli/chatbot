"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { AssistantRuntimeProvider, useLocalRuntime } from "@assistant-ui/react";
import {
  CompositeAttachmentAdapter,
  WebSpeechSynthesisAdapter,
} from "@assistant-ui/react";

import CustomModelAdapter from "@/lib/ws/provider";
import Hub from "@/components/hub";
import { ImageAdapter, PDFAdapter, TextAdapter } from "@/adapters";

// const BASE_URL = "https://ai.dhnt.io";
const BASE_URL = "http://localhost:18080";

// https://www.assistant-ui.com/docs/runtimes/custom/local
// pnpm dlx shadcn@latest add "https://r.assistant-ui.com/attachment"
export function CustomRuntimeProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const runtime = useLocalRuntime(new CustomModelAdapter({}), {
    adapters: {
      attachments: new CompositeAttachmentAdapter([
        // new SimpleImageAttachmentAdapter(),
        new ImageAdapter(),
        // new SimpleTextAttachmentAdapter(),
        new TextAdapter(),
        //
        new PDFAdapter(),
      ]),
      speech: new WebSpeechSynthesisAdapter(),
    },
  });
  const [runtimeConfig, setRuntimeConfig] = useState({
    senderId: "",
    hubUrl: "",
  });

  useEffect(() => {
    // Fetch configuration from a runtime configuration API
    const fetchConfig = async () => {
      try {
        const { data } = await axios.get(BASE_URL + "/config/sidepanel");
        setRuntimeConfig({
          senderId: `sidepanel-${data.senderId}`,
          hubUrl: data.hubUrl || "wss://ai.dhnt.io/hub",
        });
      } catch (error) {
        console.error("Could not fetch runtime configuration", error);
        setRuntimeConfig({
          senderId: "sidepanel-unkown",
          hubUrl: "wss://ai.dhnt.io/hub",
        });
      }
    };

    fetchConfig();
  }, []);

  return (
    <>
      <Hub url={runtimeConfig.hubUrl} sender={`sp-${runtimeConfig.senderId}`} />
      <AssistantRuntimeProvider runtime={runtime}>
        {children}
      </AssistantRuntimeProvider>
    </>
  );
}
