"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { ASANAS, PRANAYAMAS } from "@/data/yoga-db";
import { getTranslatedAsana, getTranslatedPranayama } from "@/lib/getTranslatedData";
import { BarChart3, Plus, Trash2, Calendar, Clock, Flame, Sparkles } from "lucide-react";

const progressTranslations = {
  en: {
    practiceDuration: "Practice Duration",
    minutesSuffix: "Minutes",
    logPractice: "Log Practice",
    sessionsSuffix: "Sessions",
    weeklyWorkoutSummary: "Weekly Workout Summary",
    noWorkoutData: "No practice data logged for this week.",
    form: {
      title: "Log Manual Practice Session",
      durationLabel: "Duration (Minutes)",
      asanasLabel: "Select Completed Asanas",
      pranayamaLabel: "Select Completed Pranayama",
      btnSave: "Save Log",
      btnCancel: "Cancel"
    },
    table: {
      title: "Practice Session Logs",
      thDate: "Date",
      thDuration: "Duration",
      thAsanas: "Asanas Completed",
      thPranayamas: "Pranayamas Completed",
      thAction: "Action",
      minsSuffix: "mins",
      noSessions: "No sessions logged yet. Log a workout above or complete a planner routine!"
    },
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  },
  mr: {
    practiceDuration: "सराव कालावधी",
    minutesSuffix: "मिनिटे",
    logPractice: "सराव नोंदवा",
    sessionsSuffix: "सत्रे",
    weeklyWorkoutSummary: "साप्ताहिक सराव गोषवारा",
    noWorkoutData: "या आठवड्यासाठी कोणताही सराव डेटा नोंदवला गेला नाही.",
    form: {
      title: "स्थानिक सराव सत्र नोंदवा",
      durationLabel: "कालावधी (मिनिटे)",
      asanasLabel: "पूर्ण केलेली आसने निवडा",
      pranayamaLabel: "पूर्ण केलेला प्राणायाम निवडा",
      btnSave: "जतन करा",
      btnCancel: "रद्द करा"
    },
    table: {
      title: "सराव सत्र नोंदी",
      thDate: "दिनांक",
      thDuration: "कालावधी",
      thAsanas: "पूर्ण केलेली आसने",
      thPranayamas: "पूर्ण केलेले प्राणायाम",
      thAction: "कृती",
      minsSuffix: "मिनिटे",
      noSessions: "अद्याप कोणतीही सत्रे नोंदवली गेली नाहीत. वर सराव नोंदवा किंवा नियोजन दिनचर्या पूर्ण करा!"
    },
    weekdays: ["रवि", "सोम", "मंगळ", "बुध", "गुरु", "शुक्र", "शनि"]
  },
  hi: {
    practiceDuration: "अभ्यास अवधि",
    minutesSuffix: "मिनट",
    logPractice: "अभ्यास दर्ज करें",
    sessionsSuffix: "सत्र",
    weeklyWorkoutSummary: "साप्ताहिक अभ्यास सारांश",
    noWorkoutData: "इस सप्ताह के लिए कोई अभ्यास डेटा दर्ज नहीं किया गया है।",
    form: {
      title: "मैनुअल अभ्यास सत्र दर्ज करें",
      durationLabel: "अवधि (मिनट)",
      asanasLabel: "पूरे किए गए आसन चुनें",
      pranayamaLabel: "पूरे किए गए प्राणायाम चुनें",
      btnSave: "सहेजें",
      btnCancel: "रद्द करें"
    },
    table: {
      title: "अभ्यास सत्र लॉग",
      thDate: "तारीख",
      thDuration: "अवधि",
      thAsanas: "पूरे किए गए आसन",
      thPranayamas: "पूरे किए गए प्राणायाम",
      thAction: "कार्रवाई",
      minsSuffix: "मिनट",
      noSessions: "अभी तक कोई सत्र दर्ज नहीं किया गया है। ऊपर एक वर्कआउट दर्ज करें या एक नियोजक दिनचर्या पूरी करें!"
    },
    weekdays: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"]
  }
};

