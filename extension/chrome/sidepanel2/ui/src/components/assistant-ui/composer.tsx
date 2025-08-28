import { createContext, useContext } from "react"

// Define types for context state
interface ComposerContextType {
  screenshotData: string | null
  takeScreenshot: () => void
  getScreenshotDetails: () => {
    dataUrl: string | null
    metaData?: object
  } | null
  selectedText: string | null
  copySelectedText: () => void
  voiceData: string | null
  startVoice: (callback: (on: boolean) => void) => void
  stopVoice: () => void

  setScreenshotData: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedText: React.Dispatch<React.SetStateAction<string | null>>
  setVoiceData: React.Dispatch<React.SetStateAction<string | null>>
}

// Create Composer Context
export const ComposerContext = createContext<ComposerContextType | null>(null)

// Hook to use the Composer Context
export const useComposerContext = () => {
  const context = useContext(ComposerContext)

  if (!context) {
    throw new Error("useComposer must be used within a ComposerProvider")
  }

  return context
}
