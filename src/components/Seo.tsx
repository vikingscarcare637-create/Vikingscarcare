import { Helmet } from "react-helmet-async";
import { baseUrl, company, keywords, services } from "../data/site";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  schema?: Record<string, unknown>;
};

export function Seo({ title, description, path, image = company.logo, type = "website", schema }: SeoProps) {
  const canonical = `${baseUrl}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;
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
      "Premium bilvård, biltvätt, helrekond, bilpolering och keramisk lackförsegling i Karlskrona.",
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
      name: "Bilvård och rekond",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          areaServed: "Karlskrona"
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "SEK",
          description: service.priceFrom
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
      <meta property="og:locale" content="sv_SE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      {schema ? <script type="application/ld+json">{JSON.stringify(schema)}</script> : null}
    </Helmet>
  );
}
