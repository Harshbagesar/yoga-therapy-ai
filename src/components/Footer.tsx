"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { Heart, Compass, ShieldAlert, BookOpen } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { language } = useApp();
  const t = translations[language];

  return (
    <footer className="mt-auto border-t border-white/10 bg-slate-950 text-slate-400 py-12 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/10">
          
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🧘</span>
              <span className="bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-lg font-bold tracking-tight text-transparent">
                YogaHealth Guide AI
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm">
              {t.footerText}
            </p>
            <div className="flex items-center space-x-1 text-xs text-slate-500">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
              <span>for healthy living</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase flex items-center gap-2">
              <Compass className="h-4 w-4 text-emerald-400" /> Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button 
                onClick={() => setActiveTab("home")} 
                className="text-left hover:text-white transition-colors"
              >
                {t.navHome}
              </button>
              <button 
                onClick={() => setActiveTab("library")} 
                className="text-left hover:text-white transition-colors"
              >
                {t.navLibrary}
              </button>
              <button 
                onClick={() => setActiveTab("planner")} 
                className="text-left hover:text-white transition-colors"
              >
                {t.navPlanner}
              </button>
              <button 
                onClick={() => setActiveTab("report")} 
                className="text-left hover:text-white transition-colors"
              >
                {t.navReport}
              </button>
              <button 
                onClick={() => setActiveTab("educational")} 
                className="text-left hover:text-white transition-colors"
              >
                {t.navEducational}
              </button>
            </div>
          </div>

          {/* Educational Resources & Disclaimer Title */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-teal-400" /> Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setActiveTab("educational")} className="hover:text-white transition-colors">
                  What is Yoga & Ayurveda?
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("educational")} className="hover:text-white transition-colors">
                  Scientific Healing Principles
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("educational")} className="hover:text-white transition-colors">
                  Preventative Healthcare Guide
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Area */}
        <div className="mt-8 flex flex-col items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <ShieldAlert className="h-5 w-5" />
            <span>Medical Disclaimer</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            {t.disclaimer}
          </p>
        </div>

        <div className="mt-8 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} Yoga Health Guide AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
