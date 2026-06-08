"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { DISEASES, ASANAS, PRANAYAMAS } from "@/data/yoga-db";
import { getTranslatedDisease, getTranslatedAsana, getTranslatedPranayama } from "@/lib/getTranslatedData";
import { FileText, Download, Printer, Settings, CheckSquare, Square } from "lucide-react";

export const ReportGenerator: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];

  const [selectedTopic, setSelectedTopic] = useState<string>(DISEASES[0].id);
  const [sections, setSections] = useState({
    intro: true,
    objectives: true,
    advantages: true,
    applications: true,
    conclusion: true,
    viva: true,
    ppt: true,
  });

  const translatedDiseases = DISEASES.map((d) => getTranslatedDisease(d, language));
  const translatedAsanas = ASANAS.map((a) => getTranslatedAsana(a, language));
  const translatedPranayamas = PRANAYAMAS.map((p) => getTranslatedPranayama(p, language));

  const matchedDisease = translatedDiseases.find((d) => d.id === selectedTopic) || translatedDiseases[0];

  const toggleSection = (section: keyof typeof sections) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Generate Report Content dynamically
  const generateIntro = () => {
    return `
      <h2>1. Clinical Overview</h2>
      <p>Yoga therapy acts as an evidence-based complementary system of healthcare. This therapeutic plan is designed specifically for managing and supporting the treatment of <strong>${matchedDisease.name}</strong>.</p>
      <p>${matchedDisease.description}</p>
      <p>Physiologically, lifestyle and chronic disorders are often managed by restoring systemic homeostasis, regulating autonomic nervous system activity, lowering chronic inflammatory markers, and mitigating stress. This protocol integrates physical alignment, respiratory pacing, and Ayurvedic lifestyle interventions.</p>
      <h3>Key Clinical Symptoms Addressed:</h3>
      <ul>
        ${matchedDisease.symptoms.map((symptom) => `<li>${symptom}</li>`).join("")}
      </ul>
    `;
  };

  const generateObjectives = () => {
    return `
      <h2>2. Therapeutic Objectives</h2>
      <p>The core clinical and therapeutic objectives of this therapy plan are:</p>
      <ol>
        <li>To establish a safe, daily restorative routine that addresses the specific pathophysiology of <strong>${matchedDisease.name}</strong>.</li>
        <li>To stimulate targeted organs, enhance localized blood circulation, and balance autonomic nervous response.</li>
        <li>To introduce Ayurvedic dietary recommendations to reduce toxic metabolic load (Ama) and support tissue regeneration.</li>
        <li>To define strict contraindications and safety boundaries to prevent any adverse events or overexertion.</li>
      </ol>
    `;
  };

  const generateAdvantages = () => {
    return `
      <h2>3. Therapeutic Advantages & Physiological Impact</h2>
      <p>Adherence to the prescribed yoga therapy protocol offers the following verified physiological advantages:</p>
      <ul>
        ${matchedDisease.expectedBenefits.map((benefit) => `<li><strong>Targeted Improvement:</strong> ${benefit}</li>`).join("")}
        <li><strong>Autonomic Tone Optimization:</strong> Deep breathing stimulates the vagus nerve, reducing chronic sympathetic (fight-or-flight) hyper-arousal.</li>
        <li><strong>Systemic Detoxification:</strong> Gentle compression from specific postures aids lymphatic drainage and visceral organ massage.</li>
      </ul>
    `;
  };

  const generateApplications = () => {
    const asanaNames = matchedDisease.recommendedAsanas
      .map((id) => translatedAsanas.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(", ");
    
    const pranayamaNames = matchedDisease.recommendedPranayama
      .map((id) => translatedPranayamas.find((p) => p.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    return `
      <h2>4. Implementation Protocol & Daily Practice</h2>
      <p>This protocol should be implemented in a quiet, well-ventilated space, ideally during the early morning on an empty stomach. The therapy incorporates three main dimensions:</p>
      
      <h3>A. Physical Postures (Asanas):</h3>
      <p>The selected sequence (<strong>${asanaNames}</strong>) focuses on releasing muscular tension, strengthening supporting structures, and increasing systemic flexibility. Hold each posture with normal, relaxed breathing.</p>
      
      <h3>B. Breath Regulation (Pranayama):</h3>
      <p>Paced breathing exercises (<strong>${pranayamaNames}</strong>) restore blood gas equilibrium, stabilize heart rate variability, and calm hyperactive neural networks.</p>

      <h3>C. Ayurvedic Nutrition & Hydration:</h3>
      <p>Nutritional choices directly impact metabolic recovery. The following dietary plan should be strictly followed:</p>
      <ul>
        <li><strong>Foods to Include:</strong> ${matchedDisease.diet.eat.join(", ")}</li>
        <li><strong>Foods to Avoid:</strong> ${matchedDisease.diet.avoid.join(", ")}</li>
        <li><strong>Recommended Hydration:</strong> ${matchedDisease.diet.waterIntake}</li>
      </ul>
    `;
  };

  const generateConclusion = () => {
    return `
      <h2>5. Prognosis & Guidelines</h2>
      <p>Integrative yoga therapy serves as a powerful modality for long-term health preservation. It succeeds by restoring physiological balance, improving sleep, and lowering chronic psychological stress levels, which are major accelerators of lifestyle diseases.</p>
      <p>For a favorable prognosis, consistency is essential. Practicing 30-45 minutes daily, complemented by Ayurvedic eating patterns, results in measurable improvements within 4-6 weeks, helping to lower therapeutic dependency over time under professional guidance.</p>
    `;
  };

  const generateViva = () => {
    const checks = [
      {
        q: "Clinical Compliance Check",
        a: "Ensure the patient maintains normal breathing. Never allow breath retention (Kumbhaka) if the patient has high blood pressure, heart disease, or active glaucoma.",
      },
      {
        q: "Safety and Modification Check",
        a: `Review contraindications. Specifically for ${matchedDisease.name}, watch out for: ${matchedDisease.precautions.join("; ")}. Modify poses with bolsters or chairs to avoid any pain or strain.`,
      },
      {
        q: "Integration of Active Relaxation",
        a: "Ensure Shavasana (Corpse Pose) is practiced for at least 5-10 minutes at the end of each session to reduce sympathetic nervous drive and lower blood pressure.",
      },
      {
        q: "Dietary & Purity Principles",
        a: "Encourage Sattvic foods (fresh, home-cooked, organic) which are easy to digest. Avoid Rajasic (spicy, stimulating) and Tamasic (stale, processed) foods that cause internal metabolic inflammation.",
      },
    ];

    return `
      <h2>6. Clinical Guidelines & Safety Checklist</h2>
      <div style="margin-top: 15px;">
        ${checks
          .map(
            (c, idx) => `
          <div style="margin-bottom: 15px; padding: 10px; border-left: 3px solid #10b981; background: rgba(255,255,255,0.03);">
            <p><strong>Guideline ${idx + 1}: ${c.q}</strong></p>
            <p><em>Protocol: ${c.a}</em></p>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  };

  const generatePpt = () => {
    return `
      <h2>7. Weekly Progress Tracker</h2>
      <p>Use this weekly checklist to monitor consistency and track daily adherence to the therapy plan. Tick the boxes each day after completing the respective practices.</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px; border: 1px solid rgba(255,255,255,0.15); font-size: 13px;">
        <thead>
          <tr style="background: rgba(16, 185, 129, 0.15);">
            <th style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: left;">Daily Practice Checklist</th>
            <th style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">Day 1</th>
            <th style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">Day 2</th>
            <th style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">Day 3</th>
            <th style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">Day 4</th>
            <th style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">Day 5</th>
            <th style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">Day 6</th>
            <th style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">Day 7</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px;">Asana Session (min. 15-30m)</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
          </tr>
          <tr>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px;">Pranayama Practice (min. 10m)</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
          </tr>
          <tr>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px;">Dietary Adherence (Eat/Avoid)</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
          </tr>
          <tr>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px;">Hydration Target Met</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
          </tr>
          <tr>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px;">Symptom Severity (Low/Med/High)</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">_ _ _</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">_ _ _</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">_ _ _</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">_ _ _</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">_ _ _</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">_ _ _</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">_ _ _</td>
          </tr>
        </tbody>
      </table>
    `;
  };

  const getFullReportHtml = () => {
    let html = "";
    if (sections.intro) html += generateIntro();
    if (sections.objectives) html += generateObjectives();
    if (sections.advantages) html += generateAdvantages();
    if (sections.applications) html += generateApplications();
    if (sections.conclusion) html += generateConclusion();
    if (sections.viva) html += generateViva();
    if (sections.ppt) html += generatePpt();
    return html;
  };

  const downloadDocx = () => {
    const content = getFullReportHtml();
    const header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><title>Yoga Therapy Plan</title><style>body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #334155; } h2 { color: #059669; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-top: 25px; } h3 { color: #0f766e; } ul, ol { padding-left: 20px; } li { margin-bottom: 6px; } table { width: 100%; border-collapse: collapse; margin-top: 15px; } th, td { border: 1px solid #cbd5e1; padding: 8px; font-size: 13px; }</style></head><body>" +
      `<h1>Personalized Therapy Plan: Yoga Therapy for ${matchedDisease.name}</h1>` +
      "<p><em>Generated by Yoga Therapy AI - Clinical & Vedic Health Integration</em></p><hr/>";
    const footer = "</body></html>";
    const sourceHTML = header + content + footer;

    const blob = new Blob(["\ufeff" + sourceHTML], {
      type: "application/msword",
    });
    const url = URL.createObjectURL(blob);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = url;
    fileDownload.download = `Yoga_Therapy_Plan_${matchedDisease.id.replace(/-/g, "_")}.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
    URL.revokeObjectURL(url);
  };

  const printPdf = () => {
    const content = getFullReportHtml();
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Yoga Therapy Plan - ${matchedDisease.name}</title>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 45px; color: #1e293b; line-height: 1.6; }
              h1 { text-align: center; color: #059669; border-bottom: 2px solid #10b981; padding-bottom: 12px; margin-bottom: 10px; font-size: 24px; }
              .meta { font-size: 0.9em; color: #64748b; text-align: center; margin-bottom: 30px; font-style: italic; }
              h2 { color: #0f766e; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 6px; margin-top: 35px; font-size: 18px; }
              h3 { color: #047857; margin-top: 25px; font-size: 15px; }
              ul, ol { padding-left: 24px; margin-bottom: 16px; }
              li { margin-bottom: 8px; }
              strong { color: #0f172a; }
              table { width: 100%; border-collapse: collapse; margin-top: 15px; }
              th, td { border: 1px solid #cbd5e1; padding: 8px; font-size: 13px; }
              .viva-box { margin-bottom: 15px; padding: 12px; border-left: 3.5px solid #10b981; background: #f8fafc; border-radius: 0 6px 6px 0; }
              @media print {
                body { padding: 20px; }
                h2 { page-break-after: avoid; }
              }
            </style>
          </head>
          <body>
            <h1>Personalized Therapy Plan: Yoga & Ayurvedic Guide for ${matchedDisease.name}</h1>
            <div class="meta">
              Evidence-Based Lifestyle Protocol & Practice Planner <br/>
              Generated via Yoga Therapy AI
            </div>
            <div>${content}</div>
            <script>
              window.onload = function() {
                window.print();
                window.close();
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
          {t.reportTitle}
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-400">
          {t.reportSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Controls Panel */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md space-y-6 h-fit">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <Settings className="h-5 w-5 text-emerald-400 animate-spin-slow" /> Therapy Plan Parameters
          </h3>

          {/* Topic Select */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              {t.reportTopic}
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
            >
              {translatedDiseases.map((disease) => (
                <option key={disease.id} value={disease.id} className="bg-slate-950 text-white">
                  {disease.name}
                </option>
              ))}
            </select>
          </div>

          {/* Section Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              {t.includeSections}
            </label>
            
            {[
              { id: "intro" as const, label: t.introduction },
              { id: "objectives" as const, label: t.objectives },
              { id: "advantages" as const, label: t.advantages },
              { id: "applications" as const, label: t.applications },
              { id: "conclusion" as const, label: t.conclusion },
              { id: "viva" as const, label: t.vivaQuestionsTitle },
              { id: "ppt" as const, label: t.pptContentTitle },
            ].map((sec) => (
              <button
                key={sec.id}
                onClick={() => toggleSection(sec.id)}
                className="flex w-full items-center space-x-3 text-left text-sm text-slate-300 hover:text-white transition-all py-1"
              >
                {sections[sec.id] ? (
                  <CheckSquare className="h-5 w-5 text-emerald-400" />
                ) : (
                  <Square className="h-5 w-5 text-slate-500" />
                )}
                <span>{sec.label}</span>
              </button>
            ))}
          </div>

          {/* Export Actions */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <button
              onClick={printPdf}
              className="flex w-full items-center justify-center space-x-2 rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all duration-300"
            >
              <Printer className="h-4 w-4" />
              <span>{t.btnExportPdf}</span>
            </button>
            
            <button
              onClick={downloadDocx}
              className="flex w-full items-center justify-center space-x-2 rounded-xl bg-slate-800 border border-white/10 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-all duration-300"
            >
              <Download className="h-4 w-4" />
              <span>{t.btnExportDocx}</span>
            </button>
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-md overflow-y-auto max-h-[700px] prose prose-invert prose-emerald">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-6">
            <FileText className="h-4 w-4 animate-bounce" />
            <span>Document Preview</span>
          </div>

          <div id="report-content-area" className="space-y-6 text-slate-300 text-sm leading-relaxed">
            {sections.intro && (
              <div dangerouslySetInnerHTML={{ __html: generateIntro() }} />
            )}
            {sections.objectives && (
              <div dangerouslySetInnerHTML={{ __html: generateObjectives() }} />
            )}
            {sections.advantages && (
              <div dangerouslySetInnerHTML={{ __html: generateAdvantages() }} />
            )}
            {sections.applications && (
              <div dangerouslySetInnerHTML={{ __html: generateApplications() }} />
            )}
            {sections.conclusion && (
              <div dangerouslySetInnerHTML={{ __html: generateConclusion() }} />
            )}
            {sections.viva && (
              <div dangerouslySetInnerHTML={{ __html: generateViva() }} />
            )}
            {sections.ppt && (
              <div dangerouslySetInnerHTML={{ __html: generatePpt() }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
