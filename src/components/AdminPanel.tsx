"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { DISEASES, ASANAS, PRANAYAMAS, Disease } from "@/data/yoga-db";
import { getTranslatedDisease, getTranslatedAsana, getTranslatedPranayama } from "@/lib/getTranslatedData";
import { Terminal, Database, Server, Plus, Settings, Trash2, ShieldAlert, Cpu } from "lucide-react";

const adminTranslations = {
  en: {
    consoleTitle: "Yoga Therapy Clinical Console",
    consoleSubtitle: "Developer Admin dashboard simulating database operations, record registration, and system metrics.",
    systemLive: "System Live",
    apiLatency: "API Latency: 12ms",
    metrics: {
      diseasesRegistered: "Diseases Registered",
      simulatedSuffix: "simulated",
      yogaAsanas: "Yoga Asanas",
      posesSuffix: "Poses",
      pranayamaTechniques: "Pranayama Techniques",
      exercisesSuffix: "Exercises",
      activeRoutines: "Active Routines",
      savedSuffix: "Saved"
    },
    navTitle: "Database Navigation",
    navItems: {
      diseases: "Manage Diseases",
      asanas: "View Poses (Asanas)",
      pranayamas: "View Breathing Exercises",
      telemetry: "System Telemetry"
    },
    diseasesTab: {
      title: "Disease Records",
      subtitle: "Add or remove therapeutic disease configurations.",
      btnSimulate: "Simulate Add Disease",
      formName: "Disease Name",
      formDesc: "Description",
      btnSave: "Save to Console",
      btnCancel: "Cancel",
      thName: "Name",
      thDesc: "Description",
      thType: "Type",
      thActions: "Actions",
      badgeSimulated: "Simulated",
      badgeStatic: "Static DB",
      textProtected: "Protected",
      alertSuccess: "Record successfully registered in local console memory!",
      placeholderName: "e.g., Acid Reflux (GERD)",
      placeholderDesc: "e.g., Stomach acid flows back into esophagus..."
    },
    asanasTab: {
      title: "Asana Poses Database",
      subtitle: "Read-only view of yoga postures configured in system.",
      thName: "Name",
      thDifficulty: "Difficulty",
      thTarget: "Target Parts",
      thDuration: "Duration"
    },
    pranayamasTab: {
      title: "Pranayama Techniques",
      subtitle: "Read-only view of breathing exercises configured in system.",
      thName: "Name",
      thDifficulty: "Difficulty",
      thTechnique: "Technique",
      thDuration: "Duration"
    },
    telemetryTab: {
      title: "System Telemetry & Health",
      subtitle: "Local environment health metrics, browser storage, and key configuration values.",
      hostEnv: "Host Environment",
      browserStorage: "Browser Storage Usage",
      securityTitle: "Security & Access Controls",
      framework: "Framework",
      runtime: "Runtime",
      os: "OS",
      uptime: "Uptime",
      uptimeActive: "100% active",
      bookmarksPoses: "Bookmarks Poses",
      bookmarksBreathing: "Bookmarks Breathing",
      routinesCount: "Routines Count",
      localHealth: "Local Health Status",
      healthOptimal: "Optimal",
      storedSuffix: "stored",
      securityText: "Clinical access is currently in simulation bypass mode. Dynamic changes are maintained in volatile local variables and session state. Security policies restrict raw local storage overrides for pre-configured static database models."
    }
  },
  mr: {
    consoleTitle: "योग थेरपी क्लिनिकल कन्सोल",
    consoleSubtitle: "डेटाबेस ऑपरेशन्स, रेकॉर्ड नोंदणी आणि सिस्टम मेट्रिक्सचे सिम्युलेशन करणारे डेव्हलपर अ‍ॅडमीन डॅशबोर्ड.",
    systemLive: "सिस्टम लाइव्ह",
    apiLatency: "API लेटन्सी: १२ms",
    metrics: {
      diseasesRegistered: "नोंदणीकृत आजार",
      simulatedSuffix: "सिम्युलेटेड",
      yogaAsanas: "योग आसने",
      posesSuffix: "आसने",
      pranayamaTechniques: "प्राणायाम तंत्रे",
      exercisesSuffix: "सराव",
      activeRoutines: "सक्रिय दिनचर्या",
      savedSuffix: "जतन केले"
    },
    navTitle: "डेटाबेस नेव्हिगेशन",
    navItems: {
      diseases: "आजार व्यवस्थापित करा",
      asanas: "आसने पहा",
      pranayamas: "प्राणायाम सराव पहा",
      telemetry: "सिस्टम टेलिमेट्री"
    },
    diseasesTab: {
      title: "आजाराचे रेकॉर्ड",
      subtitle: "उपचारात्मक आजार संरचना जोडा किंवा काढा.",
      btnSimulate: "नवीन आजार सिम्युलेट करा",
      formName: "आजाराचे नाव",
      formDesc: "वर्णन",
      btnSave: "कन्सोलमध्ये जतन करा",
      btnCancel: "रद्द करा",
      thName: "नाव",
      thDesc: "वर्णन",
      thType: "प्रकार",
      thActions: "कृती",
      badgeSimulated: "सिम्युलेटेड",
      badgeStatic: "स्थिर DB",
      textProtected: "संरक्षित",
      alertSuccess: "रेकॉर्ड यशस्वीरित्या स्थानिक कन्सोल मेमरीमध्ये नोंदणीकृत झाले!",
      placeholderName: "उदा., अ‍ॅसिड रिफ्लक्स (GERD)",
      placeholderDesc: "उदा., पोटातील अ‍ॅसिड अन्ननलिकेत परत जाते..."
    },
    asanasTab: {
      title: "आसन डेटाबेस",
      subtitle: "सिस्टममध्ये संरचित योग आसनांचे केवळ वाचनासाठीचे दृश्य.",
      thName: "नाव",
      thDifficulty: "काठिण्य पातळी",
      thTarget: "लक्ष्यित अवयव",
      thDuration: "कालावधी"
    },
    pranayamasTab: {
      title: "प्राणायाम तंत्रे",
      subtitle: "सिस्टममध्ये संरचित श्वसन व्यायामांचे केवळ वाचनासाठीचे दृश्य.",
      thName: "नाव",
      thDifficulty: "काठिण्य पातळी",
      thTechnique: "तंत्र",
      thDuration: "कालावधी"
    },
    telemetryTab: {
      title: "सिस्टम टेलिमेट्री आणि आरोग्य",
      subtitle: "स्थानिक पर्यावरण आरोग्य मेट्रिक्स, ब्राउझर स्टोरेज आणि मुख्य कॉन्फिगरेशन मूल्ये.",
      hostEnv: "होस्ट पर्यावरण",
      browserStorage: "ब्राउझर स्टोरेज वापर",
      securityTitle: "सुरक्षा आणि प्रवेश नियंत्रणे",
      framework: "फ्रेमवर्क",
      runtime: "रनटाईम",
      os: "ओएस",
      uptime: "अपटाईम",
      uptimeActive: "१००% सक्रिय",
      bookmarksPoses: "जतन केलेली आसने",
      bookmarksBreathing: "जतन केलेले प्राणायाम",
      routinesCount: "एकूण दिनचर्या",
      localHealth: "स्थानिक आरोग्य स्थिती",
      healthOptimal: "उत्कृष्ट",
      storedSuffix: "जतन केले",
      securityText: "क्लिनिकल प्रवेश सध्या सिम्युलेशन बायपास मोडमध्ये आहे. डायनॅमिक बदल तात्पुरत्या स्थानिक व्हेरिएबल्स आणि सेशन स्टेटमध्ये राखले जातात. सुरक्षितता धोरणे पूर्व-कॉन्फिगर केलेल्या स्थिर डेटाबेस मॉडेल्ससाठी थेट स्थानिक स्टोरेज ओव्हरराइड प्रतिबंधित करतात."
    }
  },
  hi: {
    consoleTitle: "योग थेरेपी क्लिनिकल कंसोल",
    consoleSubtitle: "डेटाबेस संचालन, रिकॉर्ड पंजीकरण और सिस्टम मेट्रिक्स का अनुकरण करने वाला डेवलपर एडमिन डैशबोर्ड।",
    systemLive: "सिस्टम लाइव",
    apiLatency: "API लेटेंसी: 12ms",
    metrics: {
      diseasesRegistered: "पंजीकृत बीमारियां",
      simulatedSuffix: "सिम्युलेटेड",
      yogaAsanas: "योग आसन",
      posesSuffix: "आसन",
      pranayamaTechniques: "प्राणायाम तकनीकें",
      exercisesSuffix: "अभ्यास",
      activeRoutines: "सक्रिय दिनचर्या",
      savedSuffix: "सहेजा गया"
    },
    navTitle: "डेटाबेस नेविगेशन",
    navItems: {
      diseases: "बीमारियां प्रबंधित करें",
      asanas: "आसन देखें",
      pranayamas: "प्राणायाम अभ्यास देखें",
      telemetry: "सिस्टम टेलीमेट्री"
    },
    diseasesTab: {
      title: "बीमारी के रिकॉर्ड",
      subtitle: "चिकित्सीय बीमारी कॉन्फ़िगरेशन जोड़ें या हटाएं।",
      btnSimulate: "नया रोग सिम्युलेट करें",
      formName: "बीमारी का नाम",
      formDesc: "विवरण",
      btnSave: "कंसोल में सहेजें",
      btnCancel: "रद्द करें",
      thName: "नाम",
      thDesc: "विवरण",
      thType: "प्रकार",
      thActions: "कार्रवाई",
      badgeSimulated: "सिम्युलेटेड",
      badgeStatic: "स्थिर DB",
      textProtected: "सुरक्षित",
      alertSuccess: "रिकॉर्ड सफलतापूर्वक स्थानीय कंसोल मेमोरी में पंजीकृत किया गया!",
      placeholderName: "उदा., एसिड रिफ्लक्स (GERD)",
      placeholderDesc: "उदा., पेट का एसिड अन्नप्रणाली में वापस चला जाता है..."
    },
    asanasTab: {
      title: "आसन डेटाबेस",
      subtitle: "सिस्टम में कॉन्फ़िगर किए गए योग आसनों का केवल पठन योग्य दृश्य।",
      thName: "नाम",
      thDifficulty: "कठिनाई स्तर",
      thTarget: "लक्षित अंग",
      thDuration: "अवधि"
    },
    pranayamasTab: {
      title: "प्राणायाम तकनीकें",
      subtitle: "सिस्टम में कॉन्फ़िगर किए गए श्वसन अभ्यासों का केवल पठन योग्य दृश्य।",
      thName: "नाम",
      thDifficulty: "कठिनाई स्तर",
      thTechnique: "तकनीक",
      thDuration: "अवधि"
    },
    telemetryTab: {
      title: "सिस्टम टेलीमेट्री और स्वास्थ्य",
      subtitle: "स्थानीय वातावरण स्वास्थ्य मेट्रिक्स, ब्राउज़र स्टोरेज और मुख्य कॉन्फ़िगरेशन मान।",
      hostEnv: "होस्ट पर्यावरण",
      browserStorage: "Browser Storage Usage",
      securityTitle: "सुरक्षा और पहुँच नियंत्रण",
      framework: "फ्रेमवर्क",
      runtime: "रनटाइम",
      os: "ओएस",
      uptime: "अपटाइम",
      uptimeActive: "100% सक्रिय",
      bookmarksPoses: "सहेजे गए आसन",
      bookmarksBreathing: "सहेजे गए प्राणायाम",
      routinesCount: "कुल दिनचर्या",
      localHealth: "स्थानीय स्वास्थ्य स्थिति",
      healthOptimal: "उत्कृष्ट",
      storedSuffix: "सहेजा गया",
      securityText: "क्लिनिकल पहुंच वर्तमान में सिमुलेशन बाईपास मोड में है। गतिशील बदलाव अस्थायी स्थानीय चर और सत्र स्थिति में बनाए रखे जाते हैं। सुरक्षा नीतियां पूर्व-कॉन्फ़िगर किए गए स्थिर डेटाबेस मॉडल के लिए सीधे स्थानीय स्टोरेज ओवरराइड को प्रतिबंधित करती हैं।"
    }
  }
};

