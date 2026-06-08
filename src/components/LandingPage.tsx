"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { DISEASES, ASANAS, PRANAYAMAS, Asana, Pranayama } from "@/data/yoga-db";
import { getTranslatedDisease, getTranslatedAsana, getTranslatedPranayama } from "@/lib/getTranslatedData";
import { AsanaIllustration } from "./AsanaIllustration";
import { TextToSpeech } from "./TextToSpeech";
import { Search, Sparkles, Activity, AlertTriangle, ShieldCheck, Apple, Calendar, HeartPulse, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LandingPageProps {
  onNavigate: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { language, addRecentlyViewed } = useApp();
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string | null>(null);
  
  // Modal detail targets
  const [selectedAsana, setSelectedAsana] = useState<Asana | null>(null);
  const [selectedPranayama, setSelectedPranayama] = useState<Pranayama | null>(null);

  // FAQ states
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(null);

  // Translate all data
  const translatedDiseases = DISEASES.map((d) => getTranslatedDisease(d, language));
  const translatedAsanas = ASANAS.map((a) => getTranslatedAsana(a, language));
  const translatedPranayamas = PRANAYAMAS.map((p) => getTranslatedPranayama(p, language));

  const matchedDisease = translatedDiseases.find((d) => d.id === selectedDiseaseId);

  // Autocomplete disease results
  const searchResults = searchQuery
    ? translatedDiseases.filter((d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.symptoms.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleSelectDisease = (id: string) => {
    setSelectedDiseaseId(id);
    setSearchQuery("");
    addRecentlyViewed(id, "disease");
    // Scroll smoothly to dashboard details
    setTimeout(() => {
      document.getElementById("clinical-dashboard")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleOpenAsana = (asanaId: string) => {
    const asana = translatedAsanas.find((a) => a.id === asanaId);
    if (asana) setSelectedAsana(asana);
  };

  const handleOpenPranayama = (pranayamaId: string) => {
    const pranayama = translatedPranayamas.find((p) => p.id === pranayamaId);
    if (pranayama) setSelectedPranayama(pranayama);
  };

  const faqItems = [
    {
      q: "Can yoga cure chronic diseases permanently?",
      a: "Yoga therapy acts as an evidence-based complementary healthcare system. It helps regulate the nervous system, stimulates organs, reduces inflammation, and balances metabolism, significantly aiding in symptom management and prevention, though it should be practiced alongside regular medical checks."
    },
    {
      q: "Is it safe to practice yoga without an instructor under severe conditions?",
      a: "For conditions like high blood pressure, heart disease, or post-surgical recovery, we recommend consulting your physician first and starting under the guidance of a certified clinical yoga therapist. Always review the 'Precautions' listed in our guides."
    },
    {
      q: "Can I generate a downloadable therapy guide or wellness plan?",
      a: "Yes! Navigate to the 'Therapy Plan' tab, select your health condition, configure the desired sections (such as clinical objectives, poses, and dietary guidelines), and export them instantly as a formatted PDF or MS Word document."
    }
  ];

  return (
    <div className="space-y-16 py-8">
      
      {/* Hero Section */}
      <section className="relative mx-auto max-w-5xl px-4 text-center space-y-6">
        
        {/* Glow orb background */}
        <div className="absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px]"></div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-xs font-semibold text-emerald-400">
          <Sparkles className="h-4 w-4 text-emerald-400 animate-spin-slow" />
          {t.heroTagline}
        </span>

        <h1 className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl leading-tight">
          Yoga Therapy & Disease Management AI
        </h1>

        <p className="mx-auto max-w-2xl text-base text-slate-400 sm:text-lg leading-relaxed">
          Select a health condition or search your symptoms to receive scientific, evidence-based recommended Asanas, Pranayama breath control, Sattvic dietary plans, precautions, and academic project support.
        </p>

        {/* Dynamic Search / Symptoms Checker Card */}
        <div className="mx-auto max-w-xl relative">
          <div className="relative flex items-center rounded-2xl border border-white/10 bg-slate-900/60 p-1.5 shadow-2xl backdrop-blur-md focus-within:border-emerald-500/30">
            <Search className="h-5 w-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              placeholder="Search health condition (e.g. Heart, Diabetes, Stress...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-3 py-2.5 text-sm text-white focus:outline-none placeholder-slate-500"
            />
          </div>

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute left-0 right-0 z-30 mt-2 rounded-2xl border border-white/10 bg-slate-950 p-2 shadow-2xl space-y-1 text-left"
              >
                {searchResults.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleSelectDisease(d.id)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 hover:bg-white/5 transition-all text-xs font-semibold text-slate-200"
                  >
                    <span>{d.name}</span>
                    <span className="text-xxs text-emerald-400 font-bold uppercase tracking-wider">Inspect →</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick select chips */}
        <div className="space-y-3">
          <p className="text-xxs font-bold uppercase tracking-widest text-slate-500">Quick Clinical Lookups</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {translatedDiseases.map((disease) => (
              <button
                key={disease.id}
                onClick={() => handleSelectDisease(disease.id)}
                className={`rounded-xl border px-3.5 py-2 text-xs font-bold transition-all ${
                  selectedDiseaseId === disease.id
                    ? "bg-emerald-500 border-transparent text-white shadow-lg shadow-emerald-500/20"
                    : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {disease.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Dashboard Details Section */}
      <AnimatePresence>
        {matchedDisease && (
          <motion.section
            id="clinical-dashboard"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-6xl px-4 scroll-mt-24"
          >
            <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 md:p-10 shadow-2xl backdrop-blur-md space-y-8">
              
              {/* Dashboard Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b border-white/10 pb-6">
                <div className="space-y-2">
                  <span className="flex items-center gap-1.5 text-xxs font-bold uppercase tracking-widest text-emerald-400">
                    <Activity className="h-4 w-4 text-emerald-400 animate-pulse" /> Therapeutic Disease Profile
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                    {matchedDisease.name}
                  </h2>
                  <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
                    {matchedDisease.description}
                  </p>
                </div>

                {/* TTS Reader for disease info */}
                <div className="shrink-0 self-start">
                  <TextToSpeech
                    text={`Therapeutic Profile: ${matchedDisease.name}. Description: ${matchedDisease.description}. Expected Benefits: ${matchedDisease.expectedBenefits.join(". ")}.`}
                    language={language}
                  />
                </div>
              </div>

              {/* Grid content blocks */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column (Symptoms & Diet) */}
                <div className="space-y-6">
                  
                  {/* Symptoms & Risk Factors */}
                  <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-5 space-y-4">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-1.5">
                      <HeartPulse className="h-4.5 w-4.5 text-emerald-400" /> Symptoms & Risks
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-xxs font-bold text-slate-500 uppercase tracking-wider block mb-1">Key Symptoms</span>
                        <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1">
                          {matchedDisease.symptoms.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <span className="text-xxs font-bold text-slate-500 uppercase tracking-wider block mb-1">Risk Factors</span>
                        <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1">
                          {matchedDisease.riskFactors.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Ayurvedic Diet */}
                  <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-5 space-y-4">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-1.5">
                      <Apple className="h-4.5 w-4.5 text-emerald-400" /> Diet Strategy
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-3">
                        <span className="text-xxs font-bold text-emerald-400 uppercase tracking-wider block mb-1">Consume</span>
                        <ul className="list-disc pl-4 text-xxs text-emerald-300/80 space-y-0.5">
                          {matchedDisease.diet.eat.map((e, i) => (
                            <li key={i}>{e}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="rounded-xl bg-rose-500/5 border border-rose-500/10 p-3">
                        <span className="text-xxs font-bold text-rose-400 uppercase tracking-wider block mb-1">Avoid</span>
                        <ul className="list-disc pl-4 text-xxs text-rose-300/80 space-y-0.5">
                          {matchedDisease.diet.avoid.map((av, i) => (
                            <li key={i}>{av}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="rounded-xl bg-white/5 p-3 text-xxs text-slate-400">
                      <span className="font-bold text-slate-300 block mb-0.5">Hydration Target:</span>
                      {matchedDisease.diet.waterIntake}
                    </div>
                  </div>
                </div>

                {/* Middle Column (Recommended Exercises) */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Recommended Poses */}
                  <div className="space-y-4">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-1.5">
                      🧘 Recommended Postures (Asanas)
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {matchedDisease.recommendedAsanas.map((asanaId) => {
                        const asana = translatedAsanas.find((a) => a.id === asanaId);
                        if (!asana) return null;
                        return (
                          <div
                            key={asanaId}
                            onClick={() => handleOpenAsana(asanaId)}
                            className="group rounded-xl border border-white/5 bg-slate-950/20 p-4 hover:border-emerald-500/30 transition-all cursor-pointer flex items-center space-x-3.5"
                          >
                            <div className="h-14 w-14 rounded-lg bg-slate-950 p-1 border border-white/5 flex items-center justify-center shrink-0">
                              <AsanaIllustration id={asanaId} className="h-full w-auto" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                                {asana.name}
                              </h4>
                              <p className="text-xxs text-slate-500 mt-0.5">{asana.englishName}</p>
                              <span className="inline-block mt-1.5 text-xxs text-emerald-400 font-semibold">Inspect Posture →</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recommended Breathing */}
                  <div className="space-y-4">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-1.5">
                      🌬️ Recommended Breathing (Pranayama)
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {matchedDisease.recommendedPranayama.map((pranayamaId) => {
                        const p = translatedPranayamas.find((item) => item.id === pranayamaId);
                        if (!p) return null;
                        return (
                          <div
                            key={pranayamaId}
                            onClick={() => handleOpenPranayama(pranayamaId)}
                            className="group rounded-xl border border-white/5 bg-slate-950/20 p-4 hover:border-emerald-500/30 transition-all cursor-pointer flex items-center space-x-3.5"
                          >
                            <div className="h-14 w-14 rounded-lg bg-slate-950 p-2 border border-white/5 flex items-center justify-center shrink-0 text-slate-500">
                              <span className="text-xl">🌬️</span>
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                                {p.name}
                              </h4>
                              <p className="text-xxs text-slate-500 mt-0.5 truncate max-w-[150px]">{p.technique}</p>
                              <span className="inline-block mt-1.5 text-xxs text-emerald-400 font-semibold">Inspect Technique →</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row splits (Remedies, Precautions, Routine) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                
                {/* Remedies */}
                <div className="space-y-2.5">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" /> Home Remedies
                  </h4>
                  <ul className="list-disc pl-4 text-xs text-slate-300 space-y-1">
                    {matchedDisease.homeRemedies.map((rem, i) => (
                      <li key={i}>{rem}</li>
                    ))}
                  </ul>
                </div>

                {/* Precautions */}
                <div className="space-y-2.5">
                  <h4 className="text-rose-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="h-4.5 w-4.5" /> Safety Warnings
                  </h4>
                  <ul className="list-disc pl-4 text-xs text-rose-300/80 space-y-1">
                    {matchedDisease.precautions.map((prec, i) => (
                      <li key={i}>{prec}</li>
                    ))}
                  </ul>
                </div>

                {/* Daily Routine */}
                <div className="space-y-2.5">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="h-4.5 w-4.5 text-emerald-400" /> Daily Habits
                  </h4>
                  <ol className="list-decimal pl-4 text-xs text-slate-300 space-y-1">
                    {matchedDisease.dailyRoutine.slice(0, 3).map((rot, i) => (
                      <li key={i}>{rot}</li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Lead generation / Call-To-Action to Report */}
              <div className="rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h4 className="text-white font-bold text-sm">Need a printable guide or clinical plan for this condition?</h4>
                  <p className="text-xs text-slate-400 mt-1">Generate a comprehensive, custom therapy plan for {matchedDisease.name} including recommended sequences, dietary guidelines, and a weekly progress tracker.</p>
                </div>
                <button
                  onClick={() => onNavigate("report")}
                  className="rounded-xl bg-emerald-500 hover:bg-emerald-400 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/10 transition-all text-center"
                >
                  Generate Therapy Plan
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Stats details section */}
      <section className="mx-auto max-w-5xl px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="rounded-2xl border border-white/5 bg-slate-900/20 p-6">
          <span className="block text-3xl font-extrabold text-white">100%</span>
          <span className="text-xxs text-slate-500 uppercase tracking-wider font-bold block mt-1">Scientific Methodology</span>
        </div>
        <div className="rounded-2xl border border-white/5 bg-slate-900/20 p-6">
          <span className="block text-3xl font-extrabold text-white">{DISEASES.length}+</span>
          <span className="text-xxs text-slate-500 uppercase tracking-wider font-bold block mt-1">Lifestyle Diseases Profiled</span>
        </div>
        <div className="rounded-2xl border border-white/5 bg-slate-900/20 p-6">
          <span className="block text-3xl font-extrabold text-white">{ASANAS.length + PRANAYAMAS.length}+</span>
          <span className="text-xxs text-slate-500 uppercase tracking-wider font-bold block mt-1">Detailed Poses & Techniques</span>
        </div>
      </section>


      {/* Accordion FAQ Section */}
      <section className="mx-auto max-w-3xl px-4 space-y-4">
        <h3 className="text-center text-white font-bold text-lg uppercase tracking-wider">Frequently Asked Questions</h3>
        
        <div className="space-y-3">
          {faqItems.map((item, idx) => {
            const isOpen = faqOpenIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-slate-900/40 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setFaqOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-slate-200 hover:text-white"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-350 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-2">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Modals for Asana Inspect */}
      <AnimatePresence>
        {selectedAsana && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900 p-6 md:p-8 shadow-2xl space-y-6"
            >
              <button
                onClick={() => setSelectedAsana(null)}
                className="absolute top-4 right-4 rounded-xl p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
              >
                ✕
              </button>

              <div>
                <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xxs font-bold text-emerald-400 uppercase tracking-widest">
                  {selectedAsana.difficulty}
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1.5">{selectedAsana.name}</h3>
                <p className="text-xs text-slate-500 italic mt-0.5">{selectedAsana.englishName} ({selectedAsana.sanskritName})</p>
              </div>

              <div className="flex items-center justify-center rounded-2xl bg-slate-950 p-4 border border-white/5">
                <AsanaIllustration id={selectedAsana.id} className="h-36 w-auto" />
              </div>

              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1">Description</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedAsana.description}</p>
              </div>

              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1">Steps of Practice</h4>
                <ol className="list-decimal pl-5 text-xs text-slate-300 space-y-1">
                  {selectedAsana.steps.map((st, idx) => (
                    <li key={idx}>{st}</li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modals for Pranayama Inspect */}
      <AnimatePresence>
        {selectedPranayama && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900 p-6 md:p-8 shadow-2xl space-y-6"
            >
              <button
                onClick={() => setSelectedPranayama(null)}
                className="absolute top-4 right-4 rounded-xl p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
              >
                ✕
              </button>

              <div>
                <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xxs font-bold text-emerald-400 uppercase tracking-widest">
                  {selectedPranayama.difficulty}
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1.5">{selectedPranayama.name}</h3>
                <p className="text-xs text-slate-500 italic mt-0.5">{selectedPranayama.technique}</p>
              </div>

              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1">Breathing Method</h4>
                <ol className="list-decimal pl-5 text-xs text-slate-300 space-y-1">
                  {selectedPranayama.steps.map((st, idx) => (
                    <li key={idx}>{st}</li>
                  ))}
                </ol>
              </div>

              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1">Precautions</h4>
                <ul className="list-disc pl-5 text-xs text-rose-300/80 space-y-1">
                  {selectedPranayama.precautions.map((pr, idx) => (
                    <li key={idx}>{pr}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
