import { FC } from "react";
import React from "react";
import { useState, useEffect } from "react";

import { Textarea } from "../ui/textarea";

export type TextEdtiorProps = {
  text?: string | null;
  closer?: () => void;
  updater?: (text: string) => void;
};

/*
 Simple closable textarea editor
*/
export const TextEditor: FC<TextEdtiorProps> = ({ text, closer, updater }) => {
  const [content, setContent] = useState(text);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = event.target.value;
    setContent(v);
    if (updater) {
      updater(v);
    }
  };

  useEffect(() => {
    setContent(text);
  }, [text]);

  const handleClose = () => {
    if (closer) {
      closer();
    }
  };

  if (!content) {
    return null;
  }

  return (
    <div
      className="flex w-full flex-row gap-3 overflow-x-auto relative"
      style={{ width: "100%" }}
    >
      <div
        className="flex flex-row gap-3 col-span-full col-start-1 row-start-1 justify-end relative"
        style={{ width: "100%" }}
      >
        <p
          className="relative"
          style={{
            position: "relative",
            display: "inline-block",
            width: "100%",
          }}
        >
          <Textarea
            value={content}
            onChange={handleChange}
            style={{
              width: "100%",
              height: "6em",
              boxSizing: "border-box",
              border: "red solid 1px",
            }}
          />
          <button
            onClick={handleClose}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "0px",
              right: "0px",
              backgroundColor: "transparent",
              border: "none",
              fontSize: "16px",
              padding: "4px",
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
