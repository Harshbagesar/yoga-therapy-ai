"use client";

import React, { useState } from "react";
import { AppProvider, useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { LandingPage } from "@/components/LandingPage";
import { Library } from "@/components/Library";
import { DailyPlanner } from "@/components/DailyPlanner";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { ReportGenerator } from "@/components/ReportGenerator";
import { EducationalSection } from "@/components/EducationalSection";
import { AdminPanel } from "@/components/AdminPanel";
import { Sun, Moon, Globe, Menu, X } from "lucide-react";

function MainLayout() {
  const { theme, toggleTheme, language, setLanguage } = useApp();
  const [activeTab, setActiveTab] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  // Helper to translate dashboard tab
  const getDashboardLabel = () => {
    if (language === "hi") return "प्रगति";
    if (language === "mr") return "प्रगती";
    return "Progress";
  };

  const navItems = [
    { id: "home", label: t.navHome },
    { id: "library", label: t.navLibrary },
    { id: "planner", label: t.navPlanner },
    { id: "dashboard", label: getDashboardLabel() },
    { id: "report", label: t.navReport },
    { id: "educational", label: t.navEducational },
    { id: "admin", label: t.navAdmin },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white font-sans transition-colors duration-300">
      
      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => setActiveTab("home")}>
              <span className="text-xl">🧘</span>
              <span className="font-extrabold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent text-sm sm:text-base tracking-wide">
                Yoga Therapy AI
              </span>
            </div>

            {/* Desktop Tabs */}
            <nav className="hidden lg:flex items-center space-x-1.5 overflow-x-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === item.id
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/10"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Side Settings */}
            <div className="flex items-center gap-2 shrink-0">
              
              {/* Language Selector Dropdown */}
              <div className="relative flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900/60 px-2 py-1 text-xs">
                <Globe className="h-3.5 w-3.5 text-slate-400" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as "en" | "hi" | "mr")}
                  className="bg-transparent text-white focus:outline-none cursor-pointer pr-1 text-xxs font-bold uppercase tracking-wider"
                >
                  <option value="en" className="bg-slate-900">EN</option>
                  <option value="hi" className="bg-slate-900">HI</option>
                  <option value="mr" className="bg-slate-900">MR</option>
                </select>
              </div>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="rounded-xl border border-white/10 bg-slate-900/60 p-2 text-slate-400 hover:text-white transition-colors"
                title={theme === "light" ? t.themeDark : t.themeLight}
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>

              {/* Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-xl border border-white/10 bg-slate-900/60 p-2 text-slate-400 hover:text-white lg:hidden"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-slate-950 p-4 space-y-1.5 shadow-2xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex w-full items-center rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                  activeTab === item.id
                    ? "bg-emerald-500 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content Body */}
      <main className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        {activeTab === "home" && <LandingPage onNavigate={setActiveTab} />}
        {activeTab === "library" && <Library />}
        {activeTab === "planner" && <DailyPlanner />}
        {activeTab === "dashboard" && <ProgressDashboard />}
        {activeTab === "report" && <ReportGenerator />}
        {activeTab === "educational" && <EducationalSection />}
        {activeTab === "admin" && <AdminPanel />}
      </main>

      {/* Clinical Footer */}
      <footer className="border-t border-white/15 bg-slate-950 py-10 text-center space-y-6">
        <div className="mx-auto max-w-5xl px-4 space-y-4">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <span>🧘</span>
            <span className="font-semibold text-white">{t.footerText}</span>
          </div>

          <p className="text-xxs text-slate-500 leading-relaxed max-w-4xl mx-auto">
            {t.disclaimer}
          </p>

          <div className="flex justify-center gap-4 text-xxs text-slate-400 font-bold uppercase tracking-wider pt-2">
            <span>Section 508 Compliant</span>
            <span className="text-white/10">|</span>
            <span>WAI-ARIA Accessibility Standards</span>
            <span className="text-white/10">|</span>
            <span>Clinical Verification Logs</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
