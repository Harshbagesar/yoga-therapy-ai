import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ASANAS, PRANAYAMAS, DISEASES } from "@/data/yoga-db";

const apiKey = process.env.GEMINI_API_KEY;

// Local AI Simulation fallback when GEMINI_API_KEY is not configured
function getLocalMockResponse(userMessage: string): string {
  const query = userMessage.toLowerCase();
  
  // Search for matching diseases in our database
  const matchedDisease = DISEASES.find(
    (d) =>
      query.includes(d.name.toLowerCase()) ||
      d.id.split("-").some((part) => query.includes(part))
  );

  let response = `✨ **Yoga Health Guide AI (Local Demo Mode)**\n\n`;
  response += `*Note: To enable live real-time Gemini responses, please set the \`GEMINI_API_KEY\` environment variable.*\n\n`;

  if (matchedDisease) {
    // We found a matching disease, return detailed information formatted nicely
    response += `👋 Hello! I understand you are asking about yoga and lifestyle guidance for **${matchedDisease.name}**. Here is a tailored therapeutic yoga plan for you:\n\n`;
    
    response += `### 🧘 Recommended Yoga Asanas\n`;
    matchedDisease.recommendedAsanas.forEach((asanaId) => {
      const asana = ASANAS.find((a) => a.id === asanaId);
      if (asana) {
        response += `- **${asana.name} (${asana.englishName})**: ${asana.description}\n`;
        response += `  *Hold for:* ${asana.duration}. *Key Benefit:* ${asana.benefits[0]}\n`;
      }
    });
    
    response += `\n### 💨 Breathing Practices (Pranayama)\n`;
    matchedDisease.recommendedPranayama.forEach((pranayamaId) => {
      const pranayama = PRANAYAMAS.find((p) => p.id === pranayamaId);
      if (pranayama) {
        response += `- **${pranayama.name} (${pranayama.technique})**: ${pranayama.benefits[0]} (Practice for ${pranayama.duration}).\n`;
      }
    });

    response += `\n### 🥗 Diet & Nutrition Guidelines\n`;
    response += `**Foods to Include:**\n`;
    matchedDisease.diet.eat.forEach((food) => {
      response += `- ${food}\n`;
    });
    response += `\n**Foods to Avoid:**\n`;
    matchedDisease.diet.avoid.forEach((food) => {
      response += `- ${food}\n`;
    });
    response += `\n**Recommended Hydration:** ${matchedDisease.diet.waterIntake}\n`;

    response += `\n### 🏡 Effective Home Remedies\n`;
    matchedDisease.homeRemedies.forEach((remedy) => {
      response += `- ${remedy}\n`;
    });

    response += `\n### ⚠️ Safety Precautions\n`;
    matchedDisease.precautions.forEach((precaution) => {
      response += `- ${precaution}\n`;
    });

    response += `\n### 📅 Suggested Daily Routine\n`;
    matchedDisease.dailyRoutine.forEach((step, idx) => {
      response += `${idx + 1}. ${step}\n`;
    });

    response += `\n---\n*⚠️ **Medical Disclaimer:** The information provided here is for educational and wellness purposes only. Please consult a qualified cardiologist or healthcare provider before initiating any new exercise regimen, especially if you have an active medical condition.*`;
    return response;
  }

  // Handle generic prompts
  if (query.includes("30-day") || query.includes("plan") || query.includes("routine")) {
    return `${response}👋 Hello! Here is a recommended **30-Day Beginner Yoga & Mindfulness Plan** to cultivate consistency and vitality:

### 📅 Week 1: Foundations of Alignment (15 mins/day)
- **Focus:** Warm-ups, breathing, and standing postures.
- **Practice:** 
  - 5 mins: **Sukhasana** with **Deep Breathing**
  - 5 mins: Gentle neck stretches and shoulder rolls
  - 5 mins: **Tadasana (Mountain Pose)** and **Vrikshasana (Tree Pose)**
- **Goal:** Build body awareness, balance, and lung capacity.

### 📅 Week 2: Core Strength & Spinal Flexibility (20 mins/day)
- **Focus:** Backbends and abdominal toning.
- **Practice:**
  - 5 mins: **Anulom Vilom Pranayama**
  - 10 mins: 3 rounds of **Surya Namaskar (Sun Salutations)**
  - 5 mins: **Bhujangasana (Cobra Pose)** and **Setu Bandhasana (Bridge Pose)**
- **Goal:** Strengthen the back, open the chest, and stimulate metabolic rate.

### 📅 Week 3: Restorative Stretching & Detox (25 mins/day)
- **Focus:** Deep seated folds and cooling breathing.
- **Practice:**
  - 5 mins: **Kapalbhati Pranayama** (skull-shining breath)
  - 15 mins: **Paschimottanasana (Seated Forward Bend)**, **Trikonasana (Triangle Pose)**, and gentle twists
  - 5 mins: **Sheetali (Cooling Breath)** followed by quiet sitting
- **Goal:** Stretch the hamstrings, stimulate digestion, and soothe internal heat.

### 📅 Week 4: Integration & Deep Relaxation (30 mins/day)
- **Focus:** Complete flow and meditative stillness.
- **Practice:**
  - 5 mins: **Nadi Shodhana Pranayama**
  - 15 mins: Complete flow (Surya Namaskar, Tree Pose, Cobra, Seated Forward Bend)
  - 10 mins: Deep relaxation in **Shavasana (Corpse Pose)** with a body-scan mindfulness practice
- **Goal:** Calm the nervous system completely and integrate physical benefits.

*⚠️ **Disclaimer:** Listen to your body. Modify poses as needed and do not push into sharp pain.*`;
  }

  if (query.includes("diet") || query.includes("food") || query.includes("eat")) {
    return `${response}👋 Hello! In Yoga and Ayurveda, food is considered medicine (**Ahar**). A balanced diet should be **Sattvic** (pure, light, and full of prana/vital energy):

### 🟢 Foods to Eat (Sattvic & Healing)
- **Fresh Fruits & Vegetables:** Papaya, apples, melons, spinach, bottle gourd (lauki), and squash.
- **Whole Grains:** Oats, brown rice, quinoa, barley, and finger millet (ragi).
- **Healthy Fats:** Walnuts, almonds, flaxseeds, pumpkin seeds, and small amounts of organic cow's ghee.
- **Proteins:** Mung dal, red lentils, chickpeas, and sprouts.
- **Herbs & Spices:** Ginger, turmeric, cumin, fennel, and fresh holy basil (Tulsi).

### 🔴 Foods to Avoid (Rajasic & Tamasic)
- **Highly Processed Foods:** Packaged snacks, instant noodles, and canned meals.
- **Excessive Stimulants:** White sugar, refined flour, deep-fried snacks, sodas, and excessive coffee/black tea.
- **Heavy/Stale Foods:** Leftovers older than 24 hours, excessively fermented foods, and red meat.
- **Overly Spicy & Sour Foods:** Excessive red chilies, vinegar, and highly fermented pickles.

### 💧 Hydration Tips
- Drink **2.5 to 3.0 liters** of lukewarm water daily.
- Avoid drinking ice-cold water as it dampens the digestive fire (**Agni**).
- Sip warm ginger-fennel tea between meals to support digestion and reduce bloating.

*⚠️ **Disclaimer:** Diet plans should be customized to your body constitution (Vata, Pitta, Kapha). Consult an Ayurvedic practitioner or clinical dietitian for a personalized regimen.*`;
  }

  // General default greeting and instructions
  return `${response}👋 Namaste! I am your **Yoga Health Guide AI Assistant**. I can help you with:
1. **Specific Health Conditions:** Ask about yoga for Diabetes, Hypertension, Obesity, Back Pain, PCOS, etc.
2. **Asanas & Pranayama:** Ask how to practice specific poses, their benefits, and safety precautions.
3. **Yoga Planners & Diet:** Ask for a 30-day beginner schedule, a Sattvic diet plan, or stress management routines.

**What would you like to explore today?** Try asking:
- *"What yoga is best for high blood pressure?"*
- *"Suggest a beginner routine for back pain"*
- *"Generate a 30-day yoga plan"*`;
}

