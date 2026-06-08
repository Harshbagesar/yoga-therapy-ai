"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, Play, Pause, Square } from "lucide-react";

interface TextToSpeechProps {
  text: string;
  language: "en" | "hi" | "mr";
}

export const TextToSpeech: React.FC<TextToSpeechProps> = ({ text, language }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const cleanTextForSpeech = (rawText: string) => {
    // Strip markdown bold/italic tags and list hyphens for cleaner reading
    return rawText
      .replace(/[*#_`~]/g, "")
      .replace(/-\s+/g, ", ")
      .trim();
  };

  const startSpeaking = () => {
    if (!synthRef.current) return;

    // Stop anything currently speaking
    synthRef.current.cancel();

    const cleanedText = cleanTextForSpeech(text);
    const newUtterance = new SpeechSynthesisUtterance(cleanedText);

    // Map language locales
    const langMap = {
      en: "en-US",
      hi: "hi-IN",
      mr: "mr-IN",
    };
    newUtterance.lang = langMap[language] || "en-US";

    // Select suitable voice
    const voices = synthRef.current.getVoices();
    const targetLang = langMap[language];
    const voice = voices.find((v: SpeechSynthesisVoice) => v.lang.startsWith(targetLang)) || voices[0];
    if (voice) newUtterance.voice = voice;

    newUtterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    newUtterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    synthRef.current.speak(newUtterance);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const pauseSpeaking = () => {
    if (!synthRef.current) return;
    if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
    } else {
      synthRef.current.pause();
      setIsPaused(true);
    }
  };

  const stopSpeaking = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };


  return (
    <div className="flex items-center space-x-1.5 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-slate-300">
      <Volume2 className="h-4 w-4 text-emerald-400 mr-1 animate-pulse" />
      <span className="font-semibold text-slate-400 mr-2">Audio Guide:</span>

      {!isSpeaking ? (
        <button
          onClick={startSpeaking}
          className="flex items-center space-x-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-2.5 py-1 transition-all"
        >
          <Play className="h-3 w-3 fill-emerald-400" />
          <span>Listen</span>
        </button>
      ) : (
        <div className="flex items-center space-x-1">
          <button
            onClick={pauseSpeaking}
            className="flex items-center justify-center p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-all"
            title={isPaused ? "Resume" : "Pause"}
          >
            {isPaused ? <Play className="h-3.5 w-3.5 fill-slate-300" /> : <Pause className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={stopSpeaking}
            className="flex items-center justify-center p-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 transition-all"
            title="Stop"
          >
            <Square className="h-3.5 w-3.5 fill-rose-400" />
          </button>
        </div>
      )}
    </div>
  );
};
