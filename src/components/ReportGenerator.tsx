"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { DISEASES, ASANAS, PRANAYAMAS } from "@/data/yoga-db";
import { getTranslatedDisease, getTranslatedAsana, getTranslatedPranayama } from "@/lib/getTranslatedData";
import { FileText, Download, Printer, Settings, CheckSquare, Square } from "lucide-react";

const reportTranslations = {
  en: {
    introTitle: "1. Clinical Overview",
    introText1: "Yoga therapy acts as an evidence-based complementary system of healthcare. This therapeutic plan is designed specifically for managing and supporting the treatment of",
    introText2: "Physiologically, lifestyle and chronic disorders are often managed by restoring systemic homeostasis, regulating autonomic nervous system activity, lowering chronic inflammatory markers, and mitigating stress. This protocol integrates physical alignment, respiratory pacing, and Ayurvedic lifestyle interventions.",
    keySymptomsAddressed: "Key Clinical Symptoms Addressed:",

    objectivesTitle: "2. Therapeutic Objectives",
    objectivesText: "The core clinical and therapeutic objectives of this therapy plan are:",
    objectivesList: [
      "To establish a safe, daily restorative routine that addresses the specific pathophysiology of",
      "To stimulate targeted organs, enhance localized blood circulation, and balance autonomic nervous response.",
      "To introduce Ayurvedic dietary recommendations to reduce toxic metabolic load (Ama) and support tissue regeneration.",
      "To define strict contraindications and safety boundaries to prevent any adverse events or overexertion."
    ],

    advantagesTitle: "3. Therapeutic Advantages & Physiological Impact",
    advantagesText: "Adherence to the prescribed yoga therapy protocol offers the following verified physiological advantages:",
    targetedImprovement: "Targeted Improvement:",
    autonomicTone: "Autonomic Tone Optimization: Deep breathing stimulates the vagus nerve, reducing chronic sympathetic (fight-or-flight) hyper-arousal.",
    systemicDetox: "Systemic Detoxification: Gentle compression from specific postures aids lymphatic drainage and visceral organ massage.",

    applicationsTitle: "4. Implementation Protocol & Daily Practice",
    applicationsText: "This protocol should be implemented in a quiet, well-ventilated space, ideally during the early morning on an empty stomach. The therapy incorporates three main dimensions:",
    physicalPosturesTitle: "A. Physical Postures (Asanas):",
    physicalPosturesText: "focuses on releasing muscular tension, strengthening supporting structures, and increasing systemic flexibility. Hold each posture with normal, relaxed breathing.",
    breathRegulationTitle: "B. Breath Regulation (Pranayama):",
    breathRegulationText: "restores blood gas equilibrium, stabilize heart rate variability, and calm hyperactive neural networks.",
    ayurvedicNutritionTitle: "C. Ayurvedic Nutrition & Hydration:",
    ayurvedicNutritionText: "Nutritional choices directly impact metabolic recovery. The following dietary plan should be strictly followed:",
    foodsToInclude: "Foods to Include:",
    foodsToAvoid: "Foods to Avoid:",
    recommendedHydration: "Recommended Hydration:",

    conclusionTitle: "5. Prognosis & Guidelines",
    conclusionText1: "Integrative yoga therapy serves as a powerful modality for long-term health preservation. It succeeds by restoring physiological balance, improving sleep, and lowering chronic psychological stress levels, which are major accelerators of lifestyle diseases.",
    conclusionText2: "For a favorable prognosis, consistency is essential. Practicing 30-45 minutes daily, complemented by Ayurvedic eating patterns, results in measurable improvements within 4-6 weeks, helping to lower therapeutic dependency over time under professional guidance.",

    vivaTitle: "6. Clinical Guidelines & Safety Checklist",
    vivaList: [
      {
        q: "Clinical Compliance Check",
        a: "Ensure the patient maintains normal breathing. Never allow breath retention (Kumbhaka) if the patient has high blood pressure, heart disease, or active glaucoma.",
      },
      {
        q: "Safety and Modification Check",
        a: "Review contraindications. Specifically for {disease}, watch out for: {precautions}. Modify poses with bolsters or chairs to avoid any pain or strain.",
      },
      {
        q: "Integration of Active Relaxation",
        a: "Ensure Shavasana (Corpse Pose) is practiced for at least 5-10 minutes at the end of each session to reduce sympathetic nervous drive and lower blood pressure.",
      },
      {
        q: "Dietary & Purity Principles",
        a: "Encourage Sattvic foods (fresh, home-cooked, organic) which are easy to digest. Avoid Rajasic (spicy, stimulating) and Tamasic (stale, processed) foods that cause internal metabolic inflammation.",
      }
    ],
    guidelineLabel: "Guideline",
    protocolLabel: "Protocol",

    pptTitle: "7. Weekly Progress Tracker",
    pptText: "Use this weekly checklist to monitor consistency and track daily adherence to the therapy plan. Tick the boxes each day after completing the respective practices.",
    dailyPracticeChecklist: "Daily Practice Checklist",
    day: "Day",
    asanaSessionText: "Asana Session (min. 15-30m)",
    pranayamaPracticeText: "Pranayama Practice (min. 10m)",
    dietaryAdherenceText: "Dietary Adherence (Eat/Avoid)",
    hydrationTargetMetText: "Hydration Target Met",
    symptomSeverityText: "Symptom Severity (Low/Med/High)",

    parametersTitle: "Therapy Plan Parameters",
    documentPreviewTitle: "Document Preview",
    docxTitle: "Yoga Therapy Plan",
    pdfTitle: "Yoga Therapy Plan - {disease}",
    personalizedTherapyPlanTitle: "Personalized Therapy Plan: Yoga & Ayurvedic Guide for {disease}",
    evidenceBasedProtocol: "Evidence-Based Lifestyle Protocol & Practice Planner",
    generatedVia: "Generated via Yoga Therapy AI",
  },
  mr: {
    introTitle: "१. नैदानिक ​​विहंगावलोकन",
    introText1: "योग थेरपी आरोग्य सेवेची पुरावा-आधारित पूरक प्रणाली म्हणून कार्य करते. ही उपचार योजना विशेषतः खालील आजाराच्या व्यवस्थापनासाठी आणि उपचारासाठी डिझाइन केली आहे:",
    introText2: "शरीरक्रियाशास्त्राच्या दृष्टीने, जीवनशैली आणि जुनाट आजार सामान्यतः प्रणालीगत होमिओस्टॅसिस पुनर्संचयित करून, स्वायत्त मज्जासंस्थेच्या क्रियाकलापांचे नियमन करून, जुनाट सूज कमी करून आणि तणाव कमी करून व्यवस्थापित केले जातात. या प्रोटोकॉलमध्ये शारीरिक आसन, श्वासोच्छवासाचा वेग आणि आयुर्वेदिक जीवनशैलीतील हस्तक्षेप एकत्रित केले आहेत.",
    keySymptomsAddressed: "लक्ष ठेवण्यात येणारी मुख्य नैदानिक ​​लक्षणे:",

    objectivesTitle: "२. उपचारात्मक उद्दिष्टे",
    objectivesText: "या उपचार योजनेची मुख्य क्लिनिकल आणि उपचारात्मक उद्दिष्टे खालीलप्रमाणे आहेत:",
    objectivesList: [
      "रुग्णाच्या विशिष्ट पॅथोफिजियोलॉजीनुसार एक सुरक्षित, दररोजची पुनर्संचयित दिनचर्या स्थापित करणे.",
      "लक्ष्यित अवयवांना उत्तेजित करणे, स्थानिक रक्त परिसंचरण वाढवणे आणि स्वायत्त मज्जासंष्ठा संतुलित करणे.",
      "विषारी चयापचय भार (आम) कमी करण्यासाठी आणि ऊतक पुनरुत्पादनास मदत करण्यासाठी आयुर्वेदिक आहाराची शिफारस करणे.",
      "कोणतीही प्रतिकूल घटना किंवा अतिश्रम टाळण्यासाठी कठोर contraindications आणि सुरक्षिततेच्या मर्यादा निश्चित करणे."
    ],

    advantagesTitle: "३. उपचारात्मक फायदे आणि शारीरिक प्रभाव",
    advantagesText: "विहित योग थेरपी प्रोटोकॉलचे पालन केल्याने खालील पडताळलेले शारीरिक फायदे मिळतात:",
    targetedImprovement: "लक्ष्यित सुधारणा:",
    autonomicTone: "स्वायत्त टोन ऑप्टिमायझेशन: खोल श्वासोच्छवासामुळे व्हॅगस नर्व्ह उत्तेजित होते, ज्यामुळे जुनाट सहानुभूती (लढा किंवा पळून जा) हायपर-अराउझल कमी होते.",
    systemicDetox: "प्रणालीगत डिटॉक्सिफिकेशन: विशिष्ट आसनांमधील सौम्य दाबामुळे लसिका निचरा आणि अंतर्गत अवयवांचे मसाज होण्यास मदत होते.",

    applicationsTitle: "४. अंमलबजावणी प्रोटोकॉल आणि दैनिक सराव",
    applicationsText: "हा प्रोटोकॉल एका शांत, हवेशीर जागेत, शक्यतो पहाटे रिकाम्या पोटी अंमलात आणला पाहिजे. या थेरपीमध्ये तीन मुख्य परिमाण समाविष्ट आहेत:",
    physicalPosturesTitle: "अ. शारीरिक आसने (Asanas):",
    physicalPosturesText: "स्नायूंचा ताण सोडवण्यावर, आधारभूत संरचना मजबूत करण्यावर आणि प्रणालीगत लवचिकता वाढवण्यावर लक्ष केंद्रित करते. सामान्य, सैल श्वासोच्छवासासह प्रत्येक आसन करा.",
    breathRegulationTitle: "ब. श्वास नियंत्रण (Pranayama):",
    breathRegulationText: "रक्तातील वायूचा समतोल पुनर्संचयित करते, हृदय गतीची परिवर्तनशीलता स्थिर करते आणि अतिसक्रिय मज्जासंस्था शांत करते.",
    ayurvedicNutritionTitle: "क. आयुर्वेदिक पोषण आणि हायड्रेशन:",
    ayurvedicNutritionText: "पोषण निवडींचा चयापचय पुनर्प्राप्तीवर थेट परिणाम होतो. खालील आहार योजनेचे काटेकोरपणे पालन केले पाहिजे:",
    foodsToInclude: "समाविष्ट करायचे अन्नपदार्थ:",
    foodsToAvoid: "टाळायचे अन्नपदार्थ:",
    recommendedHydration: "शिफारस केलेले हायड्रेशन:",

    conclusionTitle: "५. जीवनशैली मार्गदर्शक तत्त्वे",
    conclusionText1: "दीर्घकालीन आरोग्य रक्षणासाठी एकात्मिक योग थेरपी हे एक शक्तिशाली माध्यम आहे. हे शारीरिक समतोल पुनर्संचयित करून, झोप सुधारून आणि मानसिक तणाव कमी करून कार्य करते, जे जीवनशैलीच्या आजारांचे मुख्य कारण आहेत.",
    conclusionText2: "सकारात्मक परिणामांसाठी सातत्य आवश्यक आहे. दररोज ३०-४५ मिनिटे सराव आणि आयुर्वेदिक आहार पद्धतीमुळे ४-६ आठवड्यांत मोजमाप करण्यायोग्य सुधारणा दिसून येतात, ज्यामुळे कालांतराने डॉक्टरांच्या मार्गदर्शनाखाली उपचारांवरील अवलंबित्व कमी होण्यास मदत होते.",

    vivaTitle: "६. नैदानिक मार्गदर्शक तत्त्वे आणि सुरक्षा चेकलिस्ट",
    vivaList: [
      {
        q: "क्लिनिकल अनुपालन तपासणी",
        a: "रुग्ण सामान्य श्वासोच्छवास राखत असल्याची खात्री करा. रुग्णाला उच्च रक्तदाब, हृदयरोग किंवा सक्रिय काचबिंदू असल्यास कधीही श्वास रोखून धरू देऊ नका (कुंभक).",
      },
      {
        q: "सुरक्षा आणि बदल तपासणी",
        a: "contraindications चे पुनरावलोकन करा. विशेषतः {disease} साठी खालील गोष्टींकडे लक्ष द्या: {precautions}. कोणताही त्रास किंवा ताण टाळण्यासाठी आसनांमध्ये बदल करा.",
      },
      {
        q: "सक्रिय विश्रांतीचे एकत्रीकरण",
        a: "मज्जासंस्थेचा ताण कमी करण्यासाठी आणि रक्तदाब कमी करण्यासाठी प्रत्येक सत्राच्या शेवटी किमान ५-१० मिनिटे शवासन केले जाईल याची खात्री करा.",
      },
      {
        q: "आहार आणि शुद्धतेची तत्त्वे",
        a: "पचायला सोपे असणारे सात्विक अन्न (ताजे, घरगुती बनवलेले, सेंद्रिय) घेण्यास प्रोत्साहन द्या. चयापचय वाढवणारे राजसिक (मसालेदार, उत्तेजक) आणि तामसिक (अन्न शिळे, प्रक्रिया केलेले) पदार्थ टाळा."
      }
    ],
    guidelineLabel: "मार्गदर्शक तत्त्व",
    protocolLabel: "प्रोटोकॉल",

    pptTitle: "७. साप्ताहिक सराव ट्रॅकर",
    pptText: "सातत्य राखण्यासाठी आणि उपचार योजनेचे दैनंदिन पालन तपासण्यासाठी या साप्ताहिक चेकलिस्टचा वापर करा. संबंधित सराव पूर्ण केल्यानंतर दररोज चौकटीत खूण करा.",
    dailyPracticeChecklist: "दैनंदिन सराव चेकलिस्ट",
    day: "दिवस",
    asanaSessionText: "आसन सत्र (किमान १५-३० मि)",
    pranayamaPracticeText: "प्राणायाम सराव (किमान १० मि)",
    dietaryAdherenceText: "आहाराचे पालन (खावे/टाळावे)",
    hydrationTargetMetText: "हायड्रेशन लक्ष्य पूर्ण",
    symptomSeverityText: "लक्षणांची तीव्रता (कमी/मध्यम/तीव्र)",

    parametersTitle: "उपचार योजना घटक",
    documentPreviewTitle: "दस्तऐवज पूर्वदृश्य",
    docxTitle: "योग थेरपी योजना",
    pdfTitle: "योग थेरपी योजना - {disease}",
    personalizedTherapyPlanTitle: "वैयक्तिकृत उपचार योजना: {disease} साठी योग आणि आयुर्वेदिक मार्गदर्शक",
    evidenceBasedProtocol: "पुरावा-आधारित जीवनशैली प्रोटोकॉल आणि सराव नियोजक",
    generatedVia: "योग थेरपी एआय द्वारे व्युत्पन्न",
  },
  hi: {
    introTitle: "1. नैदानिक ​​अवलोकन",
    introText1: "योग थेरेपी स्वास्थ्य देखभाल की एक साक्ष्य-आधारित पूरक प्रणाली के रूप में कार्य करती है। यह चिकित्सीय योजना विशेष रूप से निम्नलिखित बीमारी के प्रबंधन और उपचार के लिए तैयार की गई है:",
    introText2: "शारीरिक रूप से, जीवनशैली और पुराने विकारों को अक्सर प्रणालीगत समस्थापन को बहाल करके, स्वायत्त तंत्रिका तंत्र की गतिविधि को विनियमित करके, पुरानी सूजन को कम करके और तनाव को कम करके प्रबंधित किया जाता है। यह प्रोटोकॉल शारीरिक संरेखण, श्वसन गति और आयुर्वेदिक जीवनशैली के हस्तक्षेपों को एकीकृत करता है।",
    keySymptomsAddressed: "संबोधित किए गए मुख्य नैदानिक ​​लक्षण:",

    objectivesTitle: "2. चिकित्सीय उद्देश्य",
    objectivesText: "इस चिकित्सा योजना के मुख्य नैदानिक ​​और चिकित्सीय उद्देश्य निम्नलिखित हैं:",
    objectivesList: [
      "मरीज के विशिष्ट विकृति विज्ञान के अनुसार एक सुरक्षित, दैनिक पुनर्स्थापनात्मक दिनचर्या स्थापित करना।",
      "लक्षित अंगों को उत्तेजित करना, स्थानीय रक्त परिसंचरण को बढ़ाना और स्वायत्त तंत्रिका तंत्र को संतुलित करना।",
      "विषाक्त चयापचय भार (आम) को कम करने और ऊतक पुनर्जनन में मदद करने के लिए आयुर्वेदिक आहार की सिफारिश करना।",
      "किसी भी प्रतिकूल घटना या अत्यधिक परिश्रम को रोकने के लिए सख्त contraindications और सुरक्षा सीमाओं को परिभाषित करना।"
    ],

    advantagesTitle: "3. चिकित्सीय लाभ और शारीरिक प्रभाव",
    advantagesText: "निर्धारित योग थेरेपी प्रोटोकॉल का पालन करने से निम्नलिखित सत्यापित शारीरिक लाभ मिलते हैं:",
    targetedImprovement: "लक्षित सुधार:",
    autonomicTone: "स्वायत्त टोन अनुकूलन: गहरी सांस लेने से वेगस तंत्रिका उत्तेजित होती है, जिससे पुरानी सहानुभूति तंत्रिका अति-सक्रियता कम होती है।",
    systemicDetox: "प्रणालीगत विषहरण: विशिष्ट आसनों से होने वाला कोमल दबाव लसीका जल निकासी और आंतरिक अंगों की मालिश में सहायता करता है।",

    applicationsTitle: "4. कार्यान्वयन प्रोटोकॉल और दैनिक अभ्यास",
    applicationsText: "इस प्रोटोकॉल को एक शांत, हवादार स्थान पर, अधिमानतः सुबह खाली पेट लागू किया जाना चाहिए। इस थेरेपी में तीन मुख्य आयाम शामिल हैं:",
    physicalPosturesTitle: "क. शारीरिक मुद्राएं (आसन):",
    physicalPosturesText: "मांसपेशियों के तनाव को दूर करने, सहायक संरचनाओं को मजबूत करने और प्रणालीगत लचीलापन बढ़ाने पर केंद्रित है। सामान्य, शिथिल श्वास के साथ प्रत्येक मुद्रा को बनाए रखें।",
    breathRegulationTitle: "ख. श्वास नियंत्रण (प्राणायाम):",
    breathRegulationText: "रक्त गैस संतुलन को बहाल करता है, हृदय गति की परिवर्तनशीलता को स्थिर करता है और अति-सक्रिय तंत्रिका नेटवर्क को शांत करता है।",
    ayurvedicNutritionTitle: "ग. आयुर्वेदिक पोषण और जलयोजन:",
    ayurvedicNutritionText: "पोषण संबंधी विकल्प सीधे चयापचय वसूली को प्रभावित करते हैं। निम्नलिखित आहार योजना का कड़ाई से पालन किया जाना चाहिए:",
    foodsToInclude: "शामिल करने योग्य खाद्य पदार्थ:",
    foodsToAvoid: "परहेज करने योग्य खाद्य पदार्थ:",
    recommendedHydration: "अनुशंसित जलयोजन:",

    conclusionTitle: "5. रोग का निदान और दिशानिर्देश",
    conclusionText1: "एकीकृत योग थेरेपी दीर्घकालिक स्वास्थ्य संरक्षण के लिए एक शक्तिशाली साधन है। यह शारीरिक संतुलन बहाल करके, नींद में सुधार करके और मनोवैज्ञानिक तनाव को कम करके काम करता है, जो जीवनशैली की बीमारियों के मुख्य कारण हैं।",
    conclusionText2: "सकारात्मक परिणाम के लिए निरंतरता आवश्यक है। दैनिक रूप से 30-45 मिनट अभ्यास और आयुर्वेदिक आहार पैटर्न के साथ 4-6 सप्ताह के भीतर मापने योग्य सुधार होते हैं, जिससे पेशेवर मार्गदर्शन में समय के साथ निर्भरता कम करने में मदद मिलती है।",

    vivaTitle: "6. नैदानिक ​​दिशानिर्देश और सुरक्षा चेकलिस्ट",
    vivaList: [
      {
        q: "नैदानिक ​​​​अनुपालन जांच",
        a: "सुनिश्चित करें कि रोगी सामान्य श्वास बनाए रखता है। यदि रोगी को उच्च रक्तदाब, हृदय रोग या सक्रिय ग्लूकोमा है तो कभी भी श्वास को रोकने (कुंभक) की अनुमति न दें।",
      },
      {
        q: "सुरक्षा और संशोधन जांच",
        a: "contraindications की समीक्षा करें। विशेष रूप से {disease} के लिए निम्नलिखित बातों का ध्यान रखें: {precautions}। किसी भी दर्द या खिंचाव से बचने के लिए आसनों में बदलाव करें।",
      },
      {
        q: "सक्रिय विश्राम का एकीकरण",
        a: "सहानुभूति तंत्रिका तंत्र के तनाव को कम करने और रक्तचाप को कम करने के लिए प्रत्येक सत्र के अंत में कम से कम 5-10 मिनट के लिए शवासन का अभ्यास सुनिश्चित करें।",
      },
      {
        q: "आहार और शुद्धता के सिद्धांत",
        a: "आसानी से पचने वाले सात्विक भोजन (ताजा, घर का बना, जैविक) को बढ़ावा दें। राजसिक (मसालेदार, उत्तेजक) और तामसिक (बासी, प्रसंस्कृत) खाद्य पदार्थों से बचें जो आंतरिक सूजन का कारण बनते हैं।"
      }
    ],
    guidelineLabel: "दिशानिर्देश",
    protocolLabel: "प्रोटोकॉल",

    pptTitle: "7. साप्ताहिक अभ्यास ट्रैकर",
    pptText: "निरंतरता की निगरानी करने और चिकित्सा योजना के दैनिक पालन को ट्रैक करने के लिए इस साप्ताहिक चेकलिस्ट का उपयोग करें। संबंधित अभ्यास पूरा करने के बाद प्रतिदिन बक्से में सही का निशान लगाएं।",
    dailyPracticeChecklist: "दैनिक अभ्यास चेकलिस्ट",
    day: "दिन",
    asanaSessionText: "आसन सत्र (कम से कम 15-30 मिनट)",
    pranayamaPracticeText: "प्राणायाम अभ्यास (कम से कम 10 मिनट)",
    dietaryAdherenceText: "आहार का पालन (खाएं/परहेज करें)",
    hydrationTargetMetText: "जलयोजन लक्ष्य पूरा",
    symptomSeverityText: "लक्षणों की तीव्रता (कम/मध्यम/उच्च)",

    parametersTitle: "थेरेपी योजना पैरामीटर",
    documentPreviewTitle: "दस्तावेज़ पूर्वावलोकन",
    docxTitle: "योग थेरेपी योजना",
    pdfTitle: "योग थेरेपी योजना - {disease}",
    personalizedTherapyPlanTitle: "व्यक्तिगत थेरेपी योजना: {disease} के लिए योग और आयुर्वेदिक गाइड",
    evidenceBasedProtocol: "साक्ष्य-आधारित जीवनशैली प्रोटोकॉल और अभ्यास योजनाकार",
    generatedVia: "योग थेरेपी एआई द्वारा निर्मित",
  }
};