export const AdminPanel: React.FC = () => {
  const { bookmarkedAsanas, bookmarkedPranayamas, routines, language } = useApp();
  const [activeConsoleTab, setActiveConsoleTab] = useState<"diseases" | "asanas" | "pranayamas" | "telemetry">("diseases");
  const [isAdding, setIsAdding] = useState(false);
  const [newDiseaseName, setNewDiseaseName] = useState("");
  const [newDiseaseDesc, setNewDiseaseDesc] = useState("");
  const [simulatedDiseases, setSimulatedDiseases] = useState<Disease[]>([]);

  const at = adminTranslations[language] || adminTranslations.en;

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
      symptoms: language === "mr" ? ["सिम्युलेटेड लक्षण १", "सिम्युलेटेड लक्षण २"] : language === "hi" ? ["सिम्युलेटेड लक्षण 1", "सिम्युलेटेड लक्षण 2"] : ["Simulated Symptom 1", "Simulated Symptom 2"],
      riskFactors: language === "mr" ? ["व्यायामाचा अभाव", "बैठी जीवनशैली"] : language === "hi" ? ["व्यायाम की कमी", "गतिहीन जीवनशैली"] : ["Lack of exercise", "Sedentary lifestyle"],
      recommendedAsanas: ["tadasana", "vrikshasana"],
      recommendedPranayama: ["anulomvilom"],
      diet: {
        eat: language === "mr" ? ["सात्विक अन्न", "ताजे कोशिंबीर"] : language === "hi" ? ["सात्विक भोजन", "ताजा सलाद"] : ["Sattvic food", "Fresh salads"],
        avoid: language === "mr" ? ["फास्ट फूड", "सोडा"] : language === "hi" ? ["फास्ट फूड", "सोडा"] : ["Fast foods", "Soda"],
        waterIntake: language === "mr" ? "२.० लिटर रोज" : language === "hi" ? "2.0 लीटर दैनिक" : "2.0 Liters daily",
      },
      dailyRoutine: language === "mr" ? ["लवकर उठा", "१० मिनिटे ध्यान करा"] : language === "hi" ? ["जल्दी उठें", "10 मिनट ध्यान करें"] : ["Wake up early", "Meditate 10 mins"],
      homeRemedies: language === "mr" ? ["कोमट आले पाणी प्या"] : language === "hi" ? ["गुनगुना अदरक पानी पिएं"] : ["Drink warm ginger water"],
      precautions: language === "mr" ? ["वेगवान श्वास टाळा"] : language === "hi" ? ["तेज सांस लेने से बचें"] : ["Avoid rapid breathing"],
      expectedBenefits: language === "mr" ? ["तणावमुक्ती", "उत्कृष्ट चयापचय नियंत्रण"] : language === "hi" ? ["तनाव से राहत", "बेहतर चयापचय नियंत्रण"] : ["Stress relief", "Better metabolic control"],
    };

    setSimulatedDiseases((prev) => [mockDisease, ...prev]);
    setNewDiseaseName("");
    setNewDiseaseDesc("");
    setIsAdding(false);
    alert(at.diseasesTab.alertSuccess);
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
            <Terminal className="h-8 w-8 text-emerald-400" /> {at.consoleTitle}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {at.consoleSubtitle}
          </p>
        </div>

        {/* Status Indicators */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xxs font-bold uppercase tracking-wider text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            {at.systemLive}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xxs font-bold uppercase tracking-wider text-slate-300">
            {at.apiLatency}
          </span>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4">
          <span className="text-xxs text-slate-500 font-bold uppercase tracking-wider block">{at.metrics.diseasesRegistered}</span>
          <span className="text-2xl font-bold text-white mt-1 flex items-baseline gap-1">
            {totalDiseases} <span className="text-xxs text-emerald-400 font-normal">({simulatedDiseases.length} {at.metrics.simulatedSuffix})</span>
          </span>
        </div>
        <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4">
          <span className="text-xxs text-slate-500 font-bold uppercase tracking-wider block">{at.metrics.yogaAsanas}</span>
          <span className="text-2xl font-bold text-white mt-1">{totalAsanas} {at.metrics.posesSuffix}</span>
        </div>
        <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4">
          <span className="text-xxs text-slate-500 font-bold uppercase tracking-wider block">{at.metrics.pranayamaTechniques}</span>
          <span className="text-2xl font-bold text-white mt-1">{totalPranayamas} {at.metrics.exercisesSuffix}</span>
        </div>
        <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4">
          <span className="text-xxs text-slate-500 font-bold uppercase tracking-wider block">{at.metrics.activeRoutines}</span>
          <span className="text-2xl font-bold text-white mt-1">{routines.length} {at.metrics.savedSuffix}</span>
        </div>
      </div>

      {/* Main console splitscreen */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation panel */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 h-fit space-y-4">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-white/5">
            <Cpu className="h-4.5 w-4.5 text-emerald-400" /> {at.navTitle}
          </h3>

          <div className="space-y-1.5">
            {[
              { id: "diseases" as const, label: at.navItems.diseases, icon: Database },
              { id: "asanas" as const, label: at.navItems.asanas, icon: Settings },
              { id: "pranayamas" as const, label: at.navItems.pranayamas, icon: Settings },
              { id: "telemetry" as const, label: at.navItems.telemetry, icon: Server },
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
                  <h3 className="text-white font-bold text-lg">{at.diseasesTab.title}</h3>
                  <p className="text-xs text-slate-500">{at.diseasesTab.subtitle}</p>
                </div>
                <button
                  onClick={() => setIsAdding(!isAdding)}
                  className="flex items-center space-x-1 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-400 transition-all"
                >
                  <Plus className="h-4 w-4" />
                  <span>{at.diseasesTab.btnSimulate}</span>
                </button>
              </div>

              {isAdding && (
                <form onSubmit={handleAddDiseaseSim} className="rounded-xl border border-white/10 bg-slate-900 p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xxs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        {at.diseasesTab.formName}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={at.diseasesTab.placeholderName}
                        value={newDiseaseName}
                        onChange={(e) => setNewDiseaseName(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xxs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        {at.diseasesTab.formDesc}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={at.diseasesTab.placeholderDesc}
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
                      {at.diseasesTab.btnSave}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="rounded-lg bg-white/5 hover:bg-white/10 px-4 py-2 text-xxs font-bold text-slate-300 transition-all"
                    >
                      {at.diseasesTab.btnCancel}
                    </button>
                  </div>
                </form>
              )}

              {/* Rows List */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/15 text-slate-400 text-xxs font-bold uppercase">
                      <th className="py-2.5 px-3">{at.diseasesTab.thName}</th>
                      <th className="py-2.5 px-3">{at.diseasesTab.thDesc}</th>
                      <th className="py-2.5 px-3">{at.diseasesTab.thType}</th>
                      <th className="py-2.5 px-3 text-right">{at.diseasesTab.thActions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {simulatedDiseases.map((d) => (
                      <tr key={d.id} className="hover:bg-white/2 transition-colors">
                        <td className="py-3 px-3 font-semibold text-emerald-400">{d.name}</td>
                        <td className="py-3 px-3 truncate max-w-xs">{d.description}</td>
                        <td className="py-3 px-3">
                          <span className="rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 text-xxs font-bold uppercase tracking-wider">
                            {at.diseasesTab.badgeSimulated}
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
                            {at.diseasesTab.badgeStatic}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right text-slate-500 italic">
                          {at.diseasesTab.textProtected}
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
                <h3 className="text-white font-bold text-lg">{at.asanasTab.title}</h3>
                <p className="text-xs text-slate-500">{at.asanasTab.subtitle}</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/15 text-slate-400 text-xxs font-bold uppercase">
                      <th className="py-2.5 px-3">{at.asanasTab.thName}</th>
                      <th className="py-2.5 px-3">{at.asanasTab.thDifficulty}</th>
                      <th className="py-2.5 px-3">{at.asanasTab.thTarget}</th>
                      <th className="py-2.5 px-3">{at.asanasTab.thDuration}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {translatedAsanas.map((a) => (
                      <tr key={a.id} className="hover:bg-white/2 transition-colors">
                        <td className="py-3 px-3 font-semibold text-white">{a.name} ({a.englishName})</td>
                        <td className="py-3 px-3">
                          <span className={`rounded-lg px-2 py-0.5 text-xxs font-bold ${
                            a.difficulty === "Beginner"
                              ? "bg-emerald-500/10 text-emerald-400" 
                              : "bg-sky-500/10 text-sky-400"
                          }`}>
                            {a.difficulty === "Beginner" 
                              ? (language === "mr" ? "नवशिक्या" : language === "hi" ? "शुरुआती" : "Beginner")
                              : a.difficulty === "Intermediate"
                                ? (language === "mr" ? "मध्यम" : language === "hi" ? "मध्यम" : "Intermediate")
                                : (language === "mr" ? "प्रगत" : language === "hi" ? "उन्नत" : "Advanced")
                            }
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
                <h3 className="text-white font-bold text-lg">{at.pranayamasTab.title}</h3>
                <p className="text-xs text-slate-500">{at.pranayamasTab.subtitle}</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/15 text-slate-400 text-xxs font-bold uppercase">
                      <th className="py-2.5 px-3">{at.pranayamasTab.thName}</th>
                      <th className="py-2.5 px-3">{at.pranayamasTab.thDifficulty}</th>
                      <th className="py-2.5 px-3">{at.pranayamasTab.thTechnique}</th>
                      <th className="py-2.5 px-3">{at.pranayamasTab.thDuration}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {translatedPranayamas.map((p) => (
                      <tr key={p.id} className="hover:bg-white/2 transition-colors">
                        <td className="py-3 px-3 font-semibold text-white">{p.name}</td>
                        <td className="py-3 px-3">
                          <span className={`rounded-lg px-2 py-0.5 text-xxs font-bold ${
                            p.difficulty === "Beginner"
                              ? "bg-emerald-500/10 text-emerald-400" 
                              : "bg-sky-500/10 text-sky-400"
                          }`}>
                            {p.difficulty === "Beginner" 
                              ? (language === "mr" ? "नवशिक्या" : language === "hi" ? "शुरुआती" : "Beginner")
                              : p.difficulty === "Intermediate"
                                ? (language === "mr" ? "मध्यम" : language === "hi" ? "मध्यम" : "Intermediate")
                                : (language === "mr" ? "प्रगत" : language === "hi" ? "उन्नत" : "Advanced")
                            }
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
                <h3 className="text-white font-bold text-lg">{at.telemetryTab.title}</h3>
                <p className="text-xs text-slate-500">{at.telemetryTab.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/5 bg-slate-900/60 p-4 space-y-2.5">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Server className="h-4 w-4 text-emerald-400" /> {at.telemetryTab.hostEnv}
                  </h4>
                  <div className="text-slate-400 text-xs space-y-1">
                    <p><span className="text-slate-500">{at.telemetryTab.framework}:</span> Next.js 15.0</p>
                    <p><span className="text-slate-500">{at.telemetryTab.runtime}:</span> React 19.0 (TS)</p>
                    <p><span className="text-slate-500">{at.telemetryTab.os}:</span> Ubuntu Linux (Node.js)</p>
                    <p><span className="text-slate-500">{at.telemetryTab.uptime}:</span> {at.telemetryTab.uptimeActive}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-slate-900/60 p-4 space-y-2.5">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Database className="h-4 w-4 text-emerald-400" /> {at.telemetryTab.browserStorage}
                  </h4>
                  <div className="text-slate-400 text-xs space-y-1">
                    <p><span className="text-slate-500">{at.telemetryTab.bookmarksPoses}:</span> {bookmarkedAsanas.length} {at.telemetryTab.storedSuffix}</p>
                    <p><span className="text-slate-500">{at.telemetryTab.bookmarksBreathing}:</span> {bookmarkedPranayamas.length} {at.telemetryTab.storedSuffix}</p>
                    <p><span className="text-slate-500">{at.telemetryTab.routinesCount}:</span> {routines.length} {at.telemetryTab.storedSuffix}</p>
                    <p><span className="text-slate-500">{at.telemetryTab.localHealth}:</span> {at.telemetryTab.healthOptimal}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-slate-900/60 p-4 space-y-2">
                <h4 className="text-rose-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="h-4.5 w-4.5" /> {at.telemetryTab.securityTitle}
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {at.telemetryTab.securityText}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
