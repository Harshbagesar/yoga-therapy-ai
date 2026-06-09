"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { Sun, Moon, Globe, Menu, X, User, LogIn, LogOut, Award } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const headerTranslations = {
  en: {
    brandName: "YogaHealth AI",
    guestUser: "Guest User",
    loginTitle: "Login to YogaHealth AI",
    enterName: "Enter Your Name",
    placeholderName: "e.g., Jane Doe",
    confirmLogin: "Confirm Log In",
    continueGuest: "Continue in Guest Mode"
  },
  mr: {
    brandName: "योगहेल्थ AI",
    guestUser: "अतिथी वापरकर्ता",
    loginTitle: "योगहेल्थ AI मध्ये लॉगिन करा",
    enterName: "तुमचे नाव प्रविष्ट करा",
    placeholderName: "उदा., राहुल पाटील",
    confirmLogin: "लॉगिनची पुष्टी करा",
    continueGuest: "अतिथी मोडमध्ये सुरू ठेवा"
  },
  hi: {
    brandName: "योगहेल्थ AI",
    guestUser: "अतिथि उपयोगकर्ता",
    loginTitle: "योगहेल्थ AI में लॉगिन करें",
    enterName: "अपना नाम दर्ज करें",
    placeholderName: "उदा., राहुल शर्मा",
    confirmLogin: "लॉगिन की पुष्टि करें",
    continueGuest: "अतिथि मोड में जारी रखें"
  }
};

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { theme, toggleTheme, language, setLanguage, streak } = useApp();
  const t = translations[language];
  const ht = headerTranslations[language] || headerTranslations.en;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("yoga-user");
      return storedUser ? storedUser !== "Guest User" : false;
    }
    return false;
  });
  const [currentUser, setCurrentUser] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("yoga-user") || "Guest User";
    }
    return "Guest User";
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem("yoga-user", username);
      setCurrentUser(username);
      setIsLoggedIn(true);
      setIsAuthModalOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.setItem("yoga-user", "Guest User");
    setCurrentUser("Guest User");
    setIsLoggedIn(false);
    setUsername("");
  };

  const navItems = [
    { id: "home", label: t.navHome },
    { id: "library", label: t.navLibrary },
    { id: "planner", label: t.navPlanner },
    { id: "report", label: t.navReport },
    { id: "educational", label: t.navEducational },
  ];

  const translatedCurrentUser = currentUser === "Guest User" ? ht.guestUser : currentUser;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-900/60 backdrop-blur-md dark:bg-slate-950/60 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div 
              className="flex cursor-pointer items-center space-x-2"
              onClick={() => setActiveTab("home")}
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/20">
                <span className="text-xl font-bold font-serif">🧘</span>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                </span>
              </div>
              <span className="hidden bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-xl font-extrabold tracking-tight text-transparent sm:block font-sans">
                {ht.brandName}
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1 lg:space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-300 ${
                    activeTab === item.id
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "text-slate-300 hover:bg-white/5 hover:text-white border border-transparent"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Side Options (Theme, Language, User, Streaks) */}
            <div className="flex items-center space-x-3">
              {/* Streak Counter */}
              {streak > 0 && (
                <div className="flex items-center space-x-1 rounded-full bg-orange-500/10 px-3 py-1 text-orange-400 border border-orange-500/20 animate-pulse">
                  <span>🔥</span>
                  <span className="text-xs font-bold">{streak} {t.days}</span>
                </div>
              )}

              {/* Language Selector */}
              <div className="relative group">
                <button className="flex items-center space-x-1 rounded-lg border border-white/10 bg-white/5 p-2 text-slate-300 hover:bg-white/10 hover:text-white transition-all">
                  <Globe className="h-4 w-4" />
                  <span className="text-xs uppercase font-semibold">{language}</span>
                </button>
                <div className="absolute right-0 mt-1 hidden w-28 origin-top-right rounded-xl border border-white/10 bg-slate-900 p-1 shadow-2xl group-hover:block transition-all duration-200">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`flex w-full items-center rounded-lg px-3 py-1.5 text-left text-xs font-medium ${
                      language === "en" ? "bg-emerald-500/20 text-emerald-300" : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage("hi")}
                    className={`flex w-full items-center rounded-lg px-3 py-1.5 text-left text-xs font-medium ${
                      language === "hi" ? "bg-emerald-500/20 text-emerald-300" : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    हिन्दी
                  </button>
                  <button
                    onClick={() => setLanguage("mr")}
                    className={`flex w-full items-center rounded-lg px-3 py-1.5 text-left text-xs font-medium ${
                      language === "mr" ? "bg-emerald-500/20 text-emerald-300" : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    मराठी
                  </button>
                </div>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-300 hover:bg-white/10 hover:text-white transition-all"
                title={theme === "light" ? t.themeDark : t.themeLight}
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>

              {/* User Profiling */}
              <div className="relative group">
                <button
                  onClick={() => (isLoggedIn ? handleLogout() : setIsAuthModalOpen(true))}
                  className="flex items-center space-x-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-slate-300 hover:bg-white/10 hover:text-white transition-all"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden text-xs font-semibold sm:inline-block max-w-[80px] truncate">
                    {translatedCurrentUser}
                  </span>
                  {isLoggedIn ? <LogOut className="h-3.5 w-3.5 text-rose-400" /> : <LogIn className="h-3.5 w-3.5 text-emerald-400" />}
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-lg p-2 text-slate-300 hover:bg-white/5 hover:text-white md:hidden"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="border-b border-white/10 bg-slate-900 px-4 py-3 md:hidden">
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full rounded-lg px-4 py-2 text-left text-base font-medium transition-colors ${
                    activeTab === item.id
                      ? "bg-emerald-500/20 text-emerald-300 border-l-4 border-emerald-500"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Authentication Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="text-emerald-400" /> {ht.loginTitle}
              </h3>
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {ht.enterName}
                </label>
                <input
                  type="text"
                  required
                  placeholder={ht.placeholderName}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-300 transition-all duration-300"
                >
                  {ht.confirmLogin}
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem("yoga-user", "Guest User");
                    setCurrentUser("Guest User");
                    setIsLoggedIn(false);
                    setIsAuthModalOpen(false);
                  }}
                  className="text-xs text-slate-400 hover:text-white underline transition-all"
                >
                  {ht.continueGuest}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
