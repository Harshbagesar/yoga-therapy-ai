"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useApp, Routine } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { ASANAS, PRANAYAMAS } from "@/data/yoga-db";
import { getTranslatedAsana, getTranslatedPranayama } from "@/lib/getTranslatedData";
import { Plus, Trash2, Play, Calendar, Clock, Check, X, Award, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const plannerTranslations = {
  en: {
    asanasSuffix: "Asanas",
    breathworkSuffix: "Breathwork",
    newRoutineDetails: "New Routine Details",
    routinePlaceholder: "e.g., Post-Work Decompress",
    inProgress: "Routine In Progress",
    step: "Step",
    of: "of",
    asanaType: "🧘 Asana",
    pranayamaType: "🌬️ Pranayama",
    timeLeft: "Time Left",
    pause: "Pause",
    resume: "Resume",
    skipFinish: "Skip / Finish",
    congratsTitle: "Namaste! Routine Complete",
    congratsDesc: "Congratulations! You have completed the routine.",
    practicedLabel: "Practiced",
    streakLabel: "Active Streak",
    btnClose: "Close Window"
  },
  mr: {
    asanasSuffix: "आसने",
    breathworkSuffix: "प्राणायाम",
    newRoutineDetails: "नवीन दिनचर्या तपशील",
    routinePlaceholder: "उदा., कामाच्या वेळेनंतर आराम",
    inProgress: "दिनचर्या सुरू आहे",
    step: "टप्पा",
    of: "पैकी",
    asanaType: "🧘 आसन",
    pranayamaType: "🌬️ प्राणायाम",
    timeLeft: "उर्वरित वेळ",
    pause: "विराम द्या",
    resume: "पुन्हा सुरू करा",
    skipFinish: "वगळा / समाप्त करा",
    congratsTitle: "नमस्ते! दिनचर्या पूर्ण झाली",
    congratsDesc: "अभिनंदन! तुम्ही तुमची दिनचर्या पूर्ण केली आहे.",
    practicedLabel: "सराव केला",
    streakLabel: "सक्रिय श्रेणी",
    btnClose: "खिडकी बंद करा"
  },
  hi: {
    asanasSuffix: "आसन",
    breathworkSuffix: "प्राणायाम",
    newRoutineDetails: "नया दिनचर्या विवरण",
    routinePlaceholder: "उदा., काम के बाद विश्राम",
    inProgress: "दिनचर्या प्रगति पर है",
    step: "कदम",
    of: "का",
    asanaType: "🧘 आसन",
    pranayamaType: "🌬️ प्राणायाम",
    timeLeft: "समय शेष",
    pause: "रोकें",
    resume: "फिर शुरू करें",
    skipFinish: "छोड़ें / समाप्त करें",
    congratsTitle: "नमस्ते! दिनचर्या पूर्ण हुई",
    congratsDesc: "बधाई हो! आपने अपनी दिनचर्या पूरी कर ली है।",
    practicedLabel: "अभ्यास किया",
    streakLabel: "सक्रिय सिलसिला",
    btnClose: "खिड़की बंद करें"
  }
};

export const DailyPlanner: React.FC = () => {
  const { 
    language, 
    routines, 
    addRoutine, 
    deleteRoutine, 
    logSession, 
    streak 
  } = useApp();
  const t = translations[language];
  const dpt = plannerTranslations[language] || plannerTranslations.en;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newRoutineName, setNewRoutineName] = useState("");
  const [newRoutineDuration, setNewRoutineDuration] = useState(15);
  const [selectedAsanaIds, setSelectedAsanaIds] = useState<string[]>([]);
  const [selectedPranayamaIds, setSelectedPranayamaIds] = useState<string[]>([]);

  // Active Session State
  const [activeSession, setActiveSession] = useState<Routine | null>(null);
  const [sessionTimeLeft, setSessionTimeLeft] = useState(0); // in seconds
  const [isSessionRunning, setIsSessionRunning] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // Declare handleFinishSession before the effect that references it
  const handleFinishSession = useCallback(() => {
    setIsSessionRunning(false);
    setSessionCompleted(true);
    
    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });

    // Log the completed session
    if (activeSession) {
      logSession({
        duration: activeSession.duration,
        completedAsanaIds: activeSession.asanaIds,
        completedPranayamaIds: activeSession.pranayamaIds,
      });
    }
  }, [activeSession, logSession]);

  // Timer effect
  useEffect(() => {
    if (!isSessionRunning) return;

    const timer = setInterval(() => {
      setSessionTimeLeft((prev) => {
        if (prev > 1) return prev - 1;

        // Time reached zero — advance step or finish
        const totalSteps = (activeSession?.asanaIds.length || 0) + (activeSession?.pranayamaIds.length || 0);
        setCurrentStepIdx((stepIdx) => {
          if (stepIdx < totalSteps - 1) {
            return stepIdx + 1;
          }
          // Session complete — finish outside the render cycle
          setTimeout(() => handleFinishSession(), 0);
          return stepIdx;
        });

        return 60; // reset to 60s for next step
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSessionRunning, activeSession, handleFinishSession]);

  const handleStartSession = (routine: Routine) => {
    setActiveSession(routine);
    // Set 60 seconds per pose/exercise for demonstration
    setSessionTimeLeft(60);
    setCurrentStepIdx(0);
    setIsSessionRunning(true);
    setSessionCompleted(false);
  };

  const handleCloseSession = () => {
    setActiveSession(null);
    setSessionCompleted(false);
    setIsSessionRunning(false);
  };

  const handleSubmitRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoutineName.trim()) return;

    addRoutine({
      name: newRoutineName,
      duration: newRoutineDuration,
      asanaIds: selectedAsanaIds,
      pranayamaIds: selectedPranayamaIds,
    });

    // Reset Form
    setNewRoutineName("");
    setNewRoutineDuration(15);
    setSelectedAsanaIds([]);
    setSelectedPranayamaIds([]);
    setIsFormOpen(false);
  };

  const toggleFormAsanaSelection = (id: string) => {
    setSelectedAsanaIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleFormPranayamaSelection = (id: string) => {
    setSelectedPranayamaIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Translate
  const translatedAsanas = ASANAS.map((a) => getTranslatedAsana(a, language));
  const translatedPranayamas = PRANAYAMAS.map((p) => getTranslatedPranayama(p, language));

  // Compile steps for active session view
  const activeSessionSteps: { type: "asana" | "pranayama"; name: string; desc: string }[] = [];
  if (activeSession) {
    activeSession.asanaIds.forEach((id) => {
      const asana = translatedAsanas.find((a) => a.id === id);
      if (asana) {
        activeSessionSteps.push({
          type: "asana",
          name: asana.name,
          desc: asana.description,
        });
      }
    });
    activeSession.pranayamaIds.forEach((id) => {
      const pranayama = translatedPranayamas.find((p) => p.id === id);
      if (pranayama) {
        activeSessionSteps.push({
          type: "pranayama",
          name: pranayama.name,
          desc: pranayama.benefits[0],
        });
      }
    });
  }

  const currentStep = activeSessionSteps[currentStepIdx];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Tracker Status Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Streak card */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-tr from-amber-500/10 to-orange-500/10 p-6 backdrop-blur-md flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider">{t.streakCount}</h4>
            <p className="text-3xl font-extrabold text-white flex items-baseline gap-1.5">
              {streak} <span className="text-sm font-medium text-slate-400">{t.days}</span>
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <Flame className="h-6 w-6 animate-pulse" />
          </div>
        </div>

        {/* Title details */}
        <div className="md:col-span-2 flex flex-col justify-center">
          <h1 className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-3xl font-extrabold text-transparent">
            {t.plannerTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {t.plannerSubtitle}
          </p>
        </div>
      </div>

      {/* Action panel & List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Custom routines list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-emerald-400" /> {t.customRoutines}
            </h3>
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="flex items-center space-x-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4.5 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>{t.createNewRoutine}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {routines.map((routine) => (
              <div
                key={routine.id}
                className="group rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-300"
              >
                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {routine.name}
                  </h4>
                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1 text-emerald-400" /> {routine.duration} {language === "mr" ? "मि" : language === "hi" ? "मि" : "mins"}
                    </span>
                    <span className="rounded bg-white/5 px-2 py-0.5 border border-white/5">
                      {routine.asanaIds.length} {dpt.asanasSuffix}
                    </span>
                    <span className="rounded bg-white/5 px-2 py-0.5 border border-white/5">
                      {routine.pranayamaIds.length} {dpt.breathworkSuffix}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => deleteRoutine(routine.id)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-rose-500/15 hover:text-rose-400 border border-transparent transition-all"
                    title="Delete Routine"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleStartSession(routine)}
                    className="flex items-center space-x-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/10"
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    <span>{t.startPractice}</span>
                  </button>
                </div>
              </div>
            ))}

            {routines.length === 0 && (
              <p className="text-sm text-slate-500 py-8 text-center col-span-2">
                {t.noRoutines}
              </p>
            )}
          </div>
        </div>

        {/* Creator panel form */}
        {isFormOpen && (
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md h-fit">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-white font-bold text-base">{dpt.newRoutineDetails}</h3>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitRoutine} className="space-y-4">
              <div>
                <label className="block text-xxs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  {t.routineName}
                </label>
                <input
                  type="text"
                  required
                  placeholder={dpt.routinePlaceholder}
                  value={newRoutineName}
                  onChange={(e) => setNewRoutineName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xxs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  {t.durationMins}
                </label>
                <input
                  type="number"
                  required
                  min="5"
                  max="120"
                  value={newRoutineDuration}
                  onChange={(e) => setNewRoutineDuration(parseInt(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* Asana selection list */}
              <div>
                <label className="block text-xxs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {t.selectAsanas}
                </label>
                <div className="max-h-32 overflow-y-auto border border-white/5 rounded-xl p-2.5 space-y-1 bg-slate-950/20">
                  {translatedAsanas.map((asana) => {
                    const isSelected = selectedAsanaIds.includes(asana.id);
                    return (
                      <button
                        key={asana.id}
                        type="button"
                        onClick={() => toggleFormAsanaSelection(asana.id)}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors ${
                          isSelected ? "bg-emerald-500/10 text-emerald-400" : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span>{asana.name}</span>
                        {isSelected && <Check className="h-3.5 w-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pranayama selection list */}
              <div>
                <label className="block text-xxs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {t.selectPranayamas}
                </label>
                <div className="max-h-32 overflow-y-auto border border-white/5 rounded-xl p-2.5 space-y-1 bg-slate-950/20">
                  {translatedPranayamas.map((p) => {
                    const isSelected = selectedPranayamaIds.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => toggleFormPranayamaSelection(p.id)}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors ${
                          isSelected ? "bg-emerald-500/10 text-emerald-400" : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span>{p.name}</span>
                        {isSelected && <Check className="h-3.5 w-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-300 transition-all duration-300"
                >
                  {t.saveRoutine}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Active Session Overlay Panel */}
      <AnimatePresence>
        {activeSession && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl text-center space-y-6"
            >
              {!sessionCompleted ? (
                <>
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                      {dpt.inProgress}: {activeSession.name}
                    </span>
                    <button
                      onClick={handleCloseSession}
                      className="rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Pose/Technique Display */}
                  <div className="space-y-2 py-4">
                    <span className="text-xxs font-bold text-slate-500 uppercase tracking-widest block">
                      {dpt.step} {currentStepIdx + 1} {dpt.of} {activeSessionSteps.length} • {currentStep?.type === "asana" ? dpt.asanaType : dpt.pranayamaType}
                    </span>
                    <h3 className="text-3xl font-extrabold text-white animate-pulse">
                      {currentStep?.name}
                    </h3>
                    <p className="text-sm text-slate-400 max-w-sm mx-auto">
                      {currentStep?.desc}
                    </p>
                  </div>

                  {/* Animated Timer Dial */}
                  <div className="relative flex items-center justify-center h-48 w-48 mx-auto rounded-full border-4 border-emerald-500/20 bg-slate-950/40">
                    <div className="text-center">
                      <span className="text-4xl font-extrabold text-white">
                        {Math.floor(sessionTimeLeft / 60)}:{(sessionTimeLeft % 60).toString().padStart(2, "0")}
                      </span>
                      <span className="block text-xxs font-bold text-slate-500 uppercase tracking-wider mt-1">
                        {dpt.timeLeft}
                      </span>
                    </div>

                    {/* Spinning ring decorative border */}
                    <div className="absolute inset-0 rounded-full border-4 border-t-emerald-500 border-r-teal-400 border-b-transparent border-l-transparent animate-spin-slow"></div>
                  </div>

                  {/* Session Controls */}
                  <div className="flex justify-center gap-3 pt-4 border-t border-white/5">
                    <button
                      onClick={() => setIsSessionRunning(!isSessionRunning)}
                      className={`rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all ${
                        isSessionRunning
                          ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20"
                          : "bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/15"
                      }`}
                    >
                      {isSessionRunning ? dpt.pause : dpt.resume}
                    </button>

                    <button
                      onClick={handleFinishSession}
                      className="rounded-xl bg-slate-800 border border-white/10 hover:bg-slate-700 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-300 transition-all"
                    >
                      {dpt.skipFinish}
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-6 space-y-6">
                  <div className="flex justify-center">
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/30">
                      <Award className="h-10 w-10 animate-bounce" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-3xl font-extrabold text-white">{dpt.congratsTitle}</h3>
                    <p className="text-sm text-slate-400 max-w-sm mx-auto">
                      {dpt.congratsDesc} <strong>{activeSession.name}</strong> ({activeSession.duration} {language === "mr" ? "मिनिटांचा सराव" : language === "hi" ? "मिनट का अभ्यास" : "minutes of practice"}).
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 border border-white/5 p-4 flex items-center justify-center gap-6 max-w-xs mx-auto">
                    <div className="text-center">
                      <span className="block text-xl font-bold text-white">{activeSession.duration}{language === "mr" ? "मि" : language === "hi" ? "मि" : "m"}</span>
                      <span className="text-xxs text-slate-500 uppercase font-bold tracking-wider">{dpt.practicedLabel}</span>
                    </div>
                    <div className="h-8 w-px bg-white/10"></div>
                    <div className="text-center">
                      <span className="block text-xl font-bold text-white">🔥 {streak}</span>
                      <span className="text-xxs text-slate-500 uppercase font-bold tracking-wider">{dpt.streakLabel}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleCloseSession}
                      className="rounded-xl bg-emerald-500 hover:bg-emerald-400 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all"
                    >
                      {dpt.btnClose}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
