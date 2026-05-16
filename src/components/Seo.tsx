import { Helmet } from "react-helmet-async";
import { baseUrl, company, keywords } from "../data/site";
import { getLocalizedServices } from "../data/localization";
import { useApp } from "../context/useApp";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  schema?: Record<string, unknown>;
};

export function Seo({ title, description, path, image = company.logo, type = "website", schema }: SeoProps) {
  const { language } = useApp();
  const canonical = `${baseUrl}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;
  const localizedServices = getLocalizedServices(language);
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoWash",
    "@id": `${baseUrl}/#localbusiness`,
    name: company.name,
    image: imageUrl,
    logo: `${baseUrl}/logo.png`,
    url: baseUrl,
    telephone: "+46455616169",
    email: company.email,
    priceRange: "$$",
    description:
      language === "sv"
        ? "Premium bilvård, biltvätt, helrekond, bilpolering och keramisk lackförsegling i Karlskrona."
        : "Premium car care, car wash, full detailing, polishing and ceramic coating in Karlskrona.",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.streetAddress,
      postalCode: company.postalCode,
      addressLocality: company.locality,
      addressCountry: company.country
    },
    areaServed: ["Karlskrona", "Blekinge"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: language === "sv" ? "Bilvård och rekond" : "Car care and detailing",
      itemListElement: localizedServices.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.displayTitle,
          description: service.displayDescription,
          areaServed: "Karlskrona"
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "SEK",
          description: service.displayPriceFrom
        }
      }))
    },
    sameAs: [company.socials.facebook, company.socials.instagram]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={language === "sv" ? "sv_SE" : "en_GB"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      {schema ? <script type="application/ld+json">{JSON.stringify(schema)}</script> : null}
    </Helmet>
  );
}
