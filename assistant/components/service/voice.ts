"use client";

// https://github.com/react-chatbotify/react-chatbotify/blob/main/src/services/VoiceService.ts

export type VoiceSettings = {
  language?: string;
};

let recognition: SpeechRecognition | null;

const getSpeechRecognition = () => {
  if (!recognition) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
    } else {
      console.error("Speech recognition not supported.");
    }
  }
  return recognition;
};

export const startVoiceRecording = (
  settings: VoiceSettings,
  toggle?: (recording: boolean) => void,
  setInput?: (value: string) => void,
) => {
  const recognition = getSpeechRecognition();

  if (!recognition) {
    return;
  }

  if (settings.language) {
    recognition.lang = settings.language;
  }

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    console.info("transcript", transcript);
    if (setInput) {
      setInput(transcript);
    }
  };

  recognition.onerror = function (event) {
    console.error("Speech recognition error: " + event.error);
    if (toggle) {
      toggle(false);
    }
  };

  recognition.onend = function () {
    console.info("voice recording stopped");
    if (toggle) {
      toggle(false);
    }
  };

  recognition.start();
  if (toggle) {
    toggle(true);
  }
};

export const stopVoiceRecording = () => {
  const recognition = getSpeechRecognition();

  if (!recognition) {
    return;
  }

  if (recognition) {
    recognition.stop();
  }
};
