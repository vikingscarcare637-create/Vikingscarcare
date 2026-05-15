import logoUrl from "../assets/vikings-logo.png";

export const baseUrl = "https://vikingscarcare.com";

export const company = {
  name: "Vikings Car Care",
  address: "Borgmästarekajen 32, 371 34 Karlskrona, Sweden",
  streetAddress: "Borgmästarekajen 32",
  postalCode: "371 34",
  locality: "Karlskrona",
  country: "SE",
  phone: "0455 61 61 69",
  phoneHref: "tel:+46455616169",
  email: "info@vikingscarcare.com",
  emailHref: "mailto:info@vikingscarcare.com",
  whatsapp: "https://wa.me/46455616169?text=Hej%20Vikings%20Car%20Care%2C%20jag%20vill%20boka%20bilv%C3%A5rd.",
  experience: "20+",
  guarantee: "Vi lämnar alltid garanti på alla våra tjänster.",
  mapUrl:
    "https://www.google.com/maps?q=Borgm%C3%A4starekajen%2032%2C%20371%2034%20Karlskrona%2C%20Sweden&output=embed",
  logo: logoUrl,
  socials: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/"
  }
};

export const keywords = [
  "Bilvård Karlskrona",
  "Biltvätt Karlskrona",
  "Helrekond Karlskrona",
  "Keramisk lackförsegling Karlskrona",
  "Bilrekond Karlskrona",
  "Bilpolering Karlskrona",
  "Rekond Karlskrona",
  "Handtvätt bil Karlskrona",
  "Ceramic coating Karlskrona",
  "Karlskrona Bilcenter",
  "Professionell bilvård Karlskrona",
  "Premium biltvätt Karlskrona",
  "Keramisk coating Karlskrona",
  "Bilvård nära mig Karlskrona",
  "Rekond för bil Karlskrona",
  "Invändig tvätt Karlskrona",
  "Utvändig tvätt Karlskrona",
  "Lackskydd Karlskrona",
  "Polering bil Karlskrona"
];

export const images = {
  hero:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=85",
  workshop:
    "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1600&q=82",
  coating:
    "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1600&q=82",
  interior:
    "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1600&q=82",
  wash:
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=82",
  polish:
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=82",
  redCar:
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=82",
  silverCar:
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=82",
  blackCar:
    "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1600&q=82",
  detailing:
    "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1600&q=82"
};

export const navItems = [
  { href: "/", sv: "Hem", en: "Home" },
  { href: "/tjanster", sv: "Tjänster", en: "Services" },
  { href: "/om-oss", sv: "Om Oss", en: "About" },
  { href: "/galleri", sv: "Galleri", en: "Gallery" },
  { href: "/blogg", sv: "Blogg", en: "Blog" },
  { href: "/kontakta-oss", sv: "Kontakta Oss", en: "Contact" }
];

export type Service = {
  title: string;
  slug: string;
  description: string;
  priceFrom: string;
  image: string;
  category: "Tvätt" | "Rekond" | "Skydd" | "Polering" | "Special";
};

