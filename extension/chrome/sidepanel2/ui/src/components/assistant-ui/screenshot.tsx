"use client"

import type { FC } from "react"
import { useComposerRuntime } from "@assistant-ui/react"
import { useComposerContext } from "./composer"
import { TooltipIconButton } from "./tooltip-icon-button"

export const ComposerScreenshots: FC = () => {
  const { screenshotData, setScreenshotData } = useComposerContext()
  const composerRuntime = useComposerRuntime()

  if (!screenshotData) {
    return null
  }

  const file = new File([screenshotData], "screenshot.png", {
    type: "image/png",
  })
  composerRuntime.addAttachment(file)
  setScreenshotData(null)

  return <></>
}

export const ComposerAddScreenshot: FC = () => {
  const { takeScreenshot } = useComposerContext()

  const add = (event: React.MouseEvent<HTMLButtonElement>) => {
    takeScreenshot()
    event.preventDefault()
  }

  return (
    <TooltipIconButton
      className="my-2.5 size-8 p-2 transition-opacity ease-in"
      tooltip="Take screenshot"
      variant="ghost"
      onClick={add}
    >
      <IconScreenshot />
    </TooltipIconButton>
  )
}

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
  )
}
