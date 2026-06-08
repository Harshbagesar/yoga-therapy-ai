/* Auto-generated translations for yoga-db content */

export type DiseaseTranslation = {
  name: string;
  description: string;
  symptoms?: string[];
  riskFactors?: string[];
  dietEat?: string[];
  dietAvoid?: string[];
  waterIntake?: string;
  dailyRoutine?: string[];
  homeRemedies?: string[];
  precautions?: string[];
  expectedBenefits?: string[];
};

export type AsanaTranslation = {
  name?: string;
  englishName?: string;
  description?: string;
  benefits?: string[];
  precautions?: string[];
  steps?: string[];
  targetBodyParts?: string[];
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  duration?: string;
};

export type PranayamaTranslation = {
  name?: string;
  technique?: string;
  benefits?: string[];
  precautions?: string[];
  steps?: string[];
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  duration?: string;
};

export type ArticleTranslation = {
  title?: string;
  category?: string;
  summary?: string;
  content?: string;
};

export const diseaseTranslations: Record<string, Record<string, DiseaseTranslation>> = {
  hi: {
    "heart-disease": {
      name: "दिल की बीमारी",
      description: "हृदय की संरचना या कार्य को प्रभावित करने वाली स्थितियाँ, जिनमें कोरोनरी धमनी रोग, अतालता और हृदय संबंधी स्वास्थ्य संबंधी समस्याएं शामिल हैं।",
    },
    "diabetes": {
      name: "मधुमेह",
      description: "उच्च रक्त शर्करा स्तर की विशेषता वाली एक दीर्घकालिक चयापचय स्थिति।",
    },
    "high-blood-pressure": {
      name: "उच्च रक्तचाप",
      description: "उच्च रक्तचाप तब होता है जब धमनी की दीवारों पर रक्त का बल बहुत अधिक होता है।",
    },
    "asthma": {
      name: "दमा",
      description: "एक श्वसन स्थिति जहां वायुमार्ग की सूजन के कारण सांस लेने में कठिनाई होती है।",
    },
    "obesity": {
      name: "मोटापा",
      description: "शरीर में अत्यधिक वसा जमा होने की स्थिति जो समग्र स्वास्थ्य को प्रभावित करती है।",
    },
    "stress": {
      name: "तनाव",
      description: "चुनौतीपूर्ण परिस्थितियों से मानसिक या भावनात्मक तनाव की स्थिति।",
    },
    "anxiety": {
      name: "चिंता",
      description: "एक मानसिक स्वास्थ्य स्थिति जिसमें लगातार चिंता और घबराहट बनी रहती है।",
    },
    "depression": {
      name: "अवसाद",
      description: "एक मनोदशा विकार जिसके कारण लगातार उदासी की भावनाएँ और रुचि की हानि होती है।",
    },
    "migraine": {
      name: "माइग्रेन",
      description: "मतली और प्रकाश के प्रति संवेदनशीलता के साथ अक्सर गंभीर आवर्ती सिरदर्द।",
    },
    "insomnia": {
      name: "अनिद्रा",
      description: "एक नींद संबंधी विकार जिससे गिरना या सोते रहना मुश्किल हो जाता है।",
    },
    "back-pain": {
      name: "पीठ दर्द",
      description: "पीठ के निचले, मध्य या ऊपरी हिस्से में दर्द या बेचैनी।",
    },
    "neck-pain": {
      name: "गर्दन में दर्द",
      description: "ग्रीवा रीढ़ क्षेत्र में दर्द या कठोरता।",
    },
    "arthritis": {
      name: "वात रोग",
      description: "जोड़ों की सूजन के कारण दर्द और जकड़न होती है।",
    },
    "digestive-disorders": {
      name: "पाचन विकार",
      description: "जठरांत्र संबंधी मार्ग और पाचन को प्रभावित करने वाली स्थितियाँ।",
    },
    "pcos": {
      name: "पीसीओ",
      description: "पॉलीसिस्टिक ओवरी सिंड्रोम, महिलाओं में एक हार्मोनल विकार।",
    },
    "thyroid-issues": {
      name: "थायराइड की समस्या",
      description: "थायरॉयड ग्रंथि के विकार चयापचय को प्रभावित करते हैं।",
    },
    "general-fitness": {
      name: "सामान्य स्वास्थ्य",
      description: "समग्र शारीरिक कल्याण और शरीर की कंडीशनिंग।",
    },
  },
  mr: {
    "heart-disease": {
      name: "हृदयविकार",
      description: "हृदयाच्या संरचनेवर किंवा कार्यावर परिणाम करणाऱ्या अटी, ज्यामध्ये कोरोनरी धमनी रोग, अतालता आणि हृदय व रक्तवाहिन्यासंबंधी आरोग्य समस्या यांचा समावेश आहे.",
    },
    "diabetes": {
      name: "मधुमेह",
      description: "उच्च रक्तातील साखरेची पातळी द्वारे दर्शविले जाणारी एक तीव्र चयापचय स्थिती.",
    },
    "high-blood-pressure": {
      name: "उच्च रक्तदाब",
      description: "जेव्हा धमनीच्या भिंतींवर रक्ताची शक्ती खूप जास्त असते तेव्हा उच्च रक्तदाब होतो.",
    },
    "asthma": {
      name: "दमा",
      description: "श्वासोच्छवासाची स्थिती जेथे वायुमार्गाच्या जळजळीमुळे श्वास घेण्यास त्रास होतो.",
    },
    "obesity": {
      name: "लठ्ठपणा",
      description: "शरीरात जास्त चरबी जमा होण्याची स्थिती एकूण आरोग्यावर परिणाम करते.",
    },
    "stress": {
      name: "ताण",
      description: "मागणी केलेल्या परिस्थितीमुळे मानसिक किंवा भावनिक ताणाची स्थिती.",
    },
    "anxiety": {
      name: "चिंता",
      description: "सतत चिंता आणि चिंताग्रस्त मानसिक आरोग्य स्थिती.",
    },
    "depression": {
      name: "नैराश्य",
      description: "मूड डिसऑर्डर ज्यामुळे सतत दुःखाची भावना आणि स्वारस्य कमी होते.",
    },
    "migraine": {
      name: "मायग्रेन",
      description: "मळमळ आणि प्रकाशाच्या संवेदनशीलतेसह गंभीर वारंवार डोकेदुखी.",
    },
    "insomnia": {
      name: "निद्रानाश",
      description: "झोपेचा विकार ज्यामुळे झोप येणे किंवा झोपणे कठीण होते.",
    },
    "back-pain": {
      name: "पाठदुखी",
      description: "खालच्या, मध्यभागी किंवा पाठीच्या वरच्या भागात वेदना किंवा अस्वस्थता.",
    },
    "neck-pain": {
      name: "मान दुखणे",
      description: "मानेच्या मणक्याच्या भागात वेदना किंवा कडकपणा.",
    },
    "arthritis": {
      name: "संधिवात",
      description: "सांध्यांना जळजळ होऊन वेदना आणि कडकपणा.",
    },
    "digestive-disorders": {
      name: "पाचक विकार",
      description: "गॅस्ट्रोइंटेस्टाइनल ट्रॅक्ट आणि पचन प्रभावित करणार्या परिस्थिती.",
    },
    "pcos": {
      name: "PCOS",
      description: "पॉलीसिस्टिक ओव्हरी सिंड्रोम, स्त्रियांमध्ये हार्मोनल विकार.",
    },
    "thyroid-issues": {
      name: "थायरॉईड समस्या",
      description: "थायरॉईड ग्रंथीचे विकार चयापचय प्रभावित करतात.",
    },
    "general-fitness": {
      name: "सामान्य फिटनेस",
      description: "एकूणच शारीरिक आरोग्य आणि शरीराची स्थिती.",
    },
  },
};

