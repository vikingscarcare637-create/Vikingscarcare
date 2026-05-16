import type { Language } from "../context/contextStore";
import { blogArticles, faqs, galleryItems, images, services, testimonials, type BlogArticle, type Service } from "./site";

export type LocalizedService = Service & {
  displayTitle: string;
  displayDescription: string;
  displayCategory: string;
  displayPriceFrom: string;
};

export type LocalizedGalleryItem = (typeof galleryItems)[number] & {
  displayCategory: string;
  displayTitle: string;
};

type ServiceCategoryPageCopy = {
  title: string;
  shortTitle: string;
  menuDescription: string;
  eyebrow: string;
  description: string;
  introTitle: string;
  introText: string;
  seoTitle: string;
  seoDescription: string;
  ctaTitle: string;
  ctaText: string;
};

export type ServiceCategoryPage = {
  slug: string;
  href: string;
  categories: Service["category"][];
  image: string;
  sv: ServiceCategoryPageCopy;
  en: ServiceCategoryPageCopy;
};

export type LocalizedServiceCategoryPage = Omit<ServiceCategoryPage, "sv" | "en"> &
  ServiceCategoryPageCopy & {
    serviceCount: number;
  };

const isEnglish = (language: Language) => language === "en";

export const serviceCategoryPages: ServiceCategoryPage[] = [
  {
    slug: "tvatt",
    href: "/tjanster/tvatt",
    categories: ["Tvätt"],
    image: images.wash,
    sv: {
      title: "Tvätt",
      shortTitle: "Tvätt",
      menuDescription: "Handtvätt, invändig tvätt och komplett in- och utvändig tvätt.",
      eyebrow: "Tjänster / Tvätt",
      description:
        "Skonsam premiumtvätt för bilägare i Karlskrona som vill ha ren lack, fräsch kupé och en trygg grund för fortsatt bilvård.",
      introTitle: "Biltvätt Karlskrona med kontrollerad metod",
      introText:
        "Vi använder säkra tvättsteg, premiumprodukter och mikrofiber för att minska risken för tvättrepor och ge bilen en ren, exklusiv känsla.",
      seoTitle: "Biltvätt Karlskrona | Handtvätt & Invändig Tvätt | Vikings Car Care",
      seoDescription:
        "Boka premium biltvätt i Karlskrona hos Vikings Car Care. Handtvätt, invändig tvätt och in- och utvändig tvätt med garanti.",
      ctaTitle: "Boka premium biltvätt i Karlskrona",
      ctaText: "Välj tvättnivå så hjälper vi dig få bilen ren, trygg och redo för nästa steg."
    },
    en: {
      title: "Wash",
      shortTitle: "Wash",
      menuDescription: "Hand wash, interior cleaning and complete inside-out wash.",
      eyebrow: "Services / Wash",
      description:
        "Gentle premium washing for car owners in Karlskrona who want clean paint, a fresh cabin and a safe foundation for continued car care.",
      introTitle: "Car wash in Karlskrona with controlled methods",
      introText:
        "We use safe wash steps, premium products and microfiber tools to reduce wash marks and give the car a clean, refined feeling.",
      seoTitle: "Car Wash Karlskrona | Hand Wash & Interior Cleaning | Vikings Car Care",
      seoDescription:
        "Book a premium car wash in Karlskrona at Vikings Car Care. Hand wash, interior cleaning and complete inside-out wash with guarantee.",
      ctaTitle: "Book premium car wash in Karlskrona",
      ctaText: "Choose your wash level and we will help make the car clean, safe and ready for the next step."
    }
  },
  {
    slug: "rekond",
    href: "/tjanster/rekond",
    categories: ["Rekond"],
    image: images.workshop,
    sv: {
      title: "Rekond",
      shortTitle: "Rekond",
      menuDescription: "Lilla rekond, stor rekond och textilrengöring för kupén.",
      eyebrow: "Tjänster / Rekond",
      description:
        "Professionell bilrekond i Karlskrona för bilar som behöver kännas rena, välvårdade och premium igen.",
      introTitle: "Helrekond Karlskrona för hela bilen",
      introText:
        "Rekond kombinerar rengöring, detaljarbete och finish för att lyfta både exteriör och interiör. Vi anpassar nivån efter bilens skick och dina mål.",
      seoTitle: "Helrekond Karlskrona | Bilrekond & Rekond För Bil | Vikings Car Care",
      seoDescription:
        "Boka helrekond och bilrekond i Karlskrona. Lilla rekond, stor rekond och tyg kemtvätt med premiumprodukter och garanti.",
      ctaTitle: "Boka rekond för bilen",
      ctaText: "Få en tydlig rekommendation för lilla rekond, stor rekond eller interiörarbete."
    },
    en: {
      title: "Detailing",
      shortTitle: "Detailing",
      menuDescription: "Light detail, full detail and deep textile cleaning for the cabin.",
      eyebrow: "Services / Detailing",
      description:
        "Professional car detailing in Karlskrona for cars that need to feel clean, cared for and premium again.",
      introTitle: "Full detailing in Karlskrona for the entire car",
      introText:
        "Detailing combines cleaning, precision work and finish to lift both exterior and interior. We tailor the level to the car's condition and your goals.",
      seoTitle: "Full Detail Karlskrona | Car Detailing & Interior Cleaning | Vikings Car Care",
      seoDescription:
        "Book full detailing and car detailing in Karlskrona. Light detail, full detail and fabric deep cleaning with premium products and guarantee.",
      ctaTitle: "Book car detailing",
      ctaText: "Get a clear recommendation for light detail, full detail or interior work."
    }
  },
  {
    slug: "polering",
    href: "/tjanster/polering",
    categories: ["Polering"],
    image: images.polish,
    sv: {
      title: "Polering",
      shortTitle: "Polering",
      menuDescription: "Steg 1 och steg 3 polering för djupare glans och lackkorrigering.",
      eyebrow: "Tjänster / Polering",
      description:
        "Bilpolering i Karlskrona för bättre glans, färgdjup och en mer exklusiv lackfinish.",
      introTitle: "Bilpolering Karlskrona med synligt resultat",
      introText:
        "Från glanshöjande steg 1 till avancerad steg 3 polering arbetar vi metodiskt för att minska defekter och skapa klarare reflektioner.",
      seoTitle: "Bilpolering Karlskrona | Steg 1 & Steg 3 Polering | Vikings Car Care",
      seoDescription:
        "Professionell bilpolering i Karlskrona. Boka steg 1 polering eller steg 3 polering för glans, lackkorrigering och premiumfinish.",
      ctaTitle: "Boka professionell bilpolering",
      ctaText: "Vi hjälper dig välja rätt poleringsnivå efter lackens skick och önskat resultat."
    },
    en: {
      title: "Polishing",
      shortTitle: "Polishing",
      menuDescription: "Stage 1 and stage 3 polishing for deeper gloss and paint correction.",
      eyebrow: "Services / Polishing",
      description:
        "Car polishing in Karlskrona for better gloss, color depth and a more exclusive paint finish.",
      introTitle: "Car polishing in Karlskrona with visible results",
      introText:
        "From gloss-enhancing stage 1 to advanced stage 3 polishing, we work methodically to reduce defects and create clearer reflections.",
      seoTitle: "Car Polishing Karlskrona | Stage 1 & Stage 3 Polishing | Vikings Car Care",
      seoDescription:
        "Professional car polishing in Karlskrona. Book stage 1 polishing or stage 3 polishing for gloss, correction and premium finish.",
      ctaTitle: "Book professional car polishing",
      ctaText: "We help you choose the right polishing level for the paint condition and desired result."
    }
  },
  {
    slug: "skydd-behandlingar",
    href: "/tjanster/skydd-behandlingar",
    categories: ["Skydd", "Special"],
    image: images.coating,
    sv: {
      title: "Skydd & behandlingar",
      shortTitle: "Skydd",
      menuDescription: "Keramisk lackförsegling, vax, glas, fälgar, plast och specialbehandlingar.",
      eyebrow: "Tjänster / Skydd",
      description:
        "Lackskydd och specialbehandlingar i Karlskrona för bilar som ska stå emot salt, väder och vardagligt slitage.",
      introTitle: "Keramisk lackförsegling Karlskrona och smarta behandlingar",
      introText:
        "Här samlas våra skyddande behandlingar och specialmoment: keramisk coating, vax, glas, fälgar, plast, flygrost, asfalt, lyktor och reparation av repor.",
      seoTitle: "Keramisk Lackförsegling Karlskrona | Lackskydd & Behandlingar",
      seoDescription:
        "Boka keramisk lackförsegling, lackskydd och specialbehandlingar i Karlskrona hos Vikings Car Care. Garanti på alla tjänster.",
      ctaTitle: "Boka lackskydd eller behandling",
      ctaText: "Skydda bilen med rätt behandling för lack, glas, fälgar, plast och detaljer."
    },
    en: {
      title: "Protection & treatments",
      shortTitle: "Protection",
      menuDescription: "Ceramic coating, wax, glass, wheels, trim and specialist treatments.",
      eyebrow: "Services / Protection",
      description:
        "Paint protection and specialist treatments in Karlskrona for cars that need to resist salt, weather and everyday wear.",
      introTitle: "Ceramic coating in Karlskrona and smart treatments",
      introText:
        "This category gathers our protective treatments and specialist work: ceramic coating, wax, glass, wheels, trim, fallout, tar, headlights and scratch repair.",
      seoTitle: "Ceramic Coating Karlskrona | Paint Protection & Treatments",
      seoDescription:
        "Book ceramic coating, paint protection and specialist treatments in Karlskrona at Vikings Car Care. Guarantee on all services.",
      ctaTitle: "Book paint protection or treatment",
      ctaText: "Protect the car with the right treatment for paint, glass, wheels, trim and details."
    }
  }
];

