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
  const runtime = useLocalRuntime(
    new CustomModelAdapter({
      debug: true,
    }),
    {
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
    },
  );
  const [runtimeConfig, setRuntimeConfig] = useState({
    senderId: "",
    hubUrl: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/config/assistant");
        setRuntimeConfig({
          senderId: data.senderId ?? "",
          hubUrl: data.hubUrl ?? "",
        });
      } catch (error) {
        console.error("Could not fetch runtime configuration", error);
        setRuntimeConfig({
          senderId: "assistant-unknown",
          hubUrl: "",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Hub
        url={runtimeConfig.hubUrl}
        sender={`assistant-${runtimeConfig.senderId}`}
      />
      <AssistantRuntimeProvider runtime={runtime}>
        {children}
      </AssistantRuntimeProvider>
    </>
  );
}
