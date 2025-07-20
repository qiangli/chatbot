"use client";

import type { FC } from "react";
import Image from "next/image";
import { TooltipIconButton } from "./tooltip-icon-button";

export const UserMessageScreenshots: FC = () => {
  return (
    <div className="flex w-full flex-row gap-3 col-span-full col-start-1 row-start-1 justify-end">
      <p id="screenshot" hidden>
        <Image
          id="screenshot-img"
          src="images/white.png"
          height="180"
          style={{ border: "black solid 1px", width: "100%" }} // Converted to a style object
          alt="Screenshot"
        />
      </p>
    </div>
  );
};

export const ComposerScreenshots: FC = () => {
  return (
    <div className="flex w-full flex-row gap-3 overflow-x-auto">
      <div className="flex w-full flex-row gap-3 col-span-full col-start-1 row-start-1 justify-end">
        <p id="screenshot">
          <Image
            id="screenshot-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAByCAIAAACakeHQAAAAEklEQVR42mJ89+5dfwY8EAozBoAATsR/XTleteMAAAAASUVORK5CYII="
            height="180"
            width="180"
            style={{ border: "black solid 1px", width: "100%" }}
            alt="Screenshot"
          />
        </p>
      </div>
    </div>
  );
};

export const ComposerAddScreenshot: FC = () => {
  return (
    <TooltipIconButton
      className="my-2.5 size-8 p-2 transition-opacity ease-in"
      tooltip="Add Screenshot"
      variant="ghost"
    >
      <IconScreenshot />
    </TooltipIconButton>
  );
};

const IconScreenshot = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-image"
      viewBox="0 0 16 16">
      <path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
      <path
        d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12z" />
    </svg>
  );
};