const categoryTranslations: Record<string, string> = {
  Alla: "All",
  Tvätt: "Wash",
  Rekond: "Detailing",
  Skydd: "Protection",
  Polering: "Polishing",
  Special: "Special",
  "Före/Efter": "Before/After",
  "Keramisk coating": "Ceramic coating",
  Interiör: "Interior",
  Process: "Process",
  Fälgar: "Wheels",
  Lyx: "Luxury",
  Detaljer: "Details"
};

const serviceTranslations: Record<string, { title: string; description: string; category?: string }> = {
  "handtvatt-utvandigt": {
    title: "Exterior hand wash",
    description:
      "Gentle exterior hand wash with premium shampoo, microfiber tools and a safe rinse process that preserves paint gloss.",
    category: "Wash"
  },
  "invandig-tvatt": {
    title: "Interior cleaning",
    description:
      "Careful vacuuming, wipe-down, panel cleaning and a fresh cabin finish for a cleaner, more comfortable interior.",
    category: "Wash"
  },
  "in-och-utvandig-tvatt": {
    title: "Interior and exterior wash",
    description:
      "Complete cleaning for paint and cabin, ideal when the car needs to feel new again without a full detail.",
    category: "Wash"
  },
  asfaltbehandling: {
    title: "Tar removal treatment",
    description:
      "Effective removal of asphalt, tar and road film from paint and lower panels before protection or detailing.",
    category: "Special"
  },
  flygrostborttagning: {
    title: "Iron fallout removal",
    description:
      "Chemical decontamination that dissolves iron particles before polishing, wax or ceramic coating.",
    category: "Special"
  },
  "lilla-rekond": {
    title: "Light detail",
    description:
      "A smart refresh with wash, interior cleaning and finish work for a cleaner everyday car.",
    category: "Detailing"
  },
  "stor-rekond": {
    title: "Full detail",
    description:
      "Complete exterior and interior detailing with deep cleaning, paint care and a premium delivery feeling.",
    category: "Detailing"
  },
  motortvatt: {
    title: "Engine bay wash",
    description:
      "Careful engine bay cleaning with controlled methods, protected components and a clean professional finish.",
    category: "Special"
  },
  lyktbehandling: {
    title: "Headlight restoration",
    description:
      "Restores cloudy headlights for better light output, a fresher look and improved road safety.",
    category: "Special"
  },
  glasbehandling: {
    title: "Glass treatment",
    description:
      "Hydrophobic glass treatment that repels water, salt and dirt for clearer visibility in coastal weather.",
    category: "Protection"
  },
  falgbebehandling: {
    title: "Wheel treatment",
    description:
      "Cleaning and protection for wheels, making brake dust and road grime easier to rinse away.",
    category: "Protection"
  },
  plastbehandling: {
    title: "Plastic trim treatment",
    description:
      "Revives and protects exterior plastic trim against UV, fading and everyday wear.",
    category: "Protection"
  },
  "tyg-kemtvatt": {
    title: "Fabric deep cleaning",
    description:
      "Deep textile cleaning for seats, carpets and fabric details with a fresh final result.",
    category: "Detailing"
  },
  laderbehandling: {
    title: "Leather treatment",
    description:
      "Cleaning and conditioning for leather that helps preserve softness, shine and a premium feel.",
    category: "Protection"
  },
  inredningsbehandling: {
    title: "Interior protection",
    description:
      "Protective cabin treatment that helps resist spills, dirt and everyday use.",
    category: "Protection"
  },
  "steg-1-polering": {
    title: "Stage 1 polishing",
    description:
      "Gloss-enhancing polishing that lifts the paint and reduces lighter wash marks.",
    category: "Polishing"
  },
  "steg-3-polering": {
    title: "Stage 3 polishing",
    description:
      "Advanced multi-stage polishing for maximum defect correction, depth and premium finish.",
    category: "Polishing"
  },
  vaxbehandling: {
    title: "Wax treatment",
    description:
      "Classic paint protection with warm gloss, deep reflections and a shorter protection period.",
    category: "Protection"
  },
  "keramisk-lackforsegling": {
    title: "Ceramic paint protection",
    description:
      "Long-lasting ceramic paint protection with extreme gloss, easier maintenance and strong protection.",
    category: "Protection"
  },
  "reparation-av-repor": {
    title: "Scratch repair",
    description:
      "Assessment and correction of smaller scratches with professional methods to restore the paint impression.",
    category: "Special"
  }
};

