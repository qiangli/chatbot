"use client";

import type { FC } from "react";
import { VoiceButton } from "./voice-button";

export const UserMessageVoices: FC = () => {
  return (
    <div className="flex w-full flex-row gap-3 col-span-full col-start-1 row-start-1 justify-end">
      <span>selected text</span>
    </div>
  );
};

export const ComposerVoices: FC = () => {
  return (
    <div className="flex w-full flex-row gap-3 overflow-x-auto">
      <textarea>Selected text</textarea>
    </div>
  );
};

export const ComposerAddVoice: FC = () => {
  return (
    <>
      <VoiceButton />
    </>
  );
};
