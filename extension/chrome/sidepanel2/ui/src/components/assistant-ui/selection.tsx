"use client";

import type { FC } from "react";

import { useComposerRuntime } from "@assistant-ui/react";

import { TooltipIconButton } from "./tooltip-icon-button";
import { useComposerContext } from "./composer";

let counter = 1;

export const ComposerSelections: FC = () => {
  const { selectedText, setSelectedText } = useComposerContext();
  const composerRuntime = useComposerRuntime();

  if (!selectedText) {
    return null;
  }

  const name = `selected${counter++}.txt`;
  const file = new File([selectedText], name, { type: "text/plain" });
  composerRuntime.addAttachment(file);
  setSelectedText(null);

  return <></>;
};

export const ComposerAddSelection: FC = () => {
  const { copySelectedText } = useComposerContext();

  const add = (event: React.MouseEvent<HTMLButtonElement>) => {
    copySelectedText();
    event.preventDefault();
  };

  return (
    <TooltipIconButton
      className="my-2.5 size-8 p-2 transition-opacity ease-in"
      tooltip="Copy selection"
      variant="ghost"
      onClick={add}
    >
      <IconSelection />
    </TooltipIconButton>
  );
};

const IconSelection = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-file-earmark-text"
      viewBox="0 0 16 16"
    >
      <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
      <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
    </svg>
  );
};