const galleryTranslations: Record<string, { title: string; category?: string }> = {
  "Djup lackkorrigering": { title: "Deep paint correction", category: "Before/After" },
  "Spegelblank keramisk lackförsegling": { title: "Mirror-gloss ceramic protection", category: "Ceramic coating" },
  "Invändig rekond med premiumfinish": { title: "Interior detail with premium finish", category: "Interior" },
  "Handtvätt och dekontaminering": { title: "Hand wash and decontamination", category: "Process" },
  "Steg 3 polering": { title: "Stage 3 polishing", category: "Polishing" },
  "Fälgbehandling och skydd": { title: "Wheel treatment and protection", category: "Wheels" },
  "Leveransklar premiumbil": { title: "Delivery-ready premium car", category: "Luxury" },
  "Detaljarbete i verkstad": { title: "Detail work in the workshop", category: "Details" }
};

export const uiText = {
  sv: {
    book: "Boka Tid",
    bookDetail: "Boka helrekond",
    bookCoating: "Boka coating",
    callNow: "Ring Nu",
    readGuide: "Läs guiden",
    allArticles: "Alla artiklar",
    allServices: "Alla tjänster",
    warranty: "Vi lämnar alltid garanti på alla våra tjänster.",
    footerDescription: "Premium bilvård, biltvätt, helrekond, bilpolering och keramisk lackförsegling i Karlskrona.",
    footerPages: "Sidor",
    footerBlog: "Blogg",
    footerPopular: "Populära tjänster",
    footerContact: "Kontakt",
    footerRights: "Alla rättigheter förbehållna.",
    footerKeywords: "Bilvård Karlskrona | Biltvätt Karlskrona | Keramisk lackförsegling Karlskrona",
    cookie:
      "Vi använder nödvändiga cookies och lokal lagring för tema, språk och bokningsupplevelse. Inga uppgifter säljs vidare.",
    accept: "Acceptera",
    before: "Före",
    after: "Efter",
    compareBeforeAfter: "Jämför före och efter",
    defaultCtaTitle: "Redo för en bil som känns ny igen?",
    defaultCtaText: "Boka premium bilvård i Karlskrona med trygg garanti och över 20 års erfarenhet.",
    ctaEyebrow: "Vikings Car Care"
  },
  en: {
    book: "Book Now",
    bookDetail: "Book full detail",
    bookCoating: "Book coating",
    callNow: "Call Now",
    readGuide: "Read guide",
    allArticles: "All articles",
    allServices: "All services",
    warranty: "We always provide a guarantee on all our services.",
    footerDescription: "Premium car care, car wash, full detailing, polishing and ceramic protection in Karlskrona.",
    footerPages: "Pages",
    footerBlog: "Blog",
    footerPopular: "Popular services",
    footerContact: "Contact",
    footerRights: "All rights reserved.",
    footerKeywords: "Car care Karlskrona | Car wash Karlskrona | Ceramic coating Karlskrona",
    cookie:
      "We use necessary cookies and local storage for theme, language and the booking experience. No data is sold.",
    accept: "Accept",
    before: "Before",
    after: "After",
    compareBeforeAfter: "Compare before and after",
    defaultCtaTitle: "Ready for a car that feels new again?",
    defaultCtaText: "Book premium car care in Karlskrona with a trusted guarantee and over 20 years of experience.",
    ctaEyebrow: "Vikings Car Care"
  }
} as const;