export const asanaTranslations: Record<string, Record<string, AsanaTranslation>> = {
  hi: {
    "tadasana": {
      name: "Tadasana",
      englishName: "पर्वत मुद्रा",
      description: "संतुलन और रीढ़ की हड्डी के संरेखण को बढ़ावा देने वाली बुनियादी खड़े मुद्रा।",
    },
    "vrikshasana": {
      name: "Vrikshasana",
      englishName: "वृक्ष मुद्रा",
      description: "एक संतुलन मुद्रा जो फोकस और संतुलन को बढ़ाती है।",
    },
    "bhujangasana": {
      name: "Bhujangasana",
      englishName: "कोबरा मुद्रा",
      description: "एक हल्का पीछे की ओर झुकना जो छाती को फैलाता है और रीढ़ को मजबूत करता है।",
    },
    "vajrasana": {
      name: "Vajrasana",
      englishName: "वज्र मुद्रा",
      description: "पाचन में सहायता के लिए भोजन के बाद घुटनों के बल बैठने की सलाह दी जाती है।",
    },
    "shavasana": {
      name: "Shavasana",
      englishName: "शव मुद्रा",
      description: "सत्र के अंत में पूर्ण विश्राम की मुद्रा का अभ्यास किया जाता है।",
    },
    "setubandhasana": {
      name: "Setu Bandhasana",
      englishName: "ब्रिज पोज़",
      description: "एक कायाकल्प करने वाला बैकबेंड जो थायराइड को उत्तेजित करता है।",
    },
    "paschimottanasana": {
      name: "Paschimottanasana",
      englishName: "आगे की ओर झुका हुआ बैठा हुआ",
      description: "एक गहरी आगे की ओर मुड़ी हुई तह जो पूरी पीठ को खींचती है।",
    },
    "trikonasana": {
      name: "Trikonasana",
      englishName: "त्रिकोण मुद्रा",
      description: "खड़े होने की एक मुद्रा जो पूरे शरीर को फैलाती है और टोन करती है।",
    },
    "padmasana": {
      name: "Padmasana",
      englishName: "कमल मुद्रा",
      description: "ध्यान के लिए क्लासिक ध्यान मुद्रा।",
    },
    "sukhasana": {
      name: "Sukhasana",
      englishName: "आसान मुद्रा",
      description: "ध्यान और सांस लेने के लिए आरामदायक बैठने की मुद्रा।",
    },
    "suryanamaskar": {
      name: "Surya Namaskar",
      englishName: "सूर्य नमस्कार",
      description: "प्रवाहपूर्ण व्यायाम के रूप में किए गए 12 आसनों का एक क्रम।",
    },
  },
  mr: {
    "tadasana": {
      name: "Tadasana",
      englishName: "माउंटन पोझ",
      description: "समतोल आणि पाठीच्या संरेखनाला प्रोत्साहन देणारी पायाभूत स्थिती.",
    },
    "vrikshasana": {
      name: "Vrikshasana",
      englishName: "झाडाची पोझ",
      description: "एक संतुलित पोझ फोकस आणि समतोल वाढवते.",
    },
    "bhujangasana": {
      name: "Bhujangasana",
      englishName: "कोब्रा पोझ",
      description: "एक हलक्या पाठीमागे वाकणे जे छातीला ताणते आणि पाठीचा कणा मजबूत करते.",
    },
    "vajrasana": {
      name: "Vajrasana",
      englishName: "थंडरबोल्ट पोझ",
      description: "पचनास मदत करण्यासाठी जेवणानंतर गुडघे टेकण्याची शिफारस केली जाते.",
    },
    "shavasana": {
      name: "Shavasana",
      englishName: "मृतदेहाची पोज",
      description: "सत्राच्या शेवटी पूर्ण विश्रांतीची मुद्रा.",
    },
    "setubandhasana": {
      name: "Setu Bandhasana",
      englishName: "ब्रिज पोझ",
      description: "थायरॉईडला उत्तेजित करणारा टवटवीत बॅकबेंड.",
    },
    "paschimottanasana": {
      name: "Paschimottanasana",
      englishName: "बसलेले फॉरवर्ड बेंड",
      description: "संपूर्ण पाठीमागे पसरलेला खोल पुढचा पट.",
    },
    "trikonasana": {
      name: "Trikonasana",
      englishName: "त्रिकोणी मुद्रा",
      description: "संपूर्ण शरीर ताणलेली आणि टोन करणारी उभी स्थिती.",
    },
    "padmasana": {
      name: "Padmasana",
      englishName: "कमळाची पोझ",
      description: "ध्यानासाठी क्लासिक ध्यानधारणा.",
    },
    "sukhasana": {
      name: "Sukhasana",
      englishName: "सहज पोझ",
      description: "ध्यान आणि श्वासोच्छवासासाठी आरामदायी आसनस्थ आसन.",
    },
    "suryanamaskar": {
      name: "Surya Namaskar",
      englishName: "सूर्य नमस्कार",
      description: "12 पोझचा क्रम प्रवाही व्यायाम म्हणून सादर केला जातो.",
    },
  },
};

