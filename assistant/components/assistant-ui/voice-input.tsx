"use client";

import type { FC } from "react";
import React, { useState } from "react";

import { useComposerRuntime } from "@assistant-ui/react";

import { TooltipIconButton } from "./tooltip-icon-button";
import { useComposerContext } from "./composer-provider";
import { TextEditor } from "./text-edit";

export const ComposerVoices: FC = () => {
  const { voiceData, setVoiceData } = useComposerContext();
  // const [isVisible, setIsVisible] = useState(false);
  const composerRuntime = useComposerRuntime();

  // useEffect(() => {
  //   console.log("voice data changed:", voiceData);
  //   setIsVisible(Boolean(voiceData));
  // }, [voiceData]);

  const handleRemove = () => {
    console.log("Removing voice data");
    // setIsVisible(false);
    setVoiceData(null);
  };

  // if (!isVisible) {
  //   return null;
  // }

  if (!voiceData) {
    return null;
  }
  composerRuntime.setText(voiceData);
  return (
    <TextEditor text={voiceData} closer={handleRemove} updater={setVoiceData} />
  );
};

export const ComposerAddVoice: FC = () => {
  const { startVoice, stopVoice } = useComposerContext();
  const [micOn, setMicOn] = useState(false);

  const toggleVoice = () => {
    if (micOn) {
      stopVoice();
      setMicOn(false);
    } else {
      startVoice(setMicOn);
    }
  };

  return (
    <TooltipIconButton
      className="my-2.5 size-8 p-2 transition-opacity ease-in"
      tooltip="Speak"
      variant="ghost"
      onClick={toggleVoice}
    >
      {micOn ? (
        <span title="microphone is on">
          <IconMicOn />
        </span>
      ) : (
        <span title="microphone is muted">
          <IconMicOff />
        </span>
      )}
    </TooltipIconButton>
  );
};

export const UserMessageVoices: FC = () => {
  return (
    <div className="flex w-full flex-row gap-3 col-span-full col-start-1 row-start-1 justify-end">
      <span>voice to text</span>
    </div>
  );
};

const IconMicOff = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-mic-mute"
      viewBox="0 0 16 16"
    >
      <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4 4 0 0 0 12 8V7a.5.5 0 0 1 1 0zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a5 5 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4m3-9v4.879l-1-1V3a2 2 0 0 0-3.997-.118l-.845-.845A3.001 3.001 0 0 1 11 3" />
      <path d="m9.486 10.607-.748-.748A2 2 0 0 1 6 8v-.878l-1-1V8a3 3 0 0 0 4.486 2.607m-7.84-9.253 12 12 .708-.708-12-12z" />
    </svg>
  );
};

const IconMicOn = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-mic"
      viewBox="0 0 16 16"
    >
      <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
      <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
    </svg>
  );
};
