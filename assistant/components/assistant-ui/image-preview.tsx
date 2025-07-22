"use client";

import type { FC } from "react";
import Image from "next/image";

export type ImagePreviewProps = {
  image?: string | null;
  height?: number;
  width?: number;
  closer?: () => void;
};

export const ImagePreview: FC<ImagePreviewProps> = ({
  image,
  height,
  width,
  closer,
}) => {
  const handleClose = () => {
    if (closer) {
      closer();
    }
  };

  if (!image) {
    return null;
  }

  const handleImageClick = () => {
    if (image) {
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Screenshot</title>
          </head>
          <body>
            <img src="${image}" alt="Screenshot" style="width:100%;"/>
          </body>
          </html>
        `);
        newWindow.document.close();
      }
    }
  };

  return (
    <div className="flex w-full flex-row gap-3 overflow-x-auto relative">
      <div className="flex flex-row gap-3 col-span-full col-start-1 row-start-1 justify-end relative">
        <p
          className="relative"
          style={{ position: "relative", display: "inline-block" }}
        >
          <Image
            src={image}
            height={height || 100}
            width={width || 180}
            style={{ border: "red solid 1px" }}
            alt="Image preview"
            onClick={handleImageClick}
          />
          <button
            onClick={handleClose}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "0px",
              right: "0px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        </p>
      </div>
    </div>
  );
};
