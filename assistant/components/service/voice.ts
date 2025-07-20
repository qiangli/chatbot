"use client";

// https://github.com/react-chatbotify/react-chatbotify/blob/main/src/services/VoiceService.ts
import { RefObject, Dispatch, SetStateAction } from "react";

/**
 * Defines the settings for voice.
 */
export type VoiceSettings = {
  disabled?: boolean;
  defaultToggledOn?: boolean;
  language?: string;
  timeoutPeriod?: number;
  autoSendDisabled?: boolean;
  autoSendPeriod?: number;
  characterLimit?: number;
};

let recognition: SpeechRecognition | null;

let inactivityTimer: ReturnType<typeof setTimeout> | null;
let autoSendTimer: ReturnType<typeof setTimeout>;
let toggleOn = false;
let mediaRecorder: MediaRecorder | null = null;

/**
 * Get speech recognition instance if available via function call
 * to add support for SSR since window is not available on server.
 * @returns SpeechRecognition object if available, null otherwise
 */
const getSpeechRecognition = () => {
  if (!recognition) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
  } else {
    console.error("Speech recognition not supported in this browser.");
  }

  return recognition;
};

/**
 * Starts voice recording for input into textarea.
 *
 * @param settings options provided to the bot
 * @param toggleVoice handles toggling of voice
 * @param triggerSendVoiceInput triggers sending of voice input into chat window
 * @param setInputLength sets the input length to reflect character count & limit
 * @param inputRef reference to textarea for input
 */
export const startVoiceRecording = (
  settings: VoiceSettings,
  toggleVoice: () => Promise<void>,
  triggerSendVoiceInput?: () => void,
  setTextAreaValue?: (value: string) => void,
  setInputLength?: Dispatch<SetStateAction<number>>,
  inputRef?: RefObject<HTMLTextAreaElement | HTMLInputElement | null>,
) => {
  const recognition = getSpeechRecognition();

  if (!recognition) {
    return;
  }

  if (!toggleOn) {
    try {
      toggleOn = true;
      recognition.lang = settings.language as string;
      recognition.start();
    } catch (err) {
      // catches rare dom exception if user spams voice button
      console.log(err);
    }
  }

  const inactivityPeriod = settings.timeoutPeriod;
  const autoSendPeriod = settings.autoSendPeriod;

  recognition.onresult = (event) => {
    clearTimeout(inactivityTimer as ReturnType<typeof setTimeout>);
    inactivityTimer = null;
    clearTimeout(autoSendTimer);

    const voiceInput = event.results[event.results.length - 1][0].transcript;

    if (inputRef?.current && setTextAreaValue && setInputLength) {
      const characterLimit = settings.characterLimit;
      const newInput = inputRef.current.value + voiceInput;
      if (
        characterLimit != null &&
        characterLimit >= 0 &&
        newInput.length > characterLimit
      ) {
        setTextAreaValue(newInput.slice(0, characterLimit));
      } else {
        setTextAreaValue(newInput);
      }
      setInputLength(inputRef.current.value.length);
    }

    // only have timer for timeout if inactivityPeriod is > 0
    if (inactivityPeriod && inputRef) {
      inactivityTimer = setTimeout(
        async () => await handleTimeout(toggleVoice, inputRef),
        inactivityPeriod,
      );
    }
    if (!settings.autoSendDisabled && triggerSendVoiceInput) {
      autoSendTimer = setTimeout(triggerSendVoiceInput, autoSendPeriod);
    }
  };

  recognition.onend = () => {
    if (toggleOn) {
      recognition.start();
      // only have timer for timeout if inactivityPeriod is > 0
      if (!inactivityTimer && inputRef && inactivityPeriod) {
        inactivityTimer = setTimeout(
          async () => await handleTimeout(toggleVoice, inputRef),
          inactivityPeriod,
        );
      }
    } else {
      clearTimeout(inactivityTimer as ReturnType<typeof setTimeout>);
      inactivityTimer = null;
      clearTimeout(autoSendTimer);
    }
  };

  // only have timer for timeout if inactivityPeriod is > 0
  if (inactivityPeriod && inputRef) {
    inactivityTimer = setTimeout(
      async () => await handleTimeout(toggleVoice, inputRef),
      inactivityPeriod,
    );
  }
};

/**
 * Stops all voice recordings.
 */
export const stopVoiceRecording = () => {
  const recognition = getSpeechRecognition();

  if (!recognition) {
    return;
  }

  toggleOn = false;
  if (recognition) {
    recognition.stop();
  }

  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    mediaRecorder = null;
  }

  clearTimeout(inactivityTimer as ReturnType<typeof setTimeout>);
  inactivityTimer = null;
  clearTimeout(autoSendTimer);
};

/**
 * Handles timeout for automatically turning off voice.
 *
 * @param handleToggleVoice handles toggling of voice
 */
const handleTimeout = async (
  toggleVoice: () => Promise<void>,
  inputRef: RefObject<HTMLTextAreaElement | HTMLInputElement | null>,
) => {
  if (!inputRef.current?.disabled) {
    await toggleVoice();
  }
  stopVoiceRecording();
};