export const services: Service[] = [
  {
    title: "Handtvätt utvändigt",
    slug: "handtvatt-utvandigt",
    description:
      "Skonsam manuell utvändig biltvätt med premiumschampo, mikrofiber och säker avspolning som bevarar lackens glans.",
    priceFrom: "Fr. 349 kr",
    image: images.wash,
    category: "Tvätt"
  },
  {
    title: "Invändig tvätt",
    slug: "invandig-tvatt",
    description:
      "Noggrann dammsugning, avtorkning, rengöring av paneler och fräsch finish för en ren kupé.",
    priceFrom: "Fr. 449 kr",
    image: images.interior,
    category: "Tvätt"
  },
  {
    title: "In- och utvändig tvätt",
    slug: "in-och-utvandig-tvatt",
    description:
      "Komplett tvätt för både lack och kupé, perfekt när bilen behöver kännas ny igen på kort tid.",
    priceFrom: "Fr. 749 kr",
    image: images.detailing,
    category: "Tvätt"
  },
  {
    title: "Asfaltbehandling",
    slug: "asfaltbehandling",
    description:
      "Effektiv borttagning av asfalt, tjära och vägsot från lack och nedre paneler inför skydd eller rekond.",
    priceFrom: "Fr. 399 kr",
    image: images.blackCar,
    category: "Special"
  },
  {
    title: "Flygrostborttagning",
    slug: "flygrostborttagning",
    description:
      "Kemisk dekontaminering som löser flygrost och metallpartiklar innan polering, vax eller keramisk coating.",
    priceFrom: "Fr. 499 kr",
    image: images.silverCar,
    category: "Special"
  },
  {
    title: "Lilla rekond",
    slug: "lilla-rekond",
    description:
      "En smart uppfräschning med tvätt, invändig rengöring och finish för vardagsbilen.",
    priceFrom: "Fr. 1 495 kr",
    image: images.workshop,
    category: "Rekond"
  },
  {
    title: "Stor rekond",
    slug: "stor-rekond",
    description:
      "Helrekond Karlskrona med djup rengöring, lackvård, interiördetaljer och en exklusiv leveranskänsla.",
    priceFrom: "Fr. 2 995 kr",
    image: images.hero,
    category: "Rekond"
  },
  {
    title: "Motortvätt",
    slug: "motortvatt",
    description:
      "Varsam rengöring av motorrum med kontrollerad metod, skyddade komponenter och ren professionell finish.",
    priceFrom: "Fr. 599 kr",
    image: images.detailing,
    category: "Special"
  },
  {
    title: "Lyktbehandling",
    slug: "lyktbehandling",
    description:
      "Återställer matta lyktor för bättre ljusbild, modernare utseende och förbättrad trafiksäkerhet.",
    priceFrom: "Fr. 799 kr",
    image: images.redCar,
    category: "Special"
  },
  {
    title: "Glasbehandling",
    slug: "glasbehandling",
    description:
      "Hydrofob behandling för rutor som stöter bort vatten, salt och smuts för klarare sikt i Blekingevädret.",
    priceFrom: "Fr. 699 kr",
    image: images.silverCar,
    category: "Skydd"
  },
  {
    title: "Fälgbehandling",
    slug: "falgbebehandling",
    description:
      "Rengöring och skydd av fälgar som gör bromsdamm och vägsmuts lättare att spola bort.",
    priceFrom: "Fr. 799 kr",
    image: images.blackCar,
    category: "Skydd"
  },
  {
    title: "Plastbehandling",
    slug: "plastbehandling",
    description:
      "Återupplivar och skyddar yttre plastdetaljer mot UV, blekning och vardagligt slitage.",
    priceFrom: "Fr. 599 kr",
    image: images.workshop,
    category: "Skydd"
  },
  {
    title: "Tyg kemtvätt",
    slug: "tyg-kemtvatt",
    description:
      "Djupgående textilrengöring för säten, mattor och tygdetaljer med luktfräsch slutfinish.",
    priceFrom: "Fr. 899 kr",
    image: images.interior,
    category: "Rekond"
  },
  {
    title: "Läderbehandling",
    slug: "laderbehandling",
    description:
      "Rengöring och konditionering av läder som bevarar mjukhet, lyster och exklusiv känsla.",
    priceFrom: "Fr. 899 kr",
    image: images.interior,
    category: "Skydd"
  },
  {
    title: "Inredningsbehandling",
    slug: "inredningsbehandling",
    description:
      "Skyddande behandling för kupéns ytor som hjälper mot spill, smuts och vardagligt användande.",
    priceFrom: "Fr. 995 kr",
    image: images.detailing,
    category: "Skydd"
  },
  {
    title: "Steg 1 polering",
    slug: "steg-1-polering",
    description:
      "Glanshöjande bilpolering Karlskrona som lyfter lacken och tar bort lättare tvättrepor.",
    priceFrom: "Fr. 1 995 kr",
    image: images.polish,
    category: "Polering"
  },
  {
    title: "Steg 3 polering",
    slug: "steg-3-polering",
    description:
      "Avancerad flerstegspolering för maximal defektkorrigering, djup glans och premiumfinish.",
    priceFrom: "Fr. 4 995 kr",
    image: images.redCar,
    category: "Polering"
  },
  {
    title: "Vaxbehandling",
    slug: "vaxbehandling",
    description:
      "Klassiskt lackskydd med varm glans, djup reflektion och kortare skyddsperiod.",
    priceFrom: "Fr. 995 kr",
    image: images.silverCar,
    category: "Skydd"
  },
  {
    title: "Keramisk lackförsegling",
    slug: "keramisk-lackforsegling",
    description:
      "Keramisk lackförsegling Karlskrona för långvarigt lackskydd, extrem glans och enklare underhåll.",
    priceFrom: "Fr. 5 995 kr",
    image: images.coating,
    category: "Skydd"
  },
  {
    title: "Reparation av repor",
    slug: "reparation-av-repor",
    description:
      "Bedömning och åtgärd av mindre repor med professionell metod för att rädda lackens helhetsintryck.",
    priceFrom: "Offert",
    image: images.blackCar,
    category: "Special"
  }
];

