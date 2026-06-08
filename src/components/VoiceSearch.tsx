"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff } from "lucide-react";

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  start: () => void;
  stop: () => void;
}

interface VoiceSearchProps {
  onResult: (text: string) => void;
  language: "en" | "hi" | "mr";
}

export const VoiceSearch: React.FC<VoiceSearchProps> = ({ onResult, language }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as Window & { SpeechRecognition?: new () => SpeechRecognitionInstance; webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).SpeechRecognition ||
        (window as Window & { SpeechRecognition?: new () => SpeechRecognitionInstance; webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = false;
        recog.interimResults = false;
        
        // Map app language to speech recognition locales
        const langMap = {
          en: "en-US",
          hi: "hi-IN",
          mr: "mr-IN",
        };
        recog.lang = langMap[language] || "en-US";

        recog.onstart = () => {
          setIsListening(true);
        };

        recog.onend = () => {
          setIsListening(false);
        };

        recog.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        };

        recog.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            onResult(transcript);
          }
        };

        recognitionRef.current = recog;
      }
    }
  }, [language, onResult]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please try Google Chrome or Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`relative flex items-center justify-center rounded-xl p-3 border transition-all duration-300 ${
        isListening
          ? "bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse scale-105"
          : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
      }`}
      title={isListening ? "Listening... Click to stop" : "Voice Search"}
    >
      {isListening ? (
        <>
          <MicOff className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-rose-500"></span>
          </span>
        </>
      ) : (
        <Mic className="h-5 w-5" />
      )}
    </button>
  );
};
