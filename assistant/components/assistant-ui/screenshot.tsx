"use client";

import type { FC } from "react";
// import { useState, useEffect } from "react";
import Image from "next/image";

import { useComposerRuntime } from "@assistant-ui/react";

import { TooltipIconButton } from "./tooltip-icon-button";
import { useComposerContext } from "./composer-provider";
// import { ImagePreview } from "./image-preview";

export const ComposerScreenshots: FC = () => {
  const { screenshotData } = useComposerContext();
  // const [isVisible, setIsVisible] = useState(false);
  const composerRuntime = useComposerRuntime();

  // useEffect(() => {
  //   if (screenshotData) {
  //     setIsVisible(true);
  //   }
  // }, [screenshotData]);

  // const handleRemove = () => {
  //   // setIsVisible(false);
  //   setScreenshotData(null);
  // };

  if (!screenshotData) {
    return null;
  }

  // const file = new Blob([screenshotData], {type: 'image/png'});
  const file = new File([screenshotData], "screenshot.png", {
    type: "image/png",
  });
  composerRuntime.addAttachment(file);

  return <></>;
  // return (
  //   <ImagePreview image={screenshotData} closer={handleRemove} />
  // );
};

export const ComposerAddScreenshot: FC = () => {
  const { takeScreenshot } = useComposerContext();

  return (
    <TooltipIconButton
      className="my-2.5 size-8 p-2 transition-opacity ease-in"
      tooltip="Take screenshot"
      variant="ghost"
      onClick={takeScreenshot}
    >
      <IconScreenshot />
    </TooltipIconButton>
  );
};

export const UserMessageScreenshots: FC = () => {
  const { screenshotData } = useComposerContext();

  return (
    <div className="flex w-full flex-row gap-3 col-span-full col-start-1 row-start-1 justify-end">
      {screenshotData && (
        <p id="screenshot">
          <Image
            id="screenshot-img"
            src={screenshotData}
            height="180"
            style={{ border: "black solid 1px", width: "100%" }}
            alt="Screenshot"
          />
        </p>
      )}
    </div>
  );
};

const IconScreenshot = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-file-image"
      viewBox="0 0 16 16"
    >
      <path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
      <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12z" />
    </svg>
  );
};