export const testimonials = [
  {
    name: "Anna L.",
    text: "Bilen såg bättre ut än när jag köpte den. Seriöst bemötande, tydlig garanti och fantastisk glans.",
    rating: 5
  },
  {
    name: "Johan M.",
    text: "Jag bokade keramisk lackförsegling och resultatet håller verkligen. Rekommenderas varmt i Karlskrona.",
    rating: 5
  },
  {
    name: "Mikael S.",
    text: "Premiumkänsla från första kontakt till leverans. De tog hand om bilen som om den vore deras egen.",
    rating: 5
  }
];

export const faqs = [
  {
    question: "Hur lång tid tar en helrekond?",
    answer:
      "En helrekond tar normalt från en halv till en hel dag beroende på bilens storlek, skick och valda tillägg. Vi bekräftar alltid tidsåtgång vid bokning."
  },
  {
    question: "Lämnar ni garanti på tjänsterna?",
    answer:
      "Ja. Vikings Car Care lämnar alltid garanti på alla våra tjänster, med tydlig genomgång av vad som ingår innan arbetet startar."
  },
  {
    question: "Är keramisk lackförsegling värt det i Karlskrona?",
    answer:
      "Ja, särskilt med salt, kustklimat och varierande väder. Keramisk coating gör lacken lättare att tvätta och hjälper till att bevara glans och skydd längre."
  },
  {
    question: "Kan jag boka via telefon eller WhatsApp?",
    answer:
      "Absolut. Du kan boka via formuläret, ringa 0455 61 61 69 eller använda WhatsApp-knappen för snabb kontakt."
  }
];

export const galleryItems = [
  { category: "Före/Efter", title: "Djup lackkorrigering", image: images.redCar },
  { category: "Keramisk coating", title: "Spegelblank keramisk lackförsegling", image: images.coating },
  { category: "Interiör", title: "Invändig rekond med premiumfinish", image: images.interior },
  { category: "Process", title: "Handtvätt och dekontaminering", image: images.wash },
  { category: "Polering", title: "Steg 3 polering", image: images.polish },
  { category: "Fälgar", title: "Fälgbehandling och skydd", image: images.blackCar },
  { category: "Lyx", title: "Leveransklar premiumbil", image: images.hero },
  { category: "Detaljer", title: "Detaljarbete i verkstad", image: images.workshop }
];

