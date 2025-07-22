import { createContext, useContext, useState, FC, ReactNode } from "react";
import html2canvas from "html2canvas-pro";
import { startVoiceRecording, stopVoiceRecording } from "../service/voice";

// Define types for context state
interface ComposerContextType {
  screenshotData: string | null;
  takeScreenshot: () => void;
  getScreenshotDetails: () => {
    dataUrl: string | null;
    metaData?: object;
  } | null;
  selectedText: string | null;
  copySelectedText: () => void;
  voiceData: string | null;
  startVoice: (callback: (on: boolean) => void) => void;
  stopVoice: () => void;

  setScreenshotData: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedText: React.Dispatch<React.SetStateAction<string | null>>;
  setVoiceData: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create Composer Context
const ComposerContext = createContext<ComposerContextType | null>(null);

// Hook to use the Composer Context
export const useComposerContext = () => {
  const context = useContext(ComposerContext);

  if (!context) {
    throw new Error("useComposer must be used within a ComposerProvider");
  }

  return context;
};

// Provider component
export const ComposerProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [screenshotData, setScreenshotData] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [voiceData, setVoiceData] = useState<string | null>(null);

  const takeScreenshot = async () => {
    try {
      const canvas = await html2canvas(document.body);
      const dataUrl = canvas.toDataURL("image/png");
      setScreenshotData(dataUrl);
      // console.log("screenshot:", dataUrl);
    } catch (error) {
      console.error("Failed to capture screenshot:", error);
    }
  };

  const getScreenshotDetails = () => {
    if (!screenshotData) return null;
    return {
      dataUrl: screenshotData,
      metaData: {
        created: new Date().toISOString(),
      },
    };
  };

  const copySelectedText = () => {
    let selected: string | null = "";
    if (window.getSelection) {
      const selection = window.getSelection();
      selected = selection && selection.toString();
    }
    if (!selected) {
      selected = document.body.innerText || document.body.textContent || "";
    }
    console.log("selected text:", selected);
    setSelectedText(selected);
  };

  const startVoice = (toggle: (on: boolean) => void) => {
    const lang = "en-US";
    startVoiceRecording(
      { language: lang },
      (on: boolean) => {
        if (toggle) {
          toggle(on);
        }
      },
      (text: string) => {
        if (voiceData) {
          setVoiceData(`${voiceData} ${text}`);
        } else {
          setVoiceData(text);
        }
      },
    );
  };

  const stopVoice = () => {
    stopVoiceRecording();
  };

  return (
    <ComposerContext.Provider
      value={{
        screenshotData,
        takeScreenshot,
        getScreenshotDetails,
        selectedText,
        copySelectedText,
        voiceData,
        startVoice,
        stopVoice,
        //
        setScreenshotData,
        setSelectedText,
        setVoiceData,
      }}
    >
      {children}
    </ComposerContext.Provider>
  );
};
