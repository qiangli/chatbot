"use client";

import type { ReactNode } from "react";
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
  const senderId = process.env.NEXT_PUBLIC_SENDER_ID || "unknown-sender";

  return (
    <>
      <Hub url={"ws://localhost:58080/hub"} sender={`assistant-${senderId}`} />
      <AssistantRuntimeProvider runtime={runtime}>
        {children}
      </AssistantRuntimeProvider>
    </>
  );
}
