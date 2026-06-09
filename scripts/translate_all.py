#!/usr/bin/env python3
import json
import time
import os
import re
from deep_translator import GoogleTranslator

CACHE_PATH = os.path.join(os.path.dirname(__file__), 'translation_cache.json')

def load_cache():
    if os.path.exists(CACHE_PATH):
        try:
            with open(CACHE_PATH, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading cache: {e}")
    return {"mr": {}, "hi": {}}

def save_cache(cache):
    try:
        with open(CACHE_PATH, 'w', encoding='utf-8') as f:
            json.dump(cache, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"Error saving cache: {e}")

def add_text_to_unique(text, unique_strings):
    if not text:
        return
    if len(text) > 2000:
        paragraphs = text.split('\n')
        for p in paragraphs:
            if p.strip():
                unique_strings.add(p.strip())
    else:
        unique_strings.add(text.strip())

def get_translation(text, trans_map):
    if not text:
        return ""
    text_stripped = text.strip()
    if len(text) > 2000:
        paragraphs = text.split('\n')
        translated_paragraphs = []
        for p in paragraphs:
            p_strip = p.strip()
            if p_strip:
                translated_paragraphs.append(trans_map.get(p_strip, p))
            else:
                translated_paragraphs.append(p)
        return '\n'.join(translated_paragraphs)
    else:
        return trans_map.get(text_stripped, text)

def batch_translate(strings, target_lang, cache):
    translated_map = cache.get(target_lang, {})
    
    # Filter out strings that are already cached
    missing_strings = [s for s in strings if s not in translated_map]
    
    if not missing_strings:
        print(f"All {len(strings)} strings for {target_lang} are already cached!")
        return translated_map

    print(f"Translating {len(missing_strings)} missing strings (out of {len(strings)}) to {target_lang}...")
    
    # Chunk the unique strings to stay under character limits per request (approx 3000 chars)
    batches = []
    temp_batch = []
    temp_len = 0
    for s in missing_strings:
        if temp_len + len(s) + 5 > 3000:
            batches.append(temp_batch)
            temp_batch = [s]
            temp_len = len(s)
        else:
            temp_batch.append(s)
            temp_len += len(s) + 5
    if temp_batch:
        batches.append(temp_batch)
        
    print(f"Translating to {target_lang} in {len(batches)} batches...")
    translator = GoogleTranslator(source='en', target=target_lang)
    
    for i, batch in enumerate(batches):
        print(f"  Batch {i+1}/{len(batches)} ({len(batch)} items)...")
        combined_text = " ||| ".join(batch)
        
        # Try batch translation first
        for attempt in range(3):
            try:
                translated = translator.translate(combined_text)
                if not translated:
                    raise ValueError("Empty translation response")
                
                parts = [p.strip() for p in re.split(r'\s*\|{2,}\s*', translated)]
                if len(parts) != len(batch):
                    print(f"    Warning: parts count mismatch ({len(parts)} vs {len(batch)}). Translating individually...")
                    for s in batch:
                        time.sleep(0.05)
                        translated_map[s] = translator.translate(s)
                else:
                    for orig, trans in zip(batch, parts):
                        translated_map[orig] = trans
                break
            except Exception as e:
                print(f"    Attempt {attempt+1} failed: {e}")
                time.sleep(1.0)
        else:
            print("    Failed to translate batch, doing individually...")
            for s in batch:
                try:
                    time.sleep(0.05)
                    translated_map[s] = translator.translate(s)
                except Exception as e:
                    print(f"      Failed to translate '{s[:20]}...': {e}")
                    translated_map[s] = s
                    
        # Save cache periodically after every batch
        cache[target_lang] = translated_map
        save_cache(cache)
        time.sleep(0.3)
        
    return translated_map

def map_asana(asana, trans_map):
    return {
        "name": asana.get("name"),
        "englishName": get_translation(asana.get("englishName"), trans_map),
        "description": get_translation(asana.get("description"), trans_map),
        "benefits": [get_translation(b, trans_map) for b in asana.get("benefits", [])],
        "precautions": [get_translation(p, trans_map) for p in asana.get("precautions", [])],
        "steps": [get_translation(s, trans_map) for s in asana.get("steps", [])],
        "targetBodyParts": [get_translation(t, trans_map) for t in asana.get("targetBodyParts", [])],
    }

def map_pranayama(pranayama, trans_map):
    return {
        "name": pranayama.get("name"),
        "technique": get_translation(pranayama.get("technique"), trans_map),
        "benefits": [get_translation(b, trans_map) for b in pranayama.get("benefits", [])],
        "precautions": [get_translation(p, trans_map) for p in pranayama.get("precautions", [])],
        "steps": [get_translation(s, trans_map) for s in pranayama.get("steps", [])],
    }

def map_disease(disease, trans_map):
    return {
        "name": get_translation(disease.get("name"), trans_map),
        "description": get_translation(disease.get("description"), trans_map),
        "symptoms": [get_translation(s, trans_map) for s in disease.get("symptoms", [])],
        "riskFactors": [get_translation(r, trans_map) for r in disease.get("riskFactors", [])],
        "dietEat": [get_translation(e, trans_map) for e in disease.get("diet", {}).get("eat", [])],
        "dietAvoid": [get_translation(av, trans_map) for av in disease.get("diet", {}).get("avoid", [])],
        "waterIntake": get_translation(disease.get("diet", {}).get("waterIntake"), trans_map),
        "dailyRoutine": [get_translation(dr, trans_map) for dr in disease.get("dailyRoutine", [])],
        "homeRemedies": [get_translation(hr, trans_map) for hr in disease.get("homeRemedies", [])],
        "precautions": [get_translation(pr, trans_map) for pr in disease.get("precautions", [])],
        "expectedBenefits": [get_translation(eb, trans_map) for eb in disease.get("expectedBenefits", [])],
    }

def map_article(article, trans_map):
    return {
        "title": get_translation(article.get("title"), trans_map),
        "category": get_translation(article.get("category"), trans_map),
        "summary": get_translation(article.get("summary"), trans_map),
        "content": get_translation(article.get("content"), trans_map),
    }

def main():
    raw_path = os.path.join(os.path.dirname(__file__), 'yoga-db-raw.json')
    with open(raw_path, 'r', encoding='utf-8') as f:
        raw_data = json.load(f)

    unique_strings = set()

    # Asanas
    for asana in raw_data['ASANAS']:
        add_text_to_unique(asana.get('englishName'), unique_strings)
        add_text_to_unique(asana.get('description'), unique_strings)
        for b in asana.get('benefits', []):
            add_text_to_unique(b, unique_strings)
        for p in asana.get('precautions', []):
            add_text_to_unique(p, unique_strings)
        for s in asana.get('steps', []):
            add_text_to_unique(s, unique_strings)
        for t in asana.get('targetBodyParts', []):
            add_text_to_unique(t, unique_strings)

    # Pranayamas
    for p in raw_data['PRANAYAMAS']:
        add_text_to_unique(p.get('technique'), unique_strings)
        for b in p.get('benefits', []):
            add_text_to_unique(b, unique_strings)
        for pr in p.get('precautions', []):
            add_text_to_unique(pr, unique_strings)
        for s in p.get('steps', []):
            add_text_to_unique(s, unique_strings)

    # Diseases
    for d in raw_data['DISEASES']:
        add_text_to_unique(d.get('name'), unique_strings)
        add_text_to_unique(d.get('description'), unique_strings)
        for s in d.get('symptoms', []):
            add_text_to_unique(s, unique_strings)
        for r in d.get('riskFactors', []):
            add_text_to_unique(r, unique_strings)
        for e in d.get('diet', {}).get('eat', []):
            add_text_to_unique(e, unique_strings)
        for av in d.get('diet', {}).get('avoid', []):
            add_text_to_unique(av, unique_strings)
        if d.get('diet', {}).get('waterIntake'):
            add_text_to_unique(d['diet']['waterIntake'], unique_strings)
        for dr in d.get('dailyRoutine', []):
            add_text_to_unique(dr, unique_strings)
        for hr in d.get('homeRemedies', []):
            add_text_to_unique(hr, unique_strings)
        for pr in d.get('precautions', []):
            add_text_to_unique(pr, unique_strings)
        for eb in d.get('expectedBenefits', []):
            add_text_to_unique(eb, unique_strings)

    # Articles
    for a in raw_data['EDUCATIONAL_ARTICLES']:
        add_text_to_unique(a.get('title'), unique_strings)
        add_text_to_unique(a.get('category'), unique_strings)
        add_text_to_unique(a.get('summary'), unique_strings)
        add_text_to_unique(a.get('content'), unique_strings)

    unique_strings = sorted([s for s in unique_strings if s and s.strip()])
    print(f"Total unique strings to translate: {len(unique_strings)}")

    # Load cache
    cache = load_cache()

    # We translate to both Hindi and Marathi
    languages = ["mr", "hi"]
    maps = {}
    for lang in languages:
        maps[lang] = batch_translate(unique_strings, lang, cache)

    # Map all database items
    translations_data = {
        "hi": {"diseases": {}, "asanas": {}, "pranayamas": {}, "articles": {}},
        "mr": {"diseases": {}, "asanas": {}, "pranayamas": {}, "articles": {}}
    }

    for lang in languages:
        trans_map = maps[lang]
        # Diseases
        for d in raw_data['DISEASES']:
            translations_data[lang]["diseases"][d["id"]] = map_disease(d, trans_map)
        # Asanas
        for a in raw_data['ASANAS']:
            translations_data[lang]["asanas"][a["id"]] = map_asana(a, trans_map)
        # Pranayamas
        for p in raw_data['PRANAYAMAS']:
            translations_data[lang]["pranayamas"][p["id"]] = map_pranayama(p, trans_map)
        # Articles
        for a in raw_data['EDUCATIONAL_ARTICLES']:
            translations_data[lang]["articles"][a["id"]] = map_article(a, trans_map)

    # Generate output
    ts_out = '/* Auto-generated translations for yoga-db content */\n\n'
    ts_out += 'export type DiseaseTranslation = {\n  name: string;\n  description: string;\n  symptoms?: string[];\n  riskFactors?: string[];\n  dietEat?: string[];\n  dietAvoid?: string[];\n  waterIntake?: string;\n  dailyRoutine?: string[];\n  homeRemedies?: string[];\n  precautions?: string[];\n  expectedBenefits?: string[];\n};\n\n'
    ts_out += 'export type AsanaTranslation = {\n  name?: string;\n  englishName?: string;\n  description?: string;\n  benefits?: string[];\n  precautions?: string[];\n  steps?: string[];\n  targetBodyParts?: string[];\n  difficulty?: "Beginner" | "Intermediate" | "Advanced";\n  duration?: string;\n};\n\n'
    ts_out += 'export type PranayamaTranslation = {\n  name?: string;\n  technique?: string;\n  benefits?: string[];\n  precautions?: string[];\n  steps?: string[];\n  difficulty?: "Beginner" | "Intermediate" | "Advanced";\n  duration?: string;\n};\n\n'
    ts_out += 'export type ArticleTranslation = {\n  title?: string;\n  category?: string;\n  summary?: string;\n  content?: string;\n};\n\n'

    # Write diseaseTranslations
    ts_out += 'export const diseaseTranslations: Record<string, Record<string, DiseaseTranslation>> = {\n'
    for lang in languages:
        ts_out += f'  {lang}: {{\n'
        for did, dt in translations_data[lang]["diseases"].items():
            ts_out += f'    "{did}": {{\n'
            ts_out += f'      name: {json.dumps(dt["name"], ensure_ascii=False)},\n'
            ts_out += f'      description: {json.dumps(dt["description"], ensure_ascii=False)},\n'
            ts_out += f'      symptoms: {json.dumps(dt["symptoms"], ensure_ascii=False)},\n'
            ts_out += f'      riskFactors: {json.dumps(dt["riskFactors"], ensure_ascii=False)},\n'
            ts_out += f'      dietEat: {json.dumps(dt["dietEat"], ensure_ascii=False)},\n'
            ts_out += f'      dietAvoid: {json.dumps(dt["dietAvoid"], ensure_ascii=False)},\n'
            ts_out += f'      waterIntake: {json.dumps(dt["waterIntake"], ensure_ascii=False)},\n'
            ts_out += f'      dailyRoutine: {json.dumps(dt["dailyRoutine"], ensure_ascii=False)},\n'
            ts_out += f'      homeRemedies: {json.dumps(dt["homeRemedies"], ensure_ascii=False)},\n'
            ts_out += f'      precautions: {json.dumps(dt["precautions"], ensure_ascii=False)},\n'
            ts_out += f'      expectedBenefits: {json.dumps(dt["expectedBenefits"], ensure_ascii=False)},\n'
            ts_out += f'    }},\n'
        ts_out += f'  }},\n'
    ts_out += '};\n\n'

    # Write asanaTranslations
    ts_out += 'export const asanaTranslations: Record<string, Record<string, AsanaTranslation>> = {\n'
    for lang in languages:
        ts_out += f'  {lang}: {{\n'
        for aid, at in translations_data[lang]["asanas"].items():
            ts_out += f'    "{aid}": {{\n'
            ts_out += f'      name: {json.dumps(at["name"], ensure_ascii=False)},\n'
            ts_out += f'      englishName: {json.dumps(at["englishName"], ensure_ascii=False)},\n'
            ts_out += f'      description: {json.dumps(at["description"], ensure_ascii=False)},\n'
            ts_out += f'      benefits: {json.dumps(at["benefits"], ensure_ascii=False)},\n'
            ts_out += f'      precautions: {json.dumps(at["precautions"], ensure_ascii=False)},\n'
            ts_out += f'      steps: {json.dumps(at["steps"], ensure_ascii=False)},\n'
            ts_out += f'      targetBodyParts: {json.dumps(at["targetBodyParts"], ensure_ascii=False)},\n'
            ts_out += f'    }},\n'
        ts_out += f'  }},\n'
    ts_out += '};\n\n'

    # Write pranayamaTranslations
    ts_out += 'export const pranayamaTranslations: Record<string, Record<string, PranayamaTranslation>> = {\n'
    for lang in languages:
        ts_out += f'  {lang}: {{\n'
        for pid, pt in translations_data[lang]["pranayamas"].items():
            ts_out += f'    "{pid}": {{\n'
            ts_out += f'      name: {json.dumps(pt["name"], ensure_ascii=False)},\n'
            ts_out += f'      technique: {json.dumps(pt["technique"], ensure_ascii=False)},\n'
            ts_out += f'      benefits: {json.dumps(pt["benefits"], ensure_ascii=False)},\n'
            ts_out += f'      precautions: {json.dumps(pt["precautions"], ensure_ascii=False)},\n'
            ts_out += f'      steps: {json.dumps(pt["steps"], ensure_ascii=False)},\n'
            ts_out += f'    }},\n'
        ts_out += f'  }},\n'
    ts_out += '};\n\n'

    # Write articleTranslations
    ts_out += 'export const articleTranslations: Record<string, Record<string, ArticleTranslation>> = {\n'
    for lang in languages:
        ts_out += f'  {lang}: {{\n'
        for aid, att in translations_data[lang]["articles"].items():
            ts_out += f'    "{aid}": {{\n'
            ts_out += f'      title: {json.dumps(att["title"], ensure_ascii=False)},\n'
            ts_out += f'      category: {json.dumps(att["category"], ensure_ascii=False)},\n'
            ts_out += f'      summary: {json.dumps(att["summary"], ensure_ascii=False)},\n'
            ts_out += f'      content: {json.dumps(att["content"], ensure_ascii=False)},\n'
            ts_out += f'    }},\n'
        ts_out += f'  }},\n'
    ts_out += '};\n'

    outpath = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'yoga-db-translations.ts')
    with open(outpath, 'w', encoding='utf-8') as f:
        f.write(ts_out)

    print(f"\n✅ Translations written to {outpath}")

if __name__ == '__main__':
    main()
