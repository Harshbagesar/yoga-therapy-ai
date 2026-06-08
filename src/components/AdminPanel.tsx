"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { DISEASES, ASANAS, PRANAYAMAS, Disease } from "@/data/yoga-db";
import { getTranslatedDisease, getTranslatedAsana, getTranslatedPranayama } from "@/lib/getTranslatedData";
import { Terminal, Database, Server, Plus, Settings, Trash2, ShieldAlert, Cpu } from "lucide-react";

export const AdminPanel: React.FC = () => {
  const { bookmarkedAsanas, bookmarkedPranayamas, routines, language } = useApp();
  const [activeConsoleTab, setActiveConsoleTab] = useState<"diseases" | "asanas" | "pranayamas" | "telemetry">("diseases");
  const [isAdding, setIsAdding] = useState(false);
  const [newDiseaseName, setNewDiseaseName] = useState("");
  const [newDiseaseDesc, setNewDiseaseDesc] = useState("");
  const [simulatedDiseases, setSimulatedDiseases] = useState<Disease[]>([]);

  const translatedDiseases = DISEASES.map((d) => getTranslatedDisease(d, language));
  const translatedAsanas = ASANAS.map((a) => getTranslatedAsana(a, language));
  const translatedPranayamas = PRANAYAMAS.map((p) => getTranslatedPranayama(p, language));

  // Simulation handlers
  const handleAddDiseaseSim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiseaseName || !newDiseaseDesc) return;

    const mockDisease: Disease = {
      id: `sim-${Date.now()}`,
      name: newDiseaseName,
      description: newDiseaseDesc,
      symptoms: ["Simulated Symptom 1", "Simulated Symptom 2"],
      riskFactors: ["Lack of exercise", "Sedentary lifestyle"],
      recommendedAsanas: ["tadasana", "vrikshasana"],
      recommendedPranayama: ["anulomvilom"],
      diet: {
        eat: ["Sattvic food", "Fresh salads"],
        avoid: ["Fast foods", "Soda"],
        waterIntake: "2.0 Liters daily",
      },
      dailyRoutine: ["Wake up early", "Meditate 10 mins"],
      homeRemedies: ["Drink warm ginger water"],
      precautions: ["Avoid rapid breathing"],
      expectedBenefits: ["Stress relief", "Better metabolic control"],
    };

    setSimulatedDiseases((prev) => [mockDisease, ...prev]);
    setNewDiseaseName("");
    setNewDiseaseDesc("");
    setIsAdding(false);
    alert("Record successfully registered in local console memory!");
  };

  const handleDeleteSim = (id: string) => {
    setSimulatedDiseases((prev) => prev.filter((d) => d.id !== id));
  };

  // Compute telemetry counts
  const totalDiseases = DISEASES.length + simulatedDiseases.length;
  const totalAsanas = ASANAS.length;
  const totalPranayamas = PRANAYAMAS.length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-3xl font-extrabold text-transparent flex items-center gap-2.5">
            <Terminal className="h-8 w-8 text-emerald-400" /> Yoga Therapy Clinical Console
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Developer Admin dashboard simulating database operations, record registration, and system metrics.
          </p>
        </div>

        {/* Status Indicators */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xxs font-bold uppercase tracking-wider text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            System Live
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xxs font-bold uppercase tracking-wider text-slate-300">
            API Latency: 12ms
          </span>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4">
          <span className="text-xxs text-slate-500 font-bold uppercase tracking-wider block">Diseases Registered</span>
          <span className="text-2xl font-bold text-white mt-1 flex items-baseline gap-1">
            {totalDiseases} <span className="text-xxs text-emerald-400 font-normal">({simulatedDiseases.length} simulated)</span>
          </span>
        </div>
        <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4">
          <span className="text-xxs text-slate-500 font-bold uppercase tracking-wider block">Yoga Asanas</span>
          <span className="text-2xl font-bold text-white mt-1">{totalAsanas} Poses</span>
        </div>
        <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4">
          <span className="text-xxs text-slate-500 font-bold uppercase tracking-wider block">Pranayama Techniques</span>
          <span className="text-2xl font-bold text-white mt-1">{totalPranayamas} Exercises</span>
        </div>
        <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4">
          <span className="text-xxs text-slate-500 font-bold uppercase tracking-wider block">Active Routines</span>
          <span className="text-2xl font-bold text-white mt-1">{routines.length} Saved</span>
        </div>
      </div>

      {/* Main console splitscreen */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation panel */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 h-fit space-y-4">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-white/5">
            <Cpu className="h-4.5 w-4.5 text-emerald-400" /> Database Navigation
          </h3>

          <div className="space-y-1.5">
            {[
              { id: "diseases" as const, label: "Manage Diseases", icon: Database },
              { id: "asanas" as const, label: "View Poses (Asanas)", icon: Settings },
              { id: "pranayamas" as const, label: "View Breathing Exercises", icon: Settings },
              { id: "telemetry" as const, label: "System Telemetry", icon: Server },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveConsoleTab(tab.id);
                  setIsAdding(false);
                }}
                className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-left text-xs font-semibold tracking-wide transition-all ${
                  activeConsoleTab === tab.id
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/10"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Viewer console */}
        <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-slate-950 p-6 space-y-6">
          
          {/* Diseases Tab */}
          {activeConsoleTab === "diseases" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg">Disease Records</h3>
                  <p className="text-xs text-slate-500">Add or remove therapeutic disease configurations.</p>
                </div>
                <button
                  onClick={() => setIsAdding(!isAdding)}
                  className="flex items-center space-x-1 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-400 transition-all"
                >
                  <Plus className="h-4 w-4" />
                  <span>Simulate Add Disease</span>
                </button>
              </div>

              {isAdding && (
                <form onSubmit={handleAddDiseaseSim} className="rounded-xl border border-white/10 bg-slate-900 p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xxs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Disease Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Acid Reflux (GERD)"
                        value={newDiseaseName}
                        onChange={(e) => setNewDiseaseName(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xxs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Stomach acid flows back into esophagus..."
                        value={newDiseaseDesc}
                        onChange={(e) => setNewDiseaseDesc(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="submit"
                      className="rounded-lg bg-emerald-500 px-4 py-2 text-xxs font-bold text-white hover:bg-emerald-400 transition-all"
                    >
                      Save to Console
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="rounded-lg bg-white/5 hover:bg-white/10 px-4 py-2 text-xxs font-bold text-slate-300 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Rows List */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/15 text-slate-400 text-xxs font-bold uppercase">
                      <th className="py-2.5 px-3">Name</th>
                      <th className="py-2.5 px-3">Description</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {simulatedDiseases.map((d) => (
                      <tr key={d.id} className="hover:bg-white/2 transition-colors">
                        <td className="py-3 px-3 font-semibold text-emerald-400">{d.name}</td>
                        <td className="py-3 px-3 truncate max-w-xs">{d.description}</td>
                        <td className="py-3 px-3">
                          <span className="rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 text-xxs font-bold uppercase tracking-wider">
                            Simulated
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => handleDeleteSim(d.id)}
                            className="text-rose-400 hover:bg-rose-500/15 p-1 rounded transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {translatedDiseases.map((d) => (
                      <tr key={d.id} className="hover:bg-white/2 transition-colors">
                        <td className="py-3 px-3 font-semibold text-white">{d.name}</td>
                        <td className="py-3 px-3 truncate max-w-xs">{d.description}</td>
                        <td className="py-3 px-3">
                          <span className="rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-xxs font-bold uppercase tracking-wider">
                            Static DB
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right text-slate-500 italic">
                          Protected
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Asanas Tab */}
          {activeConsoleTab === "asanas" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-bold text-lg">Asana Poses Database</h3>
                <p className="text-xs text-slate-500">Read-only view of yoga postures configured in system.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/15 text-slate-400 text-xxs font-bold uppercase">
                      <th className="py-2.5 px-3">Name</th>
                      <th className="py-2.5 px-3">Difficulty</th>
                      <th className="py-2.5 px-3">Target Parts</th>
                      <th className="py-2.5 px-3">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {translatedAsanas.map((a) => (
                      <tr key={a.id} className="hover:bg-white/2 transition-colors">
                        <td className="py-3 px-3 font-semibold text-white">{a.name} ({a.englishName})</td>
                        <td className="py-3 px-3">
                          <span className={`rounded-lg px-2 py-0.5 text-xxs font-bold ${
                            a.difficulty === "Beginner" ? "bg-emerald-500/10 text-emerald-400" : "bg-sky-500/10 text-sky-400"
                          }`}>
                            {a.difficulty}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-400">{a.targetBodyParts.join(", ")}</td>
                        <td className="py-3 px-3 text-slate-400">{a.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pranayamas Tab */}
          {activeConsoleTab === "pranayamas" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-bold text-lg">Pranayama Techniques</h3>
                <p className="text-xs text-slate-500">Read-only view of breathing exercises configured in system.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/15 text-slate-400 text-xxs font-bold uppercase">
                      <th className="py-2.5 px-3">Name</th>
                      <th className="py-2.5 px-3">Difficulty</th>
                      <th className="py-2.5 px-3">Technique</th>
                      <th className="py-2.5 px-3">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {translatedPranayamas.map((p) => (
                      <tr key={p.id} className="hover:bg-white/2 transition-colors">
                        <td className="py-3 px-3 font-semibold text-white">{p.name}</td>
                        <td className="py-3 px-3">
                          <span className={`rounded-lg px-2 py-0.5 text-xxs font-bold ${
                            p.difficulty === "Beginner" ? "bg-emerald-500/10 text-emerald-400" : "bg-sky-500/10 text-sky-400"
                          }`}>
                            {p.difficulty}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-400">{p.technique}</td>
                        <td className="py-3 px-3 text-slate-400">{p.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Telemetry Tab */}
          {activeConsoleTab === "telemetry" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-bold text-lg">System Telemetry & Health</h3>
                <p className="text-xs text-slate-500">Local environment health metrics, browser storage, and key configuration values.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/5 bg-slate-900/60 p-4 space-y-2.5">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Server className="h-4 w-4 text-emerald-400" /> Host Environment
                  </h4>
                  <div className="text-slate-400 text-xs space-y-1">
                    <p><span className="text-slate-500">Framework:</span> Next.js 15.0</p>
                    <p><span className="text-slate-500">Runtime:</span> React 19.0 (TS)</p>
                    <p><span className="text-slate-500">OS:</span> Ubuntu Linux (Node.js)</p>
                    <p><span className="text-slate-500">Uptime:</span> 100% active</p>
                  </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-slate-900/60 p-4 space-y-2.5">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Database className="h-4 w-4 text-emerald-400" /> Browser Storage Usage
                  </h4>
                  <div className="text-slate-400 text-xs space-y-1">
                    <p><span className="text-slate-500">Bookmarks Poses:</span> {bookmarkedAsanas.length} stored</p>
                    <p><span className="text-slate-500">Bookmarks Breathing:</span> {bookmarkedPranayamas.length} stored</p>
                    <p><span className="text-slate-500">Routines Count:</span> {routines.length} stored</p>
                    <p><span className="text-slate-500">Local Health Status:</span> Optimal</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-slate-900/60 p-4 space-y-2">
                <h4 className="text-rose-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="h-4.5 w-4.5" /> Security & Access Controls
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Clinical access is currently in simulation bypass mode. Dynamic changes are maintained in volatile local variables and session state. Security policies restrict raw local storage overrides for pre-configured static database models.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