export const ReportGenerator: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];
  const rt = reportTranslations[language] || reportTranslations.en;

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
      <h2>${rt.introTitle}</h2>
      <p>${rt.introText1} <strong>${matchedDisease.name}</strong>.</p>
      <p>${matchedDisease.description}</p>
      <p>${rt.introText2}</p>
      <h3>${rt.keySymptomsAddressed}</h3>
      <ul>
        ${matchedDisease.symptoms.map((symptom) => `<li>${symptom}</li>`).join("")}
      </ul>
    `;
  };

  const generateObjectives = () => {
    return `
      <h2>${rt.objectivesTitle}</h2>
      <p>${rt.objectivesText}</p>
      <ol>
        <li>${rt.objectivesList[0]} <strong>${matchedDisease.name}</strong>.</li>
        <li>${rt.objectivesList[1]}</li>
        <li>${rt.objectivesList[2]}</li>
        <li>${rt.objectivesList[3]}</li>
      </ol>
    `;
  };

  const generateAdvantages = () => {
    return `
      <h2>${rt.advantagesTitle}</h2>
      <p>${rt.advantagesText}</p>
      <ul>
        ${matchedDisease.expectedBenefits.map((benefit) => `<li><strong>${rt.targetedImprovement}</strong> ${benefit}</li>`).join("")}
        <li><strong>${rt.autonomicTone.split(":")[0]}:</strong>${rt.autonomicTone.split(":")[1]}</li>
        <li><strong>${rt.systemicDetox.split(":")[0]}:</strong>${rt.systemicDetox.split(":")[1]}</li>
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
      <h2>${rt.applicationsTitle}</h2>
      <p>${rt.applicationsText}</p>
      
      <h3>${rt.physicalPosturesTitle}</h3>
      <p>${rt.physicalPosturesTitle.replace(/A\.\s+|B\.\s+|C\.\s+/g, "")} (${asanaNames}) ${rt.physicalPosturesText}</p>
      
      <h3>${rt.breathRegulationTitle}</h3>
      <p>${rt.breathRegulationTitle.replace(/A\.\s+|B\.\s+|C\.\s+/g, "")} (${pranayamaNames}) ${rt.breathRegulationText}</p>

      <h3>${rt.ayurvedicNutritionTitle}</h3>
      <p>${rt.ayurvedicNutritionText}</p>
      <ul>
        <li><strong>${rt.foodsToInclude}</strong> ${matchedDisease.diet.eat.join(", ")}</li>
        <li><strong>${rt.foodsToAvoid}</strong> ${matchedDisease.diet.avoid.join(", ")}</li>
        <li><strong>${rt.recommendedHydration}</strong> ${matchedDisease.diet.waterIntake}</li>
      </ul>
    `;
  };

  const generateConclusion = () => {
    return `
      <h2>${rt.conclusionTitle}</h2>
      <p>${rt.conclusionText1}</p>
      <p>${rt.conclusionText2}</p>
    `;
  };

  const generateViva = () => {
    const checks = rt.vivaList.map((c, i) => {
      let finalA = c.a;
      if (i === 1) {
        finalA = c.a.replace("{disease}", matchedDisease.name).replace("{precautions}", matchedDisease.precautions.join("; "));
      }
      return { q: c.q, a: finalA };
    });

    return `
      <h2>${rt.vivaTitle}</h2>
      <div style="margin-top: 15px;">
        ${checks
          .map(
            (c, idx) => `
          <div style="margin-bottom: 15px; padding: 10px; border-left: 3px solid #10b981; background: rgba(255,255,255,0.03);">
            <p><strong>${rt.guidelineLabel} ${idx + 1}: ${c.q}</strong></p>
            <p><em>${rt.protocolLabel}: ${c.a}</em></p>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  };

  const generatePpt = () => {
    return `
      <h2>${rt.pptTitle}</h2>
      <p>${rt.pptText}</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px; border: 1px solid rgba(255,255,255,0.15); font-size: 13px;">
        <thead>
          <tr style="background: rgba(16, 185, 129, 0.15);">
            <th style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: left;">${rt.dailyPracticeChecklist}</th>
            <th style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">${rt.day} 1</th>
            <th style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">${rt.day} 2</th>
            <th style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">${rt.day} 3</th>
            <th style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">${rt.day} 4</th>
            <th style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">${rt.day} 5</th>
            <th style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">${rt.day} 6</th>
            <th style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">${rt.day} 7</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px;">${rt.asanaSessionText}</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
          </tr>
          <tr>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px;">${rt.pranayamaPracticeText}</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
          </tr>
          <tr>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px;">${rt.dietaryAdherenceText}</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
          </tr>
          <tr>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px;">${rt.hydrationTargetMetText}</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px; text-align: center;">[  ]</td>
          </tr>
          <tr>
            <td style="border: 1px solid rgba(255,255,255,0.15); padding: 8px;">${rt.symptomSeverityText}</td>
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
      `<head><title>${rt.docxTitle}</title><style>body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #334155; } h2 { color: #059669; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-top: 25px; } h3 { color: #0f766e; } ul, ol { padding-left: 20px; } li { margin-bottom: 6px; } table { width: 100%; border-collapse: collapse; margin-top: 15px; } th, td { border: 1px solid #cbd5e1; padding: 8px; font-size: 13px; }</style></head><body>` +
      `<h1>${rt.personalizedTherapyPlanTitle.replace("{disease}", matchedDisease.name)}</h1>` +
      `<p><em>${rt.generatedVia} - Clinical & Vedic Health Integration</em></p><hr/>`;
    const footer = "</body></html>";
    const sourceHTML = header + content + footer;

    const blob = new Blob(["\ufeff" + sourceHTML], {
      type: "application/msword",
    });
    const url = URL.createObjectURL(blob);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = url;
    fileDownload.download = `${rt.docxTitle.replace(/\s+/g, "_")}_${matchedDisease.id.replace(/-/g, "_")}.doc`;
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
            <title>${rt.pdfTitle.replace("{disease}", matchedDisease.name)}</title>
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
            <h1>${rt.personalizedTherapyPlanTitle.replace("{disease}", matchedDisease.name)}</h1>
            <div class="meta">
              ${rt.evidenceBasedProtocol} <br/>
              ${rt.generatedVia}
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
            <Settings className="h-5 w-5 text-emerald-400 animate-spin-slow" /> {rt.parametersTitle}
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
            <span>{rt.documentPreviewTitle}</span>
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
