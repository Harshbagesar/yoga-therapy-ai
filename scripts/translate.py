#!/usr/bin/env python3
"""Generate Hindi and Marathi translations for yoga-db content."""
import json, time, re, os
from deep_translator import GoogleTranslator

def translate(text, target):
    try:
        time.sleep(0.3)
        return GoogleTranslator(source='en', target=target).translate(text)
    except:
        return text

def translate_list(items, target):
    return [translate(item, target) for item in items]

# Disease data to translate
diseases = {
    "heart-disease": {"name": "Heart Disease", "description": "Conditions affecting the heart structure or function, including coronary artery disease, arrhythmias, and cardiovascular wellness issues."},
    "diabetes": {"name": "Diabetes", "description": "A chronic metabolic condition characterized by high blood sugar levels."},
    "high-blood-pressure": {"name": "High Blood Pressure", "description": "Hypertension occurs when the force of blood against arterial walls is too high."},
    "asthma": {"name": "Asthma", "description": "A respiratory condition where airway inflammation causes breathing difficulty."},
    "obesity": {"name": "Obesity", "description": "A condition of excessive body fat accumulation affecting overall health."},
    "stress": {"name": "Stress", "description": "A state of mental or emotional strain from demanding circumstances."},
    "anxiety": {"name": "Anxiety", "description": "A mental health condition characterized by persistent worry and nervousness."},
    "depression": {"name": "Depression", "description": "A mood disorder causing persistent feelings of sadness and loss of interest."},
    "migraine": {"name": "Migraine", "description": "Severe recurring headaches often with nausea and sensitivity to light."},
    "insomnia": {"name": "Insomnia", "description": "A sleep disorder making it difficult to fall or stay asleep."},
    "back-pain": {"name": "Back Pain", "description": "Pain or discomfort in the lower, middle, or upper back region."},
    "neck-pain": {"name": "Neck Pain", "description": "Pain or stiffness in the cervical spine area."},
    "arthritis": {"name": "Arthritis", "description": "Inflammation of joints causing pain and stiffness."},
    "digestive-disorders": {"name": "Digestive Disorders", "description": "Conditions affecting the gastrointestinal tract and digestion."},
    "pcos": {"name": "PCOS", "description": "Polycystic Ovary Syndrome, a hormonal disorder in women."},
    "thyroid-issues": {"name": "Thyroid Issues", "description": "Disorders of the thyroid gland affecting metabolism."},
    "general-fitness": {"name": "General Fitness", "description": "Overall physical wellness and body conditioning."},
}

asanas = {
    "tadasana": {"name": "Tadasana", "englishName": "Mountain Pose", "description": "The foundational standing posture promoting balance and spinal alignment."},
    "vrikshasana": {"name": "Vrikshasana", "englishName": "Tree Pose", "description": "A balancing pose enhancing focus and equilibrium."},
    "bhujangasana": {"name": "Bhujangasana", "englishName": "Cobra Pose", "description": "A gentle backward bend that stretches the chest and strengthens the spine."},
    "vajrasana": {"name": "Vajrasana", "englishName": "Thunderbolt Pose", "description": "A kneeling posture recommended after meals to aid digestion."},
    "shavasana": {"name": "Shavasana", "englishName": "Corpse Pose", "description": "A posture of total relaxation practiced at end of session."},
    "setubandhasana": {"name": "Setu Bandhasana", "englishName": "Bridge Pose", "description": "A rejuvenating backbend that stimulates the thyroid."},
    "paschimottanasana": {"name": "Paschimottanasana", "englishName": "Seated Forward Bend", "description": "A deep forward fold stretching the entire back."},
    "trikonasana": {"name": "Trikonasana", "englishName": "Triangle Pose", "description": "A standing pose that stretches and tones the entire body."},
    "padmasana": {"name": "Padmasana", "englishName": "Lotus Pose", "description": "The classic meditative posture for meditation."},
    "sukhasana": {"name": "Sukhasana", "englishName": "Easy Pose", "description": "A comfortable seated posture for meditation and breathing."},
    "suryanamaskar": {"name": "Surya Namaskar", "englishName": "Sun Salutation", "description": "A sequence of 12 poses performed as a flowing exercise."},
}

pranayamas = {
    "anulomvilom": {"name": "Anulom Vilom", "technique": "Alternate Nostril Breathing"},
    "bhramari": {"name": "Bhramari", "technique": "Bee Breathing"},
    "kapalbhati": {"name": "Kapalbhati", "technique": "Skull Shining Breath"},
    "ujjayi": {"name": "Ujjayi", "technique": "Ocean Breath"},
    "sheetali": {"name": "Sheetali", "technique": "Cooling Breath"},
    "nadishodhana": {"name": "Nadi Shodhana", "technique": "Channel Purifying Breath"},
    "deepbreathing": {"name": "Deep Breathing", "technique": "Diaphragmatic Breathing"},
}

