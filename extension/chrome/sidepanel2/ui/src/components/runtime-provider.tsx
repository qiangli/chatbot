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
  // const senderId = process.env.NEXT_PUBLIC_SENDER_ID || "unknown-sender";
  // const hubUrl = process.env.NEXT_PUBLIC_HUB_URL || "ws://localhost:58080/hub";
  const [runtimeConfig, setRuntimeConfig] = useState({
    senderId: "",
    hubUrl: "",
  });

  useEffect(() => {
    // Fetch configuration from a runtime configuration API
    const fetchConfig = async () => {
      try {
        const { data } = await axios.get("https://ai.dhnt.io/api/config/sp");
        setRuntimeConfig({
          senderId: data.senderId || "unknown-sender",
          hubUrl: data.hubUrl || "ws://localhost:18080/hub",
        });
      } catch (error) {
        console.error("Could not fetch runtime configuration", error);
        setRuntimeConfig({
          senderId: "unknown-sender",
          hubUrl: "ws://localhost:18080/hub",
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