export const categoryOptions = (language: Language) =>
  ["Alla", "Tvätt", "Rekond", "Polering", "Skydd", "Special"].map((value) => ({
    value,
    label: isEnglish(language) ? categoryTranslations[value] : value
  }));

export const getServiceCategoryPages = (language: Language): LocalizedServiceCategoryPage[] =>
  serviceCategoryPages.map((category) => ({
    slug: category.slug,
    href: category.href,
    categories: category.categories,
    image: category.image,
    ...(isEnglish(language) ? category.en : category.sv),
    serviceCount: services.filter((service) => category.categories.includes(service.category)).length
  }));

export const getServiceCategoryPageBySlug = (slug: string | undefined, language: Language) =>
  getServiceCategoryPages(language).find((category) => category.slug === slug);

export const localizeCategory = (category: string, language: Language) =>
  isEnglish(language) ? categoryTranslations[category] ?? category : category;

export const formatPrice = (price: string, language: Language) => {
  if (!isEnglish(language)) return price;
  return price === "Offert" ? "Quote" : price.replace("Fr.", "From").replace("kr", "SEK");
};

export const localizeService = (service: Service, language: Language): LocalizedService => {
  const translation = isEnglish(language) ? serviceTranslations[service.slug] : undefined;

  return {
    ...service,
    displayTitle: translation?.title ?? service.title,
    displayDescription: translation?.description ?? service.description,
    displayCategory: translation?.category ?? localizeCategory(service.category, language),
    displayPriceFrom: formatPrice(service.priceFrom, language)
  };
};

