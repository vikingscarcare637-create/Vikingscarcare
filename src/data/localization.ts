import type { Language } from "../context/contextStore";
import { blogArticles, faqs, galleryItems, services, testimonials, type BlogArticle, type Service } from "./site";

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

const isEnglish = (language: Language) => language === "en";

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