export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  sections: { heading: string; paragraphs: string[] }[];
  faq: { question: string; answer: string }[];
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "keramisk-lackforsegling-karlskrona",
    title: "Varför är keramisk lackförsegling viktigt för din bil?",
    excerpt:
      "Keramisk lackförsegling ger långvarigt lackskydd, djup glans och enklare underhåll för bilar som körs året runt i Karlskrona.",
    image: images.coating,
    date: "2026-05-15",
    readTime: "7 min läsning",
    sections: [
      {
        heading: "Keramisk lackförsegling skyddar mer än glansen",
        paragraphs: [
          "Keramisk lackförsegling, ofta kallad ceramic coating, skapar ett hårt och hydrofobt skydd ovanpå bilens klarlack. För dig som söker keramisk lackförsegling Karlskrona handlar det inte bara om en blankare bil, utan om ett mer motståndskraftigt lackskydd mot salt, vägdamm, UV-strålning, regn och vardaglig smuts.",
          "När coatingen appliceras korrekt efter tvätt, dekontaminering och polering binder den till lackytan och gör bilen lättare att underhålla. Smuts fastnar inte lika hårt och vatten pärlar av ytan, vilket minskar risken för tvättrepor vid framtida biltvätt."
        ]
      },
      {
        heading: "Varför passar coating extra bra i Karlskrona?",
        paragraphs: [
          "Karlskrona har kustnära klimat med fukt, blåst och vintersalt. Det är en tuff kombination för lacken. En professionell keramisk coating Karlskrona hjälper bilen att stå emot miljöpåverkan bättre än ett enkelt vax och passar både premiumbilar, familjebilar och företagsbilar.",
          "För bästa resultat bör lacken först rengöras på djupet och poleras. Då får skyddet en jämn yta att fästa på, och resultatet blir både snyggare och mer hållbart."
        ]
      },
      {
        heading: "Professionell applicering gör skillnaden",
        paragraphs: [
          "Det finns konsumentprodukter som lovar snabb coating, men hållbarheten och finishen beror mycket på underarbetet. Hos Vikings Car Care ingår en noggrann bedömning av lackens skick, rätt rengöringssteg och rekommendation av polering innan behandlingen.",
          "Vi lämnar alltid garanti på alla våra tjänster, vilket ger dig trygghet när du investerar i premium bilvård Karlskrona."
        ]
      }
    ],
    faq: [
      {
        question: "Hur länge håller keramisk lackförsegling?",
        answer:
          "Hållbarheten beror på produkt, körning och underhåll. Med rätt tvättrutin kan en keramisk lackförsegling hålla betydligt längre än traditionellt vax."
      },
      {
        question: "Måste bilen poleras innan coating?",
        answer:
          "Polering rekommenderas ofta eftersom coatingen kapslar in lackens aktuella skick. En polerad yta ger bättre glans och jämnare skydd."
      }
    ]
  },
  {
    slug: "skydda-bilen-mot-salt-vinter-karlskrona",
    title: "Så skyddar du bilen mot salt och vinter i Karlskrona",
    excerpt:
      "Vintersalt, fukt och växlande temperaturer sliter hårt på lack, fälgar och interiör. Här är en professionell strategi.",
    image: images.silverCar,
    date: "2026-05-15",
    readTime: "8 min läsning",
    sections: [
      {
        heading: "Salt kräver regelbunden och skonsam rengöring",
        paragraphs: [
          "Vintern i Karlskrona innebär ofta salt, regn, slask och smutsiga vägar. Salt binder fukt och kan påverka lack, fälgar, hjulhus och utsatta detaljer. Därför är regelbunden biltvätt Karlskrona extra viktig under vinterhalvåret.",
          "En professionell handtvätt bil Karlskrona minskar risken för repor eftersom metoden är mer kontrollerad än en snabb automatisk tvätt. Rätt förtvätt, rätt kem och rena tvättverktyg gör stor skillnad."
        ]
      },
      {
        heading: "Skydda lack, glas och fälgar före säsongen",
        paragraphs: [
          "Det smartaste är att förbereda bilen innan vädret blir som mest påfrestande. Lackskydd Karlskrona, glasbehandling och fälgbehandling gör att salt och smuts får svårare att fastna. Det gör också bilen enklare att tvätta ren under säsongen.",
          "För dig som vill ha långvarigt skydd är keramisk lackförsegling ett premiumval. För en enklare nivå kan vaxbehandling ge fin glans och ett skyddande lager."
        ]
      },
      {
        heading: "Glöm inte interiören",
        paragraphs: [
          "Vinter betyder också blöta skor, grus, saltfläckar och fukt i kupén. Invändig tvätt Karlskrona, tyg kemtvätt och inredningsbehandling hjälper till att hålla bilen fräsch och bevarar värdet över tid.",
          "En ren interiör känns inte bara bättre. Den kan också minska lukt och slitage, särskilt i bilar som används dagligen."
        ]
      }
    ],
    faq: [
      {
        question: "Hur ofta bör jag tvätta bilen på vintern?",
        answer:
          "Tvätta gärna oftare när vägarna är saltade, särskilt om bilen står utomhus eller körs mycket. En skonsam handtvätt är bäst för lacken."
      },
      {
        question: "Vilket skydd är bäst inför vintern?",
        answer:
          "Keramisk lackförsegling ger långvarigt skydd, medan vaxbehandling är ett enklare alternativ. Vi rekommenderar nivå efter bilens skick och användning."
      }
    ]
  },
  {
    slug: "biltvatt-vs-professionell-helrekond",
    title: "Skillnaden mellan vanlig biltvätt och professionell helrekond",
    excerpt:
      "En vanlig tvätt rengör ytan. En professionell helrekond återställer känslan, skyddar bilen och höjer helhetsintrycket.",
    image: images.workshop,
    date: "2026-05-15",
    readTime: "9 min läsning",
    sections: [
      {
        heading: "Vanlig biltvätt löser bara en del av problemet",
        paragraphs: [
          "En vanlig biltvätt Karlskrona är bra för löpande underhåll, men den tar oftast inte bort djupare smuts, flygrost, asfalt, ingrodd interiörsmuts eller tvättrepor. Resultatet kan se rent ut på avstånd, men lacken saknar ofta djup och skydd.",
          "Professionell bilvård Karlskrona börjar med att förstå bilens skick. Därför skiljer sig en helrekond från en standardtvätt genom både metod, tid och precision."
        ]
      },
      {
        heading: "Helrekond arbetar med hela bilen",
        paragraphs: [
          "Helrekond Karlskrona omfattar normalt både utvändig och invändig rengöring, dekontaminering, lackvård, interiördetaljer och skyddande finish. Det är en mer komplett process som passar när bilen ska säljas, lämnas tillbaka, användas inför säsong eller bara kännas riktigt premium igen.",
          "Bilrekond Karlskrona är också en investering i bilens andrahandsvärde. En välvårdad bil ger ett mer förtroendeingivande intryck och är trevligare att äga varje dag."
        ]
      },
      {
        heading: "Polering och skydd skapar premiumkänslan",
        paragraphs: [
          "Bilpolering Karlskrona tar bort eller reducerar repor, oxidering och matthet i lacken. Därefter kan lacken skyddas med vax eller keramisk lackförsegling. Det är kombinationen av korrigering och skydd som gör att bilen får den djupa, spegelblanka finishen.",
          "Hos Vikings Car Care arbetar vi med premiumprodukter, tydlig garanti och över 20 års erfarenhet. Målet är inte bara att bilen ska bli ren. Den ska kännas rätt."
        ]
      }
    ],
    faq: [
      {
        question: "När bör jag välja helrekond?",
        answer:
          "Välj helrekond när bilen är sliten, ska säljas, har mycket smuts eller när du vill ha ett tydligt premiumresultat invändigt och utvändigt."
      },
      {
        question: "Kan helrekond kombineras med keramisk coating?",
        answer:
          "Ja. En helrekond med polering är ofta ett perfekt underarbete inför keramisk lackförsegling."
      }
    ]
  }
];
