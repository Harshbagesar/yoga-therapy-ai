"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { VoiceSearch } from "./VoiceSearch";
import { TextToSpeech } from "./TextToSpeech";
import { Send, Sparkles, MessageCircle, RefreshCw, User } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const aiTranslations = {
  en: {
    clearChat: "Clear Chat",
    suggestions: "Suggestions",
    emptyTitle: "Ask anything about Yoga & Diet",
    emptySubtitle: "Enter a health question, try a suggested chip, or use the mic button to speak your query.",
    typingLabel: "Yoga Guide is typing...",
    inputPlaceholder: "Ask a question...",
    errNoResponse: "I apologize, I was unable to generate a response. Please try again.",
    errConnection: "Sorry, I am experiencing connection issues. Please ensure your Gemini API key is configured in your project settings.",
    presetQuestions: [
      "Which yoga pose is best for High Blood Pressure?",
      "Can you design a 10-minute stress relief routine?",
      "What is a Sattvic diet plan for managing Type-2 Diabetes?",
      "Why is Kapalbhati contraindicated in acid reflux?"
    ]
  },
  mr: {
    clearChat: "संभाषण साफ करा",
    suggestions: "सुझाव",
    emptyTitle: "योग आणि आहाराबद्दल काहीही विचारा",
    emptySubtitle: "आरोग्याचा प्रश्न प्रविष्ट करा, सुचवलेले प्रश्न निवडा किंवा बोलण्यासाठी माइक बटण वापरा.",
    typingLabel: "योग मार्गदर्शक टाईप करत आहे...",
    inputPlaceholder: "प्रश्न विचारा...",
    errNoResponse: "क्षमस्व, मी प्रतिसाद तयार करू शकलो नाही. कृपया पुन्हा प्रयत्न करा.",
    errConnection: "क्षमस्व, मला जोडणीमध्ये समस्या येत आहेत. कृपया प्रोजेक्ट सेटिंग्जमध्ये तुमची जेमिनी API की कॉन्फिगर केली असल्याची खात्री करा.",
    presetQuestions: [
      "उच्च रक्तदाबासाठी कोणते योगासन सर्वोत्तम आहे?",
      "तुम्ही १० मिनिटांची तणावमुक्ती दिनचर्या डिझाइन करू शकता का?",
      "टाईप-२ मधुमेहाच्या व्यवस्थापनासाठी सात्विक आहार योजना काय आहे?",
      "अ‍ॅसिड रिफ्लक्समध्ये कपालभाती का वर्ज्य आहे?"
    ]
  },
  hi: {
    clearChat: "बातचीत साफ करें",
    suggestions: "सुझाव",
    emptyTitle: "योग और आहार के बारे में कुछ भी पूछें",
    emptySubtitle: "एक स्वास्थ्य प्रश्न दर्ज करें, सुझावों में से चुनें, या बोलने के लिए माइक बटन का उपयोग करें।",
    typingLabel: "योग गाइड टाइप कर रहा है...",
    inputPlaceholder: "एक प्रश्न पूछें...",
    errNoResponse: "क्षमा करें, मैं प्रतिक्रिया उत्पन्न करने में असमर्थ था। कृपया पुनः प्रयास करें।",
    errConnection: "क्षमा करें, मुझे कनेक्शन की समस्याओं का सामना करना पड़ रहा है। कृपया सुनिश्चित करें कि आपकी जेमिनी एपीआई कुंजी प्रोजेक्ट सेटिंग्स में कॉन्फ़िगर की गई है।",
    presetQuestions: [
      "उच्च रक्तचाप के लिए कौन सा योगासन सबसे अच्छा है?",
      "क्या आप 10 मिनट की तनाव मुक्ति दिनचर्या तैयार कर सकते हैं?",
      "टाइप-2 मधुमेह के प्रबंधन के लिए सात्विक आहार योजना क्या है?",
      "एसिड रिफ्लक्स में कपालभाति क्यों वर्जित है?"
    ]
  }
};

export const AiAssistant: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];
  const ait = aiTranslations[language] || aiTranslations.en;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const presetQuestions = ait.presetQuestions;

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSend,
          // Format chat history for context
          history: messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to contact Gemini API");
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.text || ait.errNoResponse,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: ait.errConnection,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = (text: string) => {
    setInputText(text);
    // Optionally trigger auto-send
    handleSendMessage(text);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-3xl font-extrabold text-transparent flex items-center gap-2">
            <Sparkles className="h-7 w-7 text-emerald-400 animate-pulse" /> {t.aiAssistantTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {t.aiAssistantSubtitle}
          </p>
        </div>

        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="flex items-center space-x-1 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 px-3.5 py-2 text-xs font-bold text-slate-300 transition-all"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>{ait.clearChat}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Presets Panel (Left side on wide screens) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4.5 backdrop-blur-md">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MessageCircle className="h-4.5 w-4.5 text-emerald-400" /> {ait.suggestions}
            </h4>
            <div className="flex flex-col gap-2">
              {presetQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="rounded-xl border border-white/5 bg-slate-950/40 hover:border-emerald-500/20 px-3 py-2 text-left text-xxs text-slate-400 hover:text-white transition-all leading-normal"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Chat Area */}
        <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-slate-900/20 backdrop-blur-md flex flex-col h-[520px] justify-between overflow-hidden shadow-xl">
          
          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-950/10">
            
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3 px-4">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Sparkles className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">{ait.emptyTitle}</h3>
                  <p className="text-xs text-slate-500 max-w-sm">
                    {ait.emptySubtitle}
                  </p>
                </div>
              </div>
            )}

            {messages.map((message, index) => {
              const isAssistant = message.role === "assistant";
              return (
                <div
                  key={index}
                  className={`flex ${isAssistant ? "justify-start" : "justify-end"} items-start gap-2.5`}
                >
                  {isAssistant && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                      <Sparkles className="h-4.5 w-4.5" />
                    </div>
                  )}

                  <div className="flex flex-col space-y-1.5 max-w-[85%]">
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed border ${
                        isAssistant
                          ? "bg-slate-900/60 border-white/5 text-slate-200"
                          : "bg-gradient-to-r from-emerald-500 to-teal-500 border-transparent text-white shadow-lg shadow-emerald-500/10"
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>
                    </div>

                    {/* Audio Playback for assistant answers */}
                    {isAssistant && (
                      <div className="self-start">
                        <TextToSpeech text={message.content} language={language} />
                      </div>
                    )}
                  </div>

                  {!isAssistant && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-800 border border-white/10 text-slate-300">
                      <User className="h-4.5 w-4.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  <Sparkles className="h-4.5 w-4.5 animate-spin" />
                </div>
                <div className="rounded-2xl px-4.5 py-3 border border-white/5 bg-slate-900/60 text-xs text-slate-400 flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
                    <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  <span>{ait.typingLabel}</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Entry Box */}
          <div className="p-4 border-t border-white/10 bg-slate-900/40 flex items-center gap-2">
            
            {/* Mic Button Speech-to-Text */}
            <VoiceSearch onResult={handleVoiceInput} language={language} />

            <input
              type="text"
              placeholder={ait.inputPlaceholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputText)}
              className="flex-1 rounded-xl border border-white/10 bg-slate-950/40 px-4.5 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />

            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim() || isLoading}
              className="flex items-center justify-center rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 p-3 text-white transition-all shadow-md shadow-emerald-500/15"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
