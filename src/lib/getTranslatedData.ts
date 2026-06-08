import { Disease, Asana, Pranayama, Article } from "@/data/yoga-db";
import { Language } from "@/context/AppContext";
import { diseaseTranslations, asanaTranslations, pranayamaTranslations, articleTranslations } from "@/data/yoga-db-translations";

export function getTranslatedDisease(disease: Disease, lang: Language): Disease {
  if (lang === "en") return disease;
  const t = diseaseTranslations[lang]?.[disease.id];
  if (!t) return disease;
  return {
    ...disease,
    name: t.name || disease.name,
    description: t.description || disease.description,
    symptoms: t.symptoms || disease.symptoms,
    riskFactors: t.riskFactors || disease.riskFactors,
    diet: {
      eat: t.dietEat || disease.diet.eat,
      avoid: t.dietAvoid || disease.diet.avoid,
      waterIntake: t.waterIntake || disease.diet.waterIntake,
    },
    dailyRoutine: t.dailyRoutine || disease.dailyRoutine,
    homeRemedies: t.homeRemedies || disease.homeRemedies,
    precautions: t.precautions || disease.precautions,
    expectedBenefits: t.expectedBenefits || disease.expectedBenefits,
  };
}

export function getTranslatedAsana(asana: Asana, lang: Language): Asana {
  if (lang === "en") return asana;
  const t = asanaTranslations[lang]?.[asana.id];
  if (!t) return asana;
  return {
    ...asana,
    name: t.name || asana.name,
    englishName: t.englishName || asana.englishName,
    description: t.description || asana.description,
    benefits: t.benefits || asana.benefits,
    precautions: t.precautions || asana.precautions,
    steps: t.steps || asana.steps,
    targetBodyParts: t.targetBodyParts || asana.targetBodyParts,
    difficulty: t.difficulty || asana.difficulty,
    duration: t.duration || asana.duration,
  };
}

export function getTranslatedPranayama(pranayama: Pranayama, lang: Language): Pranayama {
  if (lang === "en") return pranayama;
  const t = pranayamaTranslations[lang]?.[pranayama.id];
  if (!t) return pranayama;
  return {
    ...pranayama,
    name: t.name || pranayama.name,
    technique: t.technique || pranayama.technique,
    benefits: t.benefits || pranayama.benefits,
    precautions: t.precautions || pranayama.precautions,
    steps: t.steps || pranayama.steps,
    difficulty: t.difficulty || pranayama.difficulty,
    duration: t.duration || pranayama.duration,
  };
}

export function getTranslatedArticle(article: Article, lang: Language): Article {
  if (lang === "en") return article;
  const t = articleTranslations[lang]?.[article.id];
  if (!t) return article;
  return {
    ...article,
    title: t.title || article.title,
    category: t.category || article.category,
    summary: t.summary || article.summary,
    content: t.content || article.content,
  };
}