export const getLocalizedServices = (language: Language) => services.map((service) => localizeService(service, language));

export const getServiceDisplayTitle = (title: string, language: Language) => {
  const service = services.find((item) => item.title === title || serviceTranslations[item.slug]?.title === title);
  return service ? localizeService(service, language).displayTitle : title;
};

export const getServicePriceText = (title: string, language: Language) => {
  const service = services.find((item) => item.title === title || serviceTranslations[item.slug]?.title === title);
  return service ? localizeService(service, language).displayPriceFrom : language === "en" ? "Quote" : "Offert";
};

export const getCanonicalServiceTitle = (title: string) => {
  const service = services.find((item) => item.title === title || serviceTranslations[item.slug]?.title === title);
  return service?.title ?? title;
};

export const getLocalizedTestimonials = (language: Language) => {
  if (!isEnglish(language)) return testimonials;

  return [
    {
      name: "Anna L.",
      text: "The car looked better than when I bought it. Serious service, clear guarantee and fantastic gloss.",
      rating: 5
    },
    {
      name: "Johan M.",
      text: "I booked ceramic paint protection and the result really lasts. Warmly recommended in Karlskrona.",
      rating: 5
    },
    {
      name: "Mikael S.",
      text: "Premium feeling from first contact to delivery. They cared for the car as if it were their own.",
      rating: 5
    }
  ];
};

