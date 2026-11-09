// All the words on the Vero Residence page, in English and Arabic, side by side so they are easy to
// compare and correct.
//
// English: from the original landing page (the Electrical works lines follow the Arabic spec).
// Arabic:  the specification lines are the owner's own Arabic text (spelling and spacing tidied, digits
//          written 0-9). Everything marked "translated" was written by Claude and should be read by a
//          native speaker before the page goes public: the short taglines, the intro under each
//          category, the hero and contact wording, and the heading of "Solar & connections".

export const ui = {
  en: {
    switchLabel: "العربية",
    switchAria: "Switch to Arabic",
    contactShort: "Get in touch",
    kicker: "More than a home",
    subtitle: "Quality living, thoughtfully built.",
    description: "A modern residential development in Lebanon, where timeless architecture meets everyday comfort.",
    explore: "Explore the residence",
    factsTitle: "At a glance",
    facts: [
      { value: "125–165 m²", label: "Apartment sizes" },
      { value: "2", label: "Elevators" },
      { value: "1", label: "Parking space per apartment" },
    ],
    sectionEyebrow: "Discover the details",
    sectionTitle: ["A considered", "specification."],
    sectionText: "Choose a category to see what makes Vero Residence feel complete.",
    contactEyebrow: "Ready to look closer?",
    contactTitle: ["Let’s find your", "place at Vero."],
    footerLeft: "© 2026 Vero Residence",
    footerRight: "Lebanon · Built for generations",
  },
  ar: {
    // translated
    switchLabel: "English",
    switchAria: "التبديل إلى الإنجليزية",
    contactShort: "تواصل معنا",
    kicker: "أكثر من منزل",
    subtitle: "عيش راقٍ، وبناء مدروس.",
    description: "مشروع سكني حديث في لبنان، حيث تلتقي العمارة الخالدة براحة الحياة اليومية.",
    explore: "استكشف المشروع",
    factsTitle: "نظرة سريعة",
    facts: [
      { value: "125–165 م²", label: "مساحات الشقق" },
      { value: "2", label: "مصعدان" },
      { value: "1", label: "موقف سيارة لكل شقة" },
    ],
    sectionEyebrow: "اكتشف التفاصيل",
    sectionTitle: ["مواصفات", "مدروسة."],
    sectionText: "اختر فئة لتعرف ما الذي يجعل المشروع متكاملًا.",
    contactEyebrow: "هل أنت مستعد لإلقاء نظرة أقرب؟",
    contactTitle: ["لنجد مكانك", "في Vero."],
    footerLeft: "© 2026 Vero Residence",
    footerRight: "لبنان · بُني لأجيال",
  },
};