export const pranayamaTranslations: Record<string, Record<string, PranayamaTranslation>> = {
  hi: {
    "anulomvilom": {
      name: "Anulom Vilom",
      technique: "वैकल्पिक नासिका श्वास",
    },
    "bhramari": {
      name: "Bhramari",
      technique: "मधुमक्खी साँस लेना",
    },
    "kapalbhati": {
      name: "Kapalbhati",
      technique: "खोपड़ी चमकती सांस",
    },
    "ujjayi": {
      name: "Ujjayi",
      technique: "महासागर की सांस",
    },
    "sheetali": {
      name: "Sheetali",
      technique: "ठंडी साँस",
    },
    "nadishodhana": {
      name: "Nadi Shodhana",
      technique: "श्वास को शुद्ध करने वाला चैनल",
    },
    "deepbreathing": {
      name: "Deep Breathing",
      technique: "डायाफ्रामिक श्वास",
    },
  },
  mr: {
    "anulomvilom": {
      name: "Anulom Vilom",
      technique: "पर्यायी नाकपुडी श्वास",
    },
    "bhramari": {
      name: "Bhramari",
      technique: "मधमाशी श्वास",
    },
    "kapalbhati": {
      name: "Kapalbhati",
      technique: "कवटी चमकणारा श्वास",
    },
    "ujjayi": {
      name: "Ujjayi",
      technique: "महासागर श्वास",
    },
    "sheetali": {
      name: "Sheetali",
      technique: "थंड श्वास",
    },
    "nadishodhana": {
      name: "Nadi Shodhana",
      technique: "चॅनेल शुद्ध श्वास",
    },
    "deepbreathing": {
      name: "Deep Breathing",
      technique: "डायाफ्रामॅटिक श्वास",
    },
  },
};

export const articleTranslations: Record<string, Record<string, ArticleTranslation>> = {
  hi: {},
  mr: {},
};