export const getLocalizedFaqs = (language: Language) => {
  if (!isEnglish(language)) return faqs;

  return [
    {
      question: "How long does a full detail take?",
      answer:
        "A full detail usually takes from half a day to a full day depending on vehicle size, condition and selected add-ons. We always confirm timing when booking."
    },
    {
      question: "Do you provide a guarantee on the services?",
      answer:
        "Yes. Vikings Car Care always provides a guarantee on all services, with a clear explanation of what is included before the work starts."
    },
    {
      question: "Is ceramic paint protection worth it in Karlskrona?",
      answer:
        "Yes, especially with salt, coastal climate and changing weather. Ceramic coating makes the paint easier to wash and helps preserve gloss and protection longer."
    },
    {
      question: "Can I book by phone or WhatsApp?",
      answer:
        "Absolutely. You can book through the form, call 0455 61 61 69 or use the WhatsApp button for quick contact."
    }
  ];
};

export const getLocalizedGalleryItems = (language: Language): LocalizedGalleryItem[] =>
  galleryItems.map((item) => {
    const translation = isEnglish(language) ? galleryTranslations[item.title] : undefined;
    return {
      ...item,
      displayCategory: translation?.category ?? localizeCategory(item.category, language),
      displayTitle: translation?.title ?? item.title
    };
  });