export const categories = [
  {
    id: "apartments",
    en: {
      label: "Apartment sizes",
      tagline: "Living plans",
      intro: "Thoughtful layouts designed around light, privacy, and everyday ease.",
      stats: [
        { value: "165 m²", label: "3 bedrooms · 3 bathrooms · 3 balconies" },
        { value: "135 m²", label: "2 bedrooms · 2 bathrooms · 3 balconies" },
        { value: "125 m²", label: "2 bedrooms · 2 bathrooms · 3 balconies" },
      ],
      items: ["Each apartment includes a living room and kitchen.", "2 elevators serve the residence."],
    },
    ar: {
      label: "مساحات الشقق",
      tagline: "مخططات السكن",
      intro: "تصاميم مدروسة تراعي الضوء والخصوصية وراحة الحياة اليومية.",
      stats: [
        { value: "165 م²", label: "3 غرف نوم · 3 حمامات · 3 برندا" },
        { value: "135 م²", label: "غرفتا نوم · حمامان · 3 برندا" },
        { value: "125 م²", label: "غرفتا نوم · حمامان · 3 برندا" },
      ],
      items: ["كل شقة تضم صالونًا ومطبخًا.", "عدد المصاعد: 2."],
    },
  },
  {
    id: "construction",
    en: {
      label: "Construction",
      tagline: "Built to last",
      intro: "A strong structural foundation shaped by experienced local construction.",
      items: [
        "350-grade (compressive strength) concrete.",
        "Constructed by Darwish & Haddad.",
        "Earthquake-resistant design using post-tensioning.",
      ],
    },
    ar: {
      label: "مواصفات البناء",
      tagline: "مبنيّ ليدوم",
      intro: "أساس إنشائي متين بتنفيذ شركة ذات خبرة محلية.",
      items: ["باطون ضغط 350", "تنفيذ شركة درويش وحداد", "البناء مقاوم للزلازل (post-tensioning)"],
    },
  },
  {
    id: "walls",
    en: {
      label: "Wall construction",
      tagline: "Layered comfort",
      intro: "Independent stone layers create a considered, durable envelope.",
      items: ["Exterior stone: 12 cm.", "5 cm air gap.", "Interior stone: 15 cm.", "Two separate, independent layers."],
    },
    ar: {
      label: "أعمال التقطيع",
      tagline: "راحة بطبقات",
      intro: "طبقات حجرية مستقلة تشكّل غلافًا متينًا ومدروسًا.",
      items: ["حجر خارجي 12 سنتم", "فراغ 5 سنتم", "حجر داخلي 15 سنتم", "عرقة عدد 2 منفصلين"],
    },
  },
  {
    id: "cladding",
    en: {
      label: "Exterior cladding",
      tagline: "Natural character",
      intro: "The building is finished with a solid natural stone selected for its enduring character.",
      items: ["Solid, natural Tebnine stone.", "Treated for moisture resistance."],
    },
    ar: {
      label: "تلبيس خارجي",
      tagline: "طابع طبيعي",
      intro: "واجهة المبنى مكسوّة بحجر طبيعي صلب اختير لجماله الدائم.",
      items: ["صخر طبيعي صلب تبنيني", "معزول من الرطوبة"],
    },
  },
  {
    id: "plumbing",
    en: {
      label: "Plumbing & sanitary",
      tagline: "Everyday details",
      intro: "Reliable systems and high-quality fixtures bring comfort into the daily routine.",
      items: [
        "Miatherm PPR piping with a 50-year warranty.",
        "Drainage and gutter pipes manufactured by Haikal.",
        "High-quality ceramic washbasins.",
        "Glass shower enclosures.",
        "Porcelain toilet fixtures.",
        "Hot water tank for each apartment.",
      ],
    },
    ar: {
      label: "أعمال الصحية",
      tagline: "تفاصيل يومية",
      intro: "تمديدات موثوقة وتجهيزات عالية الجودة تضفي الراحة على الحياة اليومية.",
      items: [
        "قساطل PPR ماركة Miatherm، كفالة 50 سنة",
        "قساطل مجرور ومزاريب إنتاج شركة هيكل",
        "مغاسل سيراميك ذات جودة عالية",
        "بكادوش زجاج",
        "كرسي حمام صيني",
        "جرة ماء ساخنة لكل شقة",
      ],
    },
  },
  {
    id: "electrical",
    en: {
      label: "Electrical works",
      tagline: "Connected living",
      intro: "A dependable electrical specification with practical comfort built in.",
      items: [
        "Electrical wiring and cables by Lebanon Cables (Kabalat Lubnan).",
        "High-quality switches, with a 10-year warranty.",
        "Sensor-operated lighting for common areas.",
      ],
    },
    ar: {
      label: "أعمال الكهرباء",
      tagline: "حياة متصلة",
      intro: "مواصفات كهربائية موثوقة مع تفاصيل عملية للراحة.",
      items: [
        "الأسلاك الكهربائية: كبلات لبنان",
        "المفاتيح ذات جودة عالية وكفالة 10 سنين",
        "لمبات الأقسام المشتركة سنسر",
      ],
    },
  },
  {
    id: "security",
    en: {
      label: "Access & security",
      tagline: "Peace of mind",
      intro: "Simple, considered access control for the people and spaces that matter.",
      items: ["Intercom with an external gate monitor.", "External gate monitor is electrically powered."],
    },
    ar: {
      label: "نظام المراقبة والتحكم في الدخول",
      tagline: "راحة البال",
      intro: "نظام دخول بسيط ومدروس للأشخاص والأماكن التي تهمّك.",
      items: ["انترفون + شاشة للبوابة الخارجية", "شاشة البوابة الخارجية تعمل على الكهرباء"],
    },
  },
  {
    id: "infrastructure",
    en: {
      label: "Solar & connections",
      tagline: "Ready for tomorrow",
      intro: "Infrastructure is prepared for a more independent, connected home.",
      items: ["Solar power infrastructure in each apartment.", "Pre-wiring for satellite and internet."],
    },
    ar: {
      // The heading is translated: the Arabic text sent has no heading for these two lines.
      label: "الطاقة الشمسية والاتصالات",
      tagline: "جاهز للغد",
      intro: "بنية تحتية جاهزة لمنزل أكثر استقلالية واتصالًا.",
      items: ["تجهيزات طاقة شمسية في كل شقة", "تجهيز كابل ستاليت + انترنت"],
    },
  },
  {
    id: "woodwork",
    en: {
      label: "Woodwork",
      tagline: "Your finish",
      intro: "Warm, adaptable woodwork that leaves room for personal preference.",
      items: [
        "Door frames made of Swedish pine.",
        "Doors finished with veneer, customizable to client preference.",
        "Paint or furniture-grade lacquer finish, customizable to client preference.",
      ],
    },
    ar: {
      label: "الأعمال الخشبية",
      tagline: "بلمستك",
      intro: "أعمال خشبية دافئة قابلة للتخصيص بحسب ذوقك.",
      items: ["صناديق الأبواب سويد زهرات", "الأبواب قشرة حسب طلب الزبون", "الدهان أو رش موبيليا حسب طلب الزبون"],
    },
  },
  {
    id: "interiors",
    en: {
      label: "Interior finishes",
      tagline: "Underfoot & around",
      intro: "A calm material palette carries through the rooms with clean continuity.",
      items: [
        "Spanish ceramic floor tiles, 60 × 120 cm.",
        "Full-height wall tiling in bathrooms.",
        "Kitchen wall tiling above the countertop / sink area only.",
      ],
    },
    ar: {
      label: "الأعمال الداخلية",
      tagline: "تحت القدم وحولها",
      intro: "لوحة مواد هادئة تمتد عبر الغرف باستمرارية أنيقة.",
      items: ["بلاط سيراميك إسباني 60 × 120", "بلاط حيطان حمام كامل", "بلاط مطابخ فقط فوق المجلى"],
    },
  },
  {
    id: "painting",
    en: {
      label: "Painting",
      tagline: "A quiet palette",
      intro: "A durable, refined finish that lets the architecture breathe.",
      items: ["Dutch Boy semi-rubberized paint."],
    },
    ar: {
      label: "أعمال الدهان",
      tagline: "ألوان هادئة",
      intro: "طلاء متين وأنيق يترك للعمارة مساحتها.",
      items: ["دهان نص كاوتشوك Dutch Boy"],
    },
  },
  {
    id: "aluminum",
    en: {
      label: "Aluminum",
      tagline: "Light & air",
      intro: "Openings are specified for daylight, ventilation, and practical ease.",
      items: ["2000 profile series.", "Tinted glass.", "Insect screens.", "Folda hardware."],
    },
    ar: {
      label: "الألمينيوم",
      tagline: "ضوء وهواء",
      intro: "فتحات مدروسة لإدخال الضوء والتهوية وسهولة الاستعمال.",
      items: ["بروفيل 2000", "زجاج ملون", "مناخل", "اكسسوار Folda"],
    },
  },
  {
    id: "kitchens",
    en: {
      label: "Kitchens",
      tagline: "Made for daily life",
      intro: "A generous, practical kitchen specification with a durable work surface.",
      items: ["Moisture-resistant Lamica cabinetry.", "6 meters of upper and 6 meters of lower units.", "Granite countertop."],
    },
    ar: {
      label: "المطابخ",
      tagline: "صُنع للحياة اليومية",
      intro: "مطبخ واسع وعملي بسطح عمل متين.",
      items: ["خشب لاميكا ضد الرطوبة", "6 م فوق و6 م تحت", "مجلى غرانيت"],
    },
  },
  {
    id: "amenities",
    en: {
      label: "Common amenities",
      tagline: "Shared advantages",
      intro: "Useful shared infrastructure that makes the residence work beautifully day to day.",
      items: ["One parking space per apartment.", "On-site water storage well (cistern).", "Permission to install solar panels on the roof."],
    },
    ar: {
      label: "المنافع المشتركة",
      tagline: "مزايا مشتركة",
      intro: "منافع مشتركة مفيدة تجعل العيش في المبنى سهلًا كل يوم.",
      items: ["موقف سيارة لكل شقة", "يوجد بئر ماء جمع في البناية", "يسمح بوضع ألواح طاقة على سطح الروف"],
    },
  },
];
