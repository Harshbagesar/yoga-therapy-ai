"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi" | "mr";

export interface Routine {
  id: string;
  name: string;
  asanaIds: string[];
  pranayamaIds: string[];
  duration: number; // in minutes
}

export interface SessionLog {
  date: string; // YYYY-MM-DD
  duration: number; // minutes
  completedAsanaIds: string[];
  completedPranayamaIds: string[];
}

interface AppContextProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  bookmarkedAsanas: string[];
  toggleBookmarkAsana: (id: string) => void;
  bookmarkedPranayamas: string[];
  toggleBookmarkPranayama: (id: string) => void;
  recentlyViewed: { id: string; type: "disease" | "asana" | "pranayama" }[];
  addRecentlyViewed: (id: string, type: "disease" | "asana" | "pranayama") => void;
  routines: Routine[];
  addRoutine: (routine: Omit<Routine, "id">) => void;
  deleteRoutine: (id: string) => void;
  sessionLogs: SessionLog[];
  logSession: (log: Omit<SessionLog, "date">) => void;
  streak: number;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

function computeStreak(logs: SessionLog[]): number {
  if (logs.length === 0) return 0;

  const uniqueDates = Array.from(new Set(logs.map((log) => log.date))).sort();
  let currentStreak = 0;
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  const hasToday = uniqueDates.includes(today);
  const hasYesterday = uniqueDates.includes(yesterday);

  if (!hasToday && !hasYesterday) return 0;

  let checkDate = hasToday ? today : yesterday;
  let idx = uniqueDates.indexOf(checkDate);

  while (idx >= 0) {
    currentStreak++;
    if (idx === 0) break;
    const prevDate = uniqueDates[idx - 1];
    const diffTime = Math.abs(new Date(checkDate).getTime() - new Date(prevDate).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      checkDate = prevDate;
      idx--;
    } else {
      break;
    }
  }

  return currentStreak;
}

function getInitialTheme(): "light" | "dark" {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("yoga-theme") as "light" | "dark" | null;
    if (stored) return stored;
  }
  return "dark";
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("yoga-lang") as Language | null;
      if (stored === "hi") return "hi";
    }
    return "mr";
  });
  const [bookmarkedAsanas, setBookmarkedAsanas] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("yoga-bookmarks-asanas");
      if (stored) return JSON.parse(stored);
    }
    return [];
  });
  const [bookmarkedPranayamas, setBookmarkedPranayamas] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("yoga-bookmarks-pranayamas");
      if (stored) return JSON.parse(stored);
    }
    return [];
  });
  const [recentlyViewed, setRecentlyViewed] = useState<{ id: string; type: "disease" | "asana" | "pranayama" }[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("yoga-recent");
      if (stored) return JSON.parse(stored);
    }
    return [];
  });
  const [routines, setRoutines] = useState<Routine[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("yoga-routines");
      if (stored) return JSON.parse(stored);
    }
    // Default routines
    const defaultRoutines: Routine[] = [
      {
        id: "r1",
        name: "Morning Energy Booster",
        asanaIds: ["suryanamaskar", "tadasana", "vrikshasana"],
        pranayamaIds: ["kapalbhati", "anulomvilom"],
        duration: 25,
      },
      {
        id: "r2",
        name: "Deep Stress Relief",
        asanaIds: ["sukhasana", "setubandhasana", "shavasana"],
        pranayamaIds: ["bhramari", "deepbreathing"],
        duration: 20,
      },
    ];
    if (typeof window !== "undefined") {
      localStorage.setItem("yoga-routines", JSON.stringify(defaultRoutines));
    }
    return defaultRoutines;
  });
  const [sessionLogs, setSessionLogs] = useState<SessionLog[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("yoga-session-logs");
      if (stored) return JSON.parse(stored);
    }
    return [];
  });
  const [streak, setStreak] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("yoga-session-logs");
      if (stored) {
        const logs: SessionLog[] = JSON.parse(stored);
        return computeStreak(logs);
      }
    }
    return 0;
  });

  // Apply theme class to DOM on mount and when theme changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("yoga-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("yoga-lang", lang);
  };

  const toggleBookmarkAsana = (id: string) => {
    const list = bookmarkedAsanas.includes(id)
      ? bookmarkedAsanas.filter((item) => item !== id)
      : [...bookmarkedAsanas, id];
    setBookmarkedAsanas(list);
    localStorage.setItem("yoga-bookmarks-asanas", JSON.stringify(list));
  };

  const toggleBookmarkPranayama = (id: string) => {
    const list = bookmarkedPranayamas.includes(id)
      ? bookmarkedPranayamas.filter((item) => item !== id)
      : [...bookmarkedPranayamas, id];
    setBookmarkedPranayamas(list);
    localStorage.setItem("yoga-bookmarks-pranayamas", JSON.stringify(list));
  };

  const addRecentlyViewed = (id: string, type: "disease" | "asana" | "pranayama") => {
    const list = recentlyViewed.filter((item) => !(item.id === id && item.type === type));
    const updated = [{ id, type }, ...list].slice(0, 5); // keep last 5
    setRecentlyViewed(updated);
    localStorage.setItem("yoga-recent", JSON.stringify(updated));
  };

  const addRoutine = (routine: Omit<Routine, "id">) => {
    const newRoutine = {
      ...routine,
      id: Math.random().toString(36).substr(2, 9),
    };
    const updated = [...routines, newRoutine];
    setRoutines(updated);
    localStorage.setItem("yoga-routines", JSON.stringify(updated));
  };

  const deleteRoutine = (id: string) => {
    const updated = routines.filter((r) => r.id !== id);
    setRoutines(updated);
    localStorage.setItem("yoga-routines", JSON.stringify(updated));
  };

  const logSession = (log: Omit<SessionLog, "date">) => {
    const todayStr = new Date().toISOString().split("T")[0];
    const existingIndex = sessionLogs.findIndex((item) => item.date === todayStr);

    const updatedLogs = [...sessionLogs];
    if (existingIndex > -1) {
      updatedLogs[existingIndex] = {
        date: todayStr,
        duration: updatedLogs[existingIndex].duration + log.duration,
        completedAsanaIds: Array.from(new Set([...updatedLogs[existingIndex].completedAsanaIds, ...log.completedAsanaIds])),
        completedPranayamaIds: Array.from(new Set([...updatedLogs[existingIndex].completedPranayamaIds, ...log.completedPranayamaIds])),
      };
    } else {
      updatedLogs.push({
        date: todayStr,
        ...log,
      });
    }

    setSessionLogs(updatedLogs);
    localStorage.setItem("yoga-session-logs", JSON.stringify(updatedLogs));
    setStreak(computeStreak(updatedLogs));
  };



  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        setLanguage,
        bookmarkedAsanas,
        toggleBookmarkAsana,
        bookmarkedPranayamas,
        toggleBookmarkPranayama,
        recentlyViewed,
        addRecentlyViewed,
        routines,
        addRoutine,
        deleteRoutine,
        sessionLogs,
        logSession,
        streak,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