interface ChatMessage {
  role: string;
  content: string;
}

export async function POST(req: NextRequest) {
  let messages: ChatMessage[] = [];
  try {
    const body = await req.json();
    messages = body.messages;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request. Messages array is required." },
        { status: 400 }
      );
    }

    const latestMessage = messages[messages.length - 1].content;

    // If API Key is not present, use our advanced local rule engine
    if (!apiKey) {
      const mockReply = getLocalMockResponse(latestMessage);
      return NextResponse.json({
        content: mockReply,
        isDemo: true,
      });
    }

    // Call Gemini API
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are a professional Yoga Therapist and Ayurvedic Health Coach at "Yoga Health Guide AI". Your goal is to guide users with professional, encouraging, and medically sound advice regarding Yoga therapy, Pranayama, Ayurvedic diet, and lifestyle adjustments for various health conditions.
      
      You have access to a database of yoga poses:
      - Tadasana (Mountain Pose)
      - Vrikshasana (Tree Pose)
      - Bhujangasana (Cobra Pose)
      - Vajrasana (Thunderbolt Pose)
      - Shavasana (Corpse Pose)
      - Setu Bandhasana (Bridge Pose)
      - Paschimottanasana (Seated Forward Bend)
      - Trikonasana (Triangle Pose)
      - Padmasana (Lotus Pose)
      - Sukhasana (Easy Pose)
      - Surya Namaskar (Sun Salutation)
      
      And pranayamas:
      - Anulom Vilom (Alternate Nostril Breathing)
      - Bhramari (Bee Breathing)
      - Kapalbhati (Skull Shining Breath)
      - Ujjayi (Ocean Breath)
      - Sheetali (Cooling Breath)
      - Nadi Shodhana (Channel Purifying Breath)
      - Deep Breathing
      
      When answering:
      1. Prioritize recommending these specific poses and breathing techniques.
      2. Always format your responses using clean, structured, and beautiful markdown.
      3. Start with a warm, encouraging greeting.
      4. Divide your recommendations into clear sections (e.g., Asana Practice, Breathing Techniques, Diet & Hydration, Lifestyle Routine).
      5. Include safety precautions and contraindications.
      6. End with a professional disclaimer: "Medical Disclaimer: Yoga is a supportive therapy. Please consult your physician or healthcare provider before starting any new exercise routine, especially if you have preexisting health conditions."`,
    });

    // Format chat history for Gemini
    const chatHistory = messages.slice(0, -1).map((msg: ChatMessage) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: chatHistory,
    });

    const result = await chat.sendMessage(latestMessage);
    const responseText = result.response.text();

    return NextResponse.json({
      content: responseText,
      isDemo: false,
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    // If the API call fails, fallback to local response gracefully
    const latestMessage = messages?.[messages.length - 1]?.content || "";
    const fallbackReply = getLocalMockResponse(latestMessage);
    const errorMessage = error instanceof Error ? error.message : "An error occurred while calling the Gemini API.";
    return NextResponse.json({
      content: fallbackReply,
      isDemo: true,
      error: errorMessage,
    });
  }
}