const blogEnglish: Record<string, Omit<BlogArticle, "slug" | "image" | "date">> = {
  "keramisk-lackforsegling-karlskrona": {
    title: "Why is ceramic paint protection important for your car?",
    excerpt:
      "Ceramic paint protection gives long-lasting protection, deep gloss and easier maintenance for cars driven all year in Karlskrona.",
    readTime: "7 min read",
    sections: [
      {
        heading: "Ceramic protection does more than add shine",
        paragraphs: [
          "Ceramic paint protection, often called ceramic coating, creates a hard hydrophobic layer above the clear coat. It is not only about a glossier car, but about stronger resistance against salt, road dust, UV exposure, rain and everyday dirt.",
          "When the coating is applied correctly after washing, decontamination and polishing, it bonds to the paint and makes the car easier to maintain. Dirt does not grip as hard, water beads off the surface and the risk of wash marks is reduced."
        ]
      },
      {
        heading: "Why coating fits Karlskrona so well",
        paragraphs: [
          "Karlskrona has a coastal climate with moisture, wind and winter salt. That is a tough combination for paint. Professional ceramic coating helps the car resist that environment better than a simple wax and suits premium cars, family cars and company vehicles.",
          "For the best result, the paint should first be cleaned deeply and polished. That gives the protection a smooth surface to bond to, and the result becomes both better looking and more durable."
        ]
      },
      {
        heading: "Professional application makes the difference",
        paragraphs: [
          "There are consumer products that promise quick coating, but durability and finish depend heavily on preparation. At Vikings Car Care we assess paint condition, choose the right cleaning steps and recommend polishing when needed.",
          "We always provide a guarantee on all our services, giving you confidence when investing in premium car care in Karlskrona."
        ]
      }
    ],
    faq: [
      {
        question: "How long does ceramic paint protection last?",
        answer:
          "Durability depends on product, driving conditions and maintenance. With the right wash routine, ceramic protection can last significantly longer than traditional wax."
      },
      {
        question: "Does the car need polishing before coating?",
        answer:
          "Polishing is often recommended because the coating seals in the current paint condition. A polished surface gives better gloss and more even protection."
      }
    ]
  },
  "skydda-bilen-mot-salt-vinter-karlskrona": {
    title: "How to protect your car from salt and winter in Karlskrona",
    excerpt:
      "Winter salt, moisture and changing temperatures are tough on paint, wheels and interiors. Here is a professional strategy.",
    readTime: "8 min read",
    sections: [
      {
        heading: "Salt requires regular and gentle cleaning",
        paragraphs: [
          "Winter in Karlskrona often means salt, rain, slush and dirty roads. Salt binds moisture and can affect paint, wheels, wheel arches and exposed details. Regular car washing is therefore especially important during the winter season.",
          "A professional hand wash reduces the risk of scratches because the method is more controlled than a quick automatic wash. The right pre-wash, chemicals and clean wash tools make a real difference."
        ]
      },
      {
        heading: "Protect paint, glass and wheels before the season",
        paragraphs: [
          "The smartest approach is to prepare the car before the weather becomes demanding. Paint protection, glass treatment and wheel protection make it harder for salt and dirt to stick. They also make the car easier to clean during the season.",
          "For long-lasting protection, ceramic paint protection is the premium choice. For a simpler level, wax treatment gives a fine gloss and a protective layer."
        ]
      },
      {
        heading: "Do not forget the interior",
        paragraphs: [
          "Winter also means wet shoes, gravel, salt stains and moisture in the cabin. Interior cleaning, fabric deep cleaning and interior protection help keep the car fresh and preserve value over time.",
          "A clean interior does not only feel better. It can also reduce odor and wear, especially in cars used daily."
        ]
      }
    ],
    faq: [
      {
        question: "How often should I wash the car in winter?",
        answer:
          "Wash more often when roads are salted, especially if the car is parked outside or driven frequently. A gentle hand wash is best for the paint."
      },
      {
        question: "Which protection is best before winter?",
        answer:
          "Ceramic paint protection gives long-lasting protection, while wax treatment is a simpler alternative. We recommend the right level based on the car's condition and use."
      }
    ]
  },
  "biltvatt-vs-professionell-helrekond": {
    title: "The difference between a regular car wash and professional full detailing",
    excerpt:
      "A regular wash cleans the surface. Professional full detailing restores the feeling, protects the car and lifts the overall impression.",
    readTime: "9 min read",
    sections: [
      {
        heading: "A regular wash only solves part of the problem",
        paragraphs: [
          "A regular car wash is useful for maintenance, but it often does not remove deeper dirt, iron fallout, tar, ingrained interior dirt or wash marks. The car may look clean from a distance, while the paint still lacks depth and protection.",
          "Professional car care starts by understanding the condition of the vehicle. That is why full detailing differs from a standard wash in method, time and precision."
        ]
      },
      {
        heading: "Full detailing works with the entire car",
        paragraphs: [
          "Full detailing usually includes both exterior and interior cleaning, decontamination, paint care, interior details and protective finish. It is a more complete process for cars being sold, returned, prepared for a season or simply made to feel premium again.",
          "Car detailing is also an investment in resale value. A well-kept car makes a stronger impression and is more enjoyable to own every day."
        ]
      },
      {
        heading: "Polishing and protection create the premium feeling",
        paragraphs: [
          "Car polishing removes or reduces scratches, oxidation and dullness in the paint. The paint can then be protected with wax or ceramic protection. The combination of correction and protection creates the deep, mirror-like finish.",
          "At Vikings Car Care we work with premium products, a clear guarantee and more than 20 years of experience. The goal is not only for the car to be clean. It should feel right."
        ]
      }
    ],
    faq: [
      {
        question: "When should I choose full detailing?",
        answer:
          "Choose full detailing when the car is worn, being sold, has a lot of dirt or when you want a clear premium result inside and outside."
      },
      {
        question: "Can full detailing be combined with ceramic coating?",
        answer:
          "Yes. Full detailing with polishing is often the perfect preparation before ceramic paint protection."
      }
    ]
  }
};

export const getLocalizedBlogArticles = (language: Language): BlogArticle[] => {
  if (!isEnglish(language)) return blogArticles;

  return blogArticles.map((article) => ({
    ...article,
    ...blogEnglish[article.slug]
  }));
};