export const ProgressDashboard: React.FC = () => {
  const { language, sessionLogs, logSession, streak } = useApp();
  const t = translations[language];
  const pt = progressTranslations[language] || progressTranslations.en;

  const [isLogOpen, setIsLogOpen] = useState(false);
  const [logDuration, setLogDuration] = useState(20);
  const [logAsanas, setLogAsanas] = useState<string[]>([]);
  const [logPranayamas, setLogPranayamas] = useState<string[]>([]);

  const translatedAsanas = ASANAS.map((a) => getTranslatedAsana(a, language));
  const translatedPranayamas = PRANAYAMAS.map((p) => getTranslatedPranayama(p, language));

  // Calculate statistics
  const totalSessions = sessionLogs.length;
  const totalMinutes = sessionLogs.reduce((acc, curr) => acc + curr.duration, 0);

  // Compile last 7 days practice data for SVG Bar Chart
  const weeklyData = useMemo(() => {
    const data = [];
    const weekdays = pt.weekdays;
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateString = date.toISOString().split("T")[0];
      const matchingLog = sessionLogs.find((log) => log.date === dateString);
      
      data.push({
        dayLabel: weekdays[date.getDay()],
        dateStr: dateString,
        minutes: matchingLog ? matchingLog.duration : 0,
      });
    }
    return data;
  }, [sessionLogs, pt.weekdays]);

  const maxMinutes = Math.max(...weeklyData.map((d) => d.minutes), 30); // scale chart minimum to 30

  const handleManualLog = (e: React.FormEvent) => {
    e.preventDefault();
    logSession({
      duration: logDuration,
      completedAsanaIds: logAsanas,
      completedPranayamaIds: logPranayamas,
    });
    
    // Reset Form
    setLogDuration(20);
    setLogAsanas([]);
    setLogPranayamas([]);
    setIsLogOpen(false);
  };

  const handleToggleAsana = (id: string) => {
    setLogAsanas((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleTogglePranayama = (id: string) => {
    setLogPranayamas((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteLog = (date: string) => {
    const updated = sessionLogs.filter((log) => log.date !== date);
    localStorage.setItem("yoga-session-logs", JSON.stringify(updated));
    window.location.reload(); // Quick refresh to update state in AppContext
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Tracker Status Banner */}
      <div className="mb-8">
        <h1 className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
          {t.progressTitle}
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          {t.progressSubtitle}
        </p>
      </div>

      {/* Grid of stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        
        {/* Streak card */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-md flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/20">
            <Flame className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xxs font-bold text-slate-500 uppercase tracking-wider block">{t.streakCount}</span>
            <span className="text-xl font-bold text-white">{streak} {t.days}</span>
          </div>
        </div>

        {/* Total Sessions card */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-md flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xxs font-bold text-slate-500 uppercase tracking-wider block">{t.completedSessions}</span>
            <span className="text-xl font-bold text-white">{totalSessions} {pt.sessionsSuffix}</span>
          </div>
        </div>

        {/* Total minutes card */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-md flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/20">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xxs font-bold text-slate-500 uppercase tracking-wider block">{pt.practiceDuration}</span>
            <span className="text-xl font-bold text-white">{totalMinutes} {pt.minutesSuffix}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SVG bar chart */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold text-base flex items-center gap-2">
              <Calendar className="h-5 w-5 text-emerald-400" /> {t.weeklyWorkoutSummary}
            </h3>
            <button
              onClick={() => setIsLogOpen(!isLogOpen)}
              className="flex items-center space-x-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>{pt.logPractice}</span>
            </button>
          </div>

          {/* SVG bar drawing */}
          <div className="w-full flex justify-center py-4 bg-slate-950/20 rounded-2xl border border-white/5">
            {totalSessions > 0 ? (
              <div className="w-full max-w-lg px-4">
                <svg viewBox="0 0 500 240" className="w-full overflow-visible">
                  {/* Grid Lines */}
                  <line x1="40" y1="30" x2="480" y2="30" stroke="rgba(255,255,255,0.05)" strokeDasharray="4,4" />
                  <line x1="40" y1="90" x2="480" y2="90" stroke="rgba(255,255,255,0.05)" strokeDasharray="4,4" />
                  <line x1="40" y1="150" x2="480" y2="150" stroke="rgba(255,255,255,0.05)" strokeDasharray="4,4" />
                  <line x1="40" y1="210" x2="480" y2="210" stroke="rgba(255,255,255,0.15)" />

                  {/* Y Axis Labels */}
                  <text x="30" y="35" fill="#64748b" fontSize="10" textAnchor="end">{Math.round(maxMinutes)}{language === "mr" ? "मि" : language === "hi" ? "मि" : "m"}</text>
                  <text x="30" y="95" fill="#64748b" fontSize="10" textAnchor="end">{Math.round(maxMinutes / 2)}{language === "mr" ? "मि" : language === "hi" ? "मि" : "m"}</text>
                  <text x="30" y="155" fill="#64748b" fontSize="10" textAnchor="end">{Math.round(maxMinutes / 4)}{language === "mr" ? "मि" : language === "hi" ? "मि" : "m"}</text>
                  <text x="30" y="215" fill="#64748b" fontSize="10" textAnchor="end">0{language === "mr" ? "मि" : language === "hi" ? "मि" : "m"}</text>

                  {/* Bars & Labels */}
                  {weeklyData.map((d, index) => {
                    const barWidth = 32;
                    const spacing = 58;
                    const startX = 60 + index * spacing;
                    
                    // Scale bar height
                    const chartHeight = 180;
                    const barHeight = (d.minutes / maxMinutes) * chartHeight;
                    const startY = 210 - barHeight;

                    const todayStr = new Date().toISOString().split("T")[0];
                    const isToday = d.dateStr === todayStr;

                    return (
                      <g key={d.dateStr}>
                        {/* Bar Gradient Background */}
                        <rect
                          x={startX}
                          y={startY}
                          width={barWidth}
                          height={barHeight}
                          rx="6"
                          fill={isToday ? "url(#todayBar)" : "url(#standardBar)"}
                          className="transition-all duration-500 hover:opacity-85 cursor-pointer"
                        />
                        {/* Value indicator hover bubble */}
                        {d.minutes > 0 && (
                          <text
                            x={startX + barWidth / 2}
                            y={startY - 6}
                            fill={isToday ? "#34d399" : "#94a3b8"}
                            fontSize="10"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            {d.minutes}{language === "mr" ? "मि" : language === "hi" ? "मि" : "m"}
                          </text>
                        )}
                        {/* X Axis Labels */}
                        <text
                          x={startX + barWidth / 2}
                          y="230"
                          fill={isToday ? "#34d399" : "#64748b"}
                          fontSize="11"
                          fontWeight={isToday ? "bold" : "normal"}
                          textAnchor="middle"
                        >
                          {d.dayLabel}
                        </text>
                      </g>
                    );
                  })}

                  {/* Gradients */}
                  <defs>
                    <linearGradient id="standardBar" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                    <linearGradient id="todayBar" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#0891b2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
                <BarChart3 className="h-10 w-10 text-slate-600 animate-bounce" />
                <p className="text-slate-400 text-sm">{pt.noWorkoutData}</p>
              </div>
            )}
          </div>
        </div>

        {/* Manual Log Drawer */}
        {isLogOpen && (
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md h-fit">
            <h3 className="text-white font-bold text-base pb-3 border-b border-white/10 mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400" /> {pt.form.title}
            </h3>

            <form onSubmit={handleManualLog} className="space-y-4">
              <div>
                <label className="block text-xxs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  {pt.form.durationLabel}
                </label>
                <input
                  type="number"
                  required
                  min="5"
                  max="180"
                  value={logDuration}
                  onChange={(e) => setLogDuration(parseInt(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xxs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  {pt.form.asanasLabel}
                </label>
                <div className="max-h-24 overflow-y-auto border border-white/5 rounded-xl p-2.5 space-y-1 bg-slate-950/20">
                  {translatedAsanas.map((asana) => {
                    const isSelected = logAsanas.includes(asana.id);
                    return (
                      <button
                        key={asana.id}
                        type="button"
                        onClick={() => handleToggleAsana(asana.id)}
                        className={`flex w-full items-center justify-between rounded-lg px-2 py-1 text-left text-xxs transition-colors ${
                          isSelected ? "bg-emerald-500/10 text-emerald-400" : "text-slate-400 hover:bg-white/5"
                        }`}
                      >
                        <span>{asana.name}</span>
                        {isSelected && <span className="text-xxs">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xxs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  {pt.form.pranayamaLabel}
                </label>
                <div className="max-h-24 overflow-y-auto border border-white/5 rounded-xl p-2.5 space-y-1 bg-slate-950/20">
                  {translatedPranayamas.map((p) => {
                    const isSelected = logPranayamas.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleTogglePranayama(p.id)}
                        className={`flex w-full items-center justify-between rounded-lg px-2 py-1 text-left text-xxs transition-colors ${
                          isSelected ? "bg-emerald-500/10 text-emerald-400" : "text-slate-400 hover:bg-white/5"
                        }`}
                      >
                        <span>{p.name}</span>
                        {isSelected && <span className="text-xxs">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-300 transition-all"
                >
                  {pt.form.btnSave}
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogOpen(false)}
                  className="rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2.5 text-xs font-semibold text-slate-300 transition-all"
                >
                  {pt.form.btnCancel}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* History Log Table */}
      <div className="mt-12 rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md">
        <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-emerald-400" /> {pt.table.title}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-slate-300">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-xxs font-bold uppercase tracking-wider">
                <th className="py-3 px-4">{pt.table.thDate}</th>
                <th className="py-3 px-4">{pt.table.thDuration}</th>
                <th className="py-3 px-4">{pt.table.thAsanas}</th>
                <th className="py-3 px-4">{pt.table.thPranayamas}</th>
                <th className="py-3 px-4 text-right">{pt.table.thAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sessionLogs.map((log) => (
                <tr key={log.date} className="hover:bg-white/2 transition-colors">
                  <td className="py-4 px-4 font-semibold text-white flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-emerald-400" /> {log.date}
                  </td>
                  <td className="py-4 px-4 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-teal-400" /> {log.duration} {pt.table.minsSuffix}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-xs">
                    <div className="flex flex-wrap gap-1">
                      {log.completedAsanaIds.map((id) => (
                        <span key={id} className="rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 font-medium">
                          {translatedAsanas.find((a) => a.id === id)?.name || id}
                        </span>
                      ))}
                      {log.completedAsanaIds.length === 0 && <span className="text-slate-500">-</span>}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-xs">
                    <div className="flex flex-wrap gap-1">
                      {log.completedPranayamaIds.map((id) => (
                        <span key={id} className="rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 px-2 py-0.5 font-medium">
                          {translatedPranayamas.find((p) => p.id === id)?.name || id}
                        </span>
                      ))}
                      {log.completedPranayamaIds.length === 0 && <span className="text-slate-500">-</span>}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleDeleteLog(log.date)}
                      className="rounded p-1.5 text-slate-500 hover:bg-rose-500/15 hover:text-rose-400 border border-transparent transition-all"
                      title="Delete log entry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {sessionLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 italic">
                    {pt.table.noSessions}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
