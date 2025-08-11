import type { FC } from "react";

import { ComposerPrimitive, ThreadPrimitive } from "@assistant-ui/react";
import { SendHorizontalIcon, StopCircleIcon } from "lucide-react";

import { TooltipIconButton } from "./tooltip-icon-button";
import { ComposerAttachments, ComposerAddAttachment } from "./attachment";
import { ComposerProvider } from "./composer-provider";
import { ComposerScreenshots, ComposerAddScreenshot } from "./screenshot";

import { ComposerSelections, ComposerAddSelection } from "./selection";

import { ComposerVoices, ComposerAddVoice } from "./voice-input";
const senderId = process.env.NEXT_PUBLIC_SENDER_ID;

export const Composer: FC = () => {
  return (
    <>
      {senderId === "tray" || senderId === "web" ? (
        <ComposerProvider>
          <ComposerPrimitive.Root className="focus-within:border-ring/20 flex w-full flex-wrap items-end rounded-lg border bg-inherit px-2.5 shadow-sm transition-colors ease-in">
            <ComposerAttachments />
            <ComposerVoices />

            <ComposerAddAttachment />
            <ComposerAddVoice />
            <ComposerPrimitive.Input
              rows={1}
              autoFocus
              placeholder="Write a message..."
              className="placeholder:text-muted-foreground max-h-40 flex-grow resize-none border-none bg-transparent px-2 py-4 text-sm outline-none focus:ring-0 disabled:cursor-not-allowed"
            />
            <ComposerAction />
          </ComposerPrimitive.Root>
        </ComposerProvider>
      ) : (
        <ComposerProvider>
          <ComposerPrimitive.Root className="flex w-full flex-wrap items-end rounded-lg bg-inherit px-2.5 shadow-sm transition-colors ease-in">
            <ComposerAttachments />
            <ComposerScreenshots />
            <ComposerSelections />
            <ComposerVoices />

            <ComposerAddAttachment />
            <ComposerAddScreenshot />
            <ComposerAddSelection />
            <ComposerAddVoice />
          </ComposerPrimitive.Root>
          <ComposerPrimitive.Root className="focus-within:border-ring/20 flex w-full flex-wrap items-end rounded-lg border bg-inherit px-2.5 shadow-sm transition-colors ease-in">
            <ComposerPrimitive.Input
              rows={1}
              autoFocus
              placeholder="Write a message..."
              className="placeholder:text-muted-foreground max-h-40 flex-grow resize-none border-none bg-transparent px-2 py-4 text-sm outline-none focus:ring-0 disabled:cursor-not-allowed"
            />
            <ComposerAction />
          </ComposerPrimitive.Root>
        </ComposerProvider>
      )}
    </>
  );
};

const ComposerAction: FC = () => {
  return (
    <>
      <ThreadPrimitive.If running={false}>
        <ComposerPrimitive.Send asChild>
          <TooltipIconButton
            tooltip="Send"
            variant="default"
            className="my-2.5 size-8 p-2 transition-opacity ease-in"
          >
            <SendHorizontalIcon />
          </TooltipIconButton>
        </ComposerPrimitive.Send>
      </ThreadPrimitive.If>
      <ThreadPrimitive.If running>
        <ComposerPrimitive.Cancel asChild>
          <TooltipIconButton
            tooltip="Cancel"
            variant="default"
            className="my-2.5 size-8 p-2 transition-opacity ease-in"
          >
            <StopCircleIcon />
          </TooltipIconButton>
        </ComposerPrimitive.Cancel>
      </ThreadPrimitive.If>
    </>
  );
};