output = {"hi": {"diseases": {}, "asanas": {}, "pranayamas": {}}, "mr": {"diseases": {}, "asanas": {}, "pranayamas": {}}}

for lang_code, lang_name in [("hi", "Hindi"), ("mr", "Marathi")]:
    print(f"\n=== Translating to {lang_name} ===")
    
    for did, d in diseases.items():
        print(f"  Disease: {did}")
        output[lang_code]["diseases"][did] = {
            "name": translate(d["name"], lang_code),
            "description": translate(d["description"], lang_code),
        }
    
    for aid, a in asanas.items():
        print(f"  Asana: {aid}")
        output[lang_code]["asanas"][aid] = {
            "name": a["name"],  # Keep Sanskrit name
            "englishName": translate(a["englishName"], lang_code),
            "description": translate(a["description"], lang_code),
        }
    
    for pid, p in pranayamas.items():
        print(f"  Pranayama: {pid}")
        output[lang_code]["pranayamas"][pid] = {
            "name": p["name"],  # Keep Sanskrit name
            "technique": translate(p["technique"], lang_code),
        }

# Write TypeScript file
ts_out = '/* Auto-generated translations for yoga-db content */\n\n'
ts_out += 'export type DiseaseTranslation = {\n  name: string;\n  description: string;\n  symptoms?: string[];\n  riskFactors?: string[];\n  dietEat?: string[];\n  dietAvoid?: string[];\n  waterIntake?: string;\n  dailyRoutine?: string[];\n  homeRemedies?: string[];\n  precautions?: string[];\n  expectedBenefits?: string[];\n};\n\n'
ts_out += 'export type AsanaTranslation = {\n  name?: string;\n  englishName?: string;\n  description?: string;\n  benefits?: string[];\n  precautions?: string[];\n  steps?: string[];\n  targetBodyParts?: string[];\n  difficulty?: "Beginner" | "Intermediate" | "Advanced";\n  duration?: string;\n};\n\n'
ts_out += 'export type PranayamaTranslation = {\n  name?: string;\n  technique?: string;\n  benefits?: string[];\n  precautions?: string[];\n  steps?: string[];\n  difficulty?: "Beginner" | "Intermediate" | "Advanced";\n  duration?: string;\n};\n\n'
ts_out += 'export type ArticleTranslation = {\n  title?: string;\n  category?: string;\n  summary?: string;\n  content?: string;\n};\n\n'

# Write disease translations
ts_out += 'export const diseaseTranslations: Record<string, Record<string, DiseaseTranslation>> = {\n'
for lang in ["hi", "mr"]:
    ts_out += f'  {lang}: {{\n'
    for did, dt in output[lang]["diseases"].items():
        ts_out += f'    "{did}": {{\n'
        ts_out += f'      name: {json.dumps(dt["name"], ensure_ascii=False)},\n'
        ts_out += f'      description: {json.dumps(dt["description"], ensure_ascii=False)},\n'
        ts_out += f'    }},\n'
    ts_out += f'  }},\n'
ts_out += '};\n\n'

# Write asana translations
ts_out += 'export const asanaTranslations: Record<string, Record<string, AsanaTranslation>> = {\n'
for lang in ["hi", "mr"]:
    ts_out += f'  {lang}: {{\n'
    for aid, at in output[lang]["asanas"].items():
        ts_out += f'    "{aid}": {{\n'
        ts_out += f'      name: {json.dumps(at["name"], ensure_ascii=False)},\n'
        ts_out += f'      englishName: {json.dumps(at["englishName"], ensure_ascii=False)},\n'
        ts_out += f'      description: {json.dumps(at["description"], ensure_ascii=False)},\n'
        ts_out += f'    }},\n'
    ts_out += f'  }},\n'
ts_out += '};\n\n'

# Write pranayama translations
ts_out += 'export const pranayamaTranslations: Record<string, Record<string, PranayamaTranslation>> = {\n'
for lang in ["hi", "mr"]:
    ts_out += f'  {lang}: {{\n'
    for pid, pt in output[lang]["pranayamas"].items():
        ts_out += f'    "{pid}": {{\n'
        ts_out += f'      name: {json.dumps(pt["name"], ensure_ascii=False)},\n'
        ts_out += f'      technique: {json.dumps(pt["technique"], ensure_ascii=False)},\n'
        ts_out += f'    }},\n'
    ts_out += f'  }},\n'
ts_out += '};\n\n'

ts_out += 'export const articleTranslations: Record<string, Record<string, ArticleTranslation>> = {\n  hi: {},\n  mr: {},\n};\n'

outpath = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'yoga-db-translations.ts')
with open(outpath, 'w', encoding='utf-8') as f:
    f.write(ts_out)

print(f"\n✅ Translations written to {outpath}")
