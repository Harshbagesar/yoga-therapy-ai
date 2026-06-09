"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { ASANAS, PRANAYAMAS, Asana, Pranayama } from "@/data/yoga-db";
import { getTranslatedAsana, getTranslatedPranayama } from "@/lib/getTranslatedData";
import { AsanaIllustration } from "./AsanaIllustration";
import { TextToSpeech } from "./TextToSpeech";
import { Search, Heart, Eye, ArrowRight, X, Clock, Dumbbell, ShieldAlert, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const libraryTranslations = {
  en: {
    tabAsanas: "Yoga Asanas (Postures)",
    tabPranayamas: "Pranayamas (Breathing)",
    difficultyLabel: "Difficulty:",
    allLevels: "All Levels",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    viewGuide: "View Guide",
    recentlyViewed: "Recently Viewed",
    levelSuffix: "Level",
    sanskritNameLabel: "Sanskrit Name:",
    breathingTechniqueLabel: "Breathing Technique:",
    duration: "Duration",
    targets: "Targets",
    description: "Description",
    keyBenefits: "Key Benefits",
    stepsOfExecution: "Steps of Execution",
    safetyPrecautions: "Safety Precautions",
    subtitle: "Explore therapeutic poses, alignment guides, and controlled breathing methods.",
    ttsPose: "Yoga Pose: ",
    ttsTarget: ". Target Body Parts: ",
    ttsInstructions: ". Instructions: ",
    ttsBreathing: "Breathing Practice: ",
    ttsTechnique: ". Technique: ",
    ttsSteps: ". Steps: "
  },
  mr: {
    tabAsanas: "योगासने (आसने)",
    tabPranayamas: "प्राणायाम (श्वसन)",
    difficultyLabel: "काठिण्य पातळी:",
    allLevels: "सर्व पातळी",
    beginner: "नवशिक्या",
    intermediate: "मध्यम",
    advanced: "प्रगत",
    viewGuide: "मार्गदर्शक पहा",
    recentlyViewed: "अलीकडे पाहिलेले",
    levelSuffix: "पातळी",
    sanskritNameLabel: "संस्कृत नाव:",
    breathingTechniqueLabel: "श्वसन तंत्र:",
    duration: "कालावधी",
    targets: "लक्ष्य",
    description: "वर्णन",
    keyBenefits: "मुख्य फायदे",
    stepsOfExecution: "पायऱ्या",
    safetyPrecautions: "सुरक्षितता खबरदारी",
    subtitle: "उपचारात्मक आसने, संरेखन मार्गदर्शक आणि नियंत्रित श्वासोच्छ्वासाच्या पद्धतींचा शोध घ्या.",
    ttsPose: "योगासन: ",
    ttsTarget: ". शरीराचे लक्ष्यित भाग: ",
    ttsInstructions: ". मार्गदर्शक पायऱ्या: ",
    ttsBreathing: "श्वसनाचा सराव: ",
    ttsTechnique: ". पद्धत: ",
    ttsSteps: ". पायऱ्या: "
  },
  hi: {
    tabAsanas: "योगासन (मुद्राएं)",
    tabPranayamas: "प्राणायाम (श्वसन)",
    difficultyLabel: "कठिनाई स्तर:",
    allLevels: "सभी स्तर",
    beginner: "शुरुआती",
    intermediate: "मध्यम",
    advanced: "उन्नत",
    viewGuide: "मार्गदर्शिका देखें",
    recentlyViewed: "हाल ही में देखे गए",
    levelSuffix: "स्तर",
    sanskritNameLabel: "संस्कृत नाम:",
    breathingTechniqueLabel: "श्वसन तकनीक:",
    duration: "अवधि",
    targets: "लक्ष्य",
    description: "विवरण",
    keyBenefits: "मुख्य लाभ",
    stepsOfExecution: "चरण",
    safetyPrecautions: "सुरक्षा सावधानियां",
    subtitle: "चिकित्सकीय आसनों, संरेखण मार्गदर्शिकाओं और नियंत्रित श्वास विधियों का अन्वेषण करें।",
    ttsPose: "योगासन: ",
    ttsTarget: ". लक्षित अंग: ",
    ttsInstructions: ". निर्देश: ",
    ttsBreathing: "प्राणायाम अभ्यास: ",
    ttsTechnique: ". तकनीक: ",
    ttsSteps: ". चरण: "
  }
};

export const Library: React.FC = () => {
  const { 
    language, 
    bookmarkedAsanas, 
    toggleBookmarkAsana, 
    bookmarkedPranayamas, 
    toggleBookmarkPranayama,
    recentlyViewed,
    addRecentlyViewed
  } = useApp();
  const t = translations[language];
  const lt = libraryTranslations[language] || libraryTranslations.en;

  const [activeTab, setActiveTab] = useState<"asanas" | "pranayamas">("asanas");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [selectedAsana, setSelectedAsana] = useState<Asana | null>(null);
  const [selectedPranayama, setSelectedPranayama] = useState<Pranayama | null>(null);

  // Translate all data
  const translatedAsanas = ASANAS.map((a) => getTranslatedAsana(a, language));
  const translatedPranayamas = PRANAYAMAS.map((p) => getTranslatedPranayama(p, language));

  // Filter Asanas
  const filteredAsanas = translatedAsanas.filter((asana) => {
    const matchesSearch = 
      asana.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asana.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asana.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asana.targetBodyParts.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty = 
      difficultyFilter === "all" || asana.difficulty.toLowerCase() === difficultyFilter.toLowerCase();

    return matchesSearch && matchesDifficulty;
  });

  // Filter Pranayamas
  const filteredPranayamas = translatedPranayamas.filter((pranayama) => {
    const matchesSearch = 
      pranayama.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pranayama.technique.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pranayama.benefits.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty = 
      difficultyFilter === "all" || pranayama.difficulty.toLowerCase() === difficultyFilter.toLowerCase();

    return matchesSearch && matchesDifficulty;
  });

  const handleOpenAsana = (asana: Asana) => {
    setSelectedAsana(asana);
    addRecentlyViewed(asana.id, "asana");
  };

  const handleOpenPranayama = (pranayama: Pranayama) => {
    setSelectedPranayama(pranayama);
    addRecentlyViewed(pranayama.id, "pranayama");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Search and Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
            {t.navLibrary}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {lt.subtitle}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full max-w-md">
          <Search className="absolute top-3.5 left-4 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/60 pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Library Toggles */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex space-x-2 rounded-2xl border border-white/5 bg-slate-900/40 p-1.5 backdrop-blur-md w-fit">
          <button
            onClick={() => {
              setActiveTab("asanas");
              setDifficultyFilter("all");
            }}
            className={`rounded-xl px-6 py-2.5 text-sm font-semibold tracking-wide transition-all ${
              activeTab === "asanas"
                ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/15"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {lt.tabAsanas}
          </button>
          <button
            onClick={() => {
              setActiveTab("pranayamas");
              setDifficultyFilter("all");
            }}
            className={`rounded-xl px-6 py-2.5 text-sm font-semibold tracking-wide transition-all ${
              activeTab === "pranayamas"
                ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/15"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {lt.tabPranayamas}
          </button>
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{lt.difficultyLabel}</span>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 focus:border-emerald-500 focus:outline-none"
          >
            <option value="all">{lt.allLevels}</option>
            <option value="beginner">{lt.beginner}</option>
            <option value="intermediate">{lt.intermediate}</option>
            <option value="advanced">{lt.advanced}</option>
          </select>
        </div>
      </div>

      {/* Main Grid View */}
      {activeTab === "asanas" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAsanas.map((asana) => {
            const isFav = bookmarkedAsanas.includes(asana.id);
            return (
              <div
                key={asana.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-md hover:border-emerald-500/40 transition-all duration-300"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={`inline-block rounded-lg px-2.5 py-0.5 text-xxs font-bold uppercase tracking-widest ${
                        asana.difficulty === "Beginner" 
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : asana.difficulty === "Intermediate"
                          ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        {asana.difficulty === "Beginner" ? lt.beginner : asana.difficulty === "Intermediate" ? lt.intermediate : lt.advanced}
                      </span>
                      <h3 className="mt-2 text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {asana.name}
                      </h3>
                      <p className="text-xs text-slate-500 italic mt-0.5">
                        {asana.englishName} ({asana.sanskritName})
                      </p>
                    </div>

                    <button
                      onClick={() => toggleBookmarkAsana(asana.id)}
                      className={`rounded-xl border p-2 transition-all duration-200 ${
                        isFav 
                          ? "bg-rose-500/15 border-rose-500/30 text-rose-400"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Heart className="h-4.5 w-4.5" fill={isFav ? "currentColor" : "none"} />
                    </button>
                  </div>

                  {/* SVG Illustration Container */}
                  <div className="my-4 flex items-center justify-center rounded-xl bg-slate-950/40 p-4 border border-white/5">
                    <AsanaIllustration id={asana.id} className="h-32 w-auto" />
                  </div>

                  <p className="text-sm text-slate-400 line-clamp-2">
                     {asana.description}
                  </p>

                  {/* Target Body Parts */}
                  <div className="mt-4 flex flex-wrap gap-1">
                    {asana.targetBodyParts.map((part) => (
                       <span key={part} className="rounded-lg bg-white/5 px-2 py-1 text-xxs font-medium text-slate-400 border border-white/5">
                        {part}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="flex items-center text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5 mr-1" /> {asana.duration}
                  </span>
                  
                  <button
                    onClick={() => handleOpenAsana(asana)}
                    className="flex items-center space-x-1 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-all"
                  >
                    <span>{lt.viewGuide}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPranayamas.map((pranayama) => {
            const isFav = bookmarkedPranayamas.includes(pranayama.id);
            return (
              <div
                key={pranayama.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-md hover:border-emerald-500/40 transition-all duration-300"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={`inline-block rounded-lg px-2.5 py-0.5 text-xxs font-bold uppercase tracking-widest ${
                        pranayama.difficulty === "Beginner" 
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                      }`}>
                        {pranayama.difficulty === "Beginner" ? lt.beginner : pranayama.difficulty === "Intermediate" ? lt.intermediate : lt.advanced}
                      </span>
                      <h3 className="mt-2 text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {pranayama.name}
                      </h3>
                      <p className="text-xs text-slate-500 italic mt-0.5">
                        {pranayama.technique}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleBookmarkPranayama(pranayama.id)}
                      className={`rounded-xl border p-2 transition-all duration-200 ${
                        isFav 
                          ? "bg-rose-500/15 border-rose-500/30 text-rose-400"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Heart className="h-4.5 w-4.5" fill={isFav ? "currentColor" : "none"} />
                    </button>
                  </div>

                  {/* Decorative Breathing Indicator */}
                  <div className="my-4 flex items-center justify-center rounded-xl bg-slate-950/40 p-6 border border-white/5 text-slate-500">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border-2 border-dashed border-emerald-500/30 animate-pulse">
                      <span className="text-2xl">🌬️</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 line-clamp-3">
                     {pranayama.benefits[0]}
                  </p>
                </div>

                {/* Card CTA */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="flex items-center text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5 mr-1" /> {pranayama.duration}
                  </span>
                  
                  <button
                    onClick={() => handleOpenPranayama(pranayama)}
                    className="flex items-center space-x-1 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-all"
                  >
                    <span>{lt.viewGuide}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Recents list if available */}
      {recentlyViewed.length > 0 && (
        <div className="mt-16 rounded-2xl border border-white/5 bg-slate-900/20 p-6 backdrop-blur-md">
          <h3 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-2 mb-4">
            <Eye className="h-4 w-4 text-emerald-400" /> {lt.recentlyViewed}
          </h3>
          <div className="flex flex-wrap gap-3">
            {recentlyViewed.map((recent, idx) => {
              if (recent.type === "asana") {
                const asana = translatedAsanas.find((a) => a.id === recent.id);
                if (!asana) return null;
                return (
                  <button
                    key={`${recent.id}-${idx}`}
                    onClick={() => handleOpenAsana(asana)}
                    className="rounded-full border border-white/10 bg-slate-950 px-4 py-2 text-xs font-medium text-slate-300 hover:border-emerald-500/30 hover:text-white transition-all flex items-center gap-1.5"
                  >
                    <span>🧘</span>
                    <span>{asana.name}</span>
                  </button>
                );
              } else {
                const pranayama = translatedPranayamas.find((p) => p.id === recent.id);
                if (!pranayama) return null;
                return (
                  <button
                    key={`${recent.id}-${idx}`}
                    onClick={() => handleOpenPranayama(pranayama)}
                    className="rounded-full border border-white/10 bg-slate-950 px-4 py-2 text-xs font-medium text-slate-300 hover:border-emerald-500/30 hover:text-white transition-all flex items-center gap-1.5"
                  >
                    <span>🌬️</span>
                    <span>{pranayama.name}</span>
                  </button>
                );
              }
            })}
          </div>
        </div>
      )}

      {/* Asana Detail Modal */}
      <AnimatePresence>
        {selectedAsana && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900 p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAsana(null)}
                className="absolute top-4 right-4 rounded-xl p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-all"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Modal Body */}
              <div className="space-y-6">
                <div>
                  <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 uppercase tracking-widest">
                    {selectedAsana.difficulty === "Beginner" ? lt.beginner : selectedAsana.difficulty === "Intermediate" ? lt.intermediate : lt.advanced} {lt.levelSuffix}
                  </span>
                  <h2 className="mt-3 text-3xl font-extrabold text-white">
                    {selectedAsana.name}
                  </h2>
                  <p className="text-sm text-slate-400 italic">
                    {lt.sanskritNameLabel} {selectedAsana.sanskritName} ({selectedAsana.englishName})
                  </p>
                </div>

                {/* TTS Reader */}
                <TextToSpeech
                  text={`${lt.ttsPose}${selectedAsana.name}. ${selectedAsana.description}${lt.ttsTarget}${selectedAsana.targetBodyParts.join(", ")}${lt.ttsInstructions}${selectedAsana.steps.join(". ")}.`}
                  language={language}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column (Illustration & Info) */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-center rounded-2xl bg-slate-950 p-6 border border-white/5">
                      <AsanaIllustration id={selectedAsana.id} className="h-44 w-auto" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-white/5 border border-white/5 p-3">
                        <span className="text-xxs font-bold text-slate-500 uppercase tracking-wider block">{lt.duration}</span>
                        <span className="text-sm font-semibold text-slate-300 flex items-center mt-1">
                          <Clock className="h-4.5 w-4.5 text-emerald-400 mr-1.5" /> {selectedAsana.duration}
                        </span>
                      </div>
                      <div className="rounded-xl bg-white/5 border border-white/5 p-3">
                        <span className="text-xxs font-bold text-slate-500 uppercase tracking-wider block">{lt.targets}</span>
                        <span className="text-xs font-semibold text-slate-300 flex items-center mt-1">
                          <Dumbbell className="h-4.5 w-4.5 text-emerald-400 mr-1.5" /> {selectedAsana.targetBodyParts.slice(0, 2).join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Description & Benefits) */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1.5">{lt.description}</h4>
                      <p className="text-sm text-slate-300 leading-relaxed">{selectedAsana.description}</p>
                    </div>

                    <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Award className="h-4.5 w-4.5 text-emerald-400" /> {lt.keyBenefits}
                      </h4>
                      <ul className="list-disc pl-5 text-sm text-slate-300 space-y-1">
                        {selectedAsana.benefits.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <div className="border-t border-white/5 pt-5">
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3">{lt.stepsOfExecution}</h4>
                  <ol className="list-decimal pl-5 text-sm text-slate-300 space-y-2">
                    {selectedAsana.steps.map((step, index) => (
                      <li key={index} className="pl-1 leading-relaxed">{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Precautions */}
                {selectedAsana.precautions.length > 0 && (
                  <div className="border-t border-white/5 pt-5">
                    <h4 className="text-rose-400 font-bold text-sm uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <ShieldAlert className="h-4.5 w-4.5" /> {lt.safetyPrecautions}
                    </h4>
                    <ul className="list-disc pl-5 text-xs text-rose-300/80 space-y-1">
                      {selectedAsana.precautions.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pranayama Detail Modal */}
      <AnimatePresence>
        {selectedPranayama && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900 p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPranayama(null)}
                className="absolute top-4 right-4 rounded-xl p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-all"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Modal Body */}
              <div className="space-y-6">
                <div>
                  <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 uppercase tracking-widest">
                    {selectedPranayama.difficulty === "Beginner" ? lt.beginner : selectedPranayama.difficulty === "Intermediate" ? lt.intermediate : lt.advanced} {lt.levelSuffix}
                  </span>
                  <h2 className="mt-3 text-3xl font-extrabold text-white">
                    {selectedPranayama.name}
                  </h2>
                  <p className="text-sm text-slate-400 italic">
                    {lt.breathingTechniqueLabel} {selectedPranayama.technique}
                  </p>
                </div>

                {/* TTS Reader */}
                <TextToSpeech
                  text={`${lt.ttsBreathing}${selectedPranayama.name}${lt.ttsTechnique}${selectedPranayama.technique}${lt.ttsSteps}${selectedPranayama.steps.join(". ")}.`}
                  language={language}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column (Stats & Technique) */}
                  <div className="space-y-4">
                    <div className="flex h-44 items-center justify-center rounded-2xl bg-slate-950 p-6 border border-white/5">
                      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-teal-500/10 border-4 border-dashed border-teal-500/20 animate-pulse-slow">
                        <span className="text-4xl">🌬️</span>
                      </div>
                    </div>

                    <div className="rounded-xl bg-white/5 border border-white/5 p-4">
                      <span className="text-xxs font-bold text-slate-500 uppercase tracking-wider block">{lt.duration}</span>
                      <span className="text-sm font-semibold text-slate-300 flex items-center mt-1">
                        <Clock className="h-4.5 w-4.5 text-teal-400 mr-1.5" /> {selectedPranayama.duration}
                      </span>
                    </div>
                  </div>

                  {/* Right Column (Benefits) */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Award className="h-4.5 w-4.5 text-teal-400" /> {lt.keyBenefits}
                      </h4>
                      <ul className="list-disc pl-5 text-sm text-slate-300 space-y-1.5">
                        {selectedPranayama.benefits.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <div className="border-t border-white/5 pt-5">
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3">{lt.stepsOfExecution}</h4>
                  <ol className="list-decimal pl-5 text-sm text-slate-300 space-y-2">
                    {selectedPranayama.steps.map((step, index) => (
                      <li key={index} className="pl-1 leading-relaxed">{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Precautions */}
                {selectedPranayama.precautions.length > 0 && (
                  <div className="border-t border-white/5 pt-5">
                    <h4 className="text-rose-400 font-bold text-sm uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <ShieldAlert className="h-4.5 w-4.5" /> {lt.safetyPrecautions}
                    </h4>
                    <ul className="list-disc pl-5 text-xs text-rose-300/80 space-y-1">
                      {selectedPranayama.precautions.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
