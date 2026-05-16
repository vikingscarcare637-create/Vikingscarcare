import { useEffect, useMemo } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { CTA } from "../components/CTA";
import { SectionHeading } from "../components/SectionHeading";
import { Seo } from "../components/Seo";
import { ServiceCard } from "../components/ServiceCard";
import { useApp } from "../context/useApp";
import { services } from "../data/site";
import {
  getServiceCategoryPageBySlug,
  getServiceCategoryPages,
  localizeService,
  uiText
} from "../data/localization";

export function ServiceCategory() {
  const { categorySlug } = useParams();
  const location = useLocation();
  const { language, openBooking } = useApp();
  const ui = uiText[language];
  const category = getServiceCategoryPageBySlug(categorySlug, language);
  const categoryPages = getServiceCategoryPages(language);

  const categoryServices = useMemo(
    () => (category ? services.filter((service) => category.categories.includes(service.category)) : []),
    [category]
  );

  useEffect(() => {
    if (!location.hash.startsWith("#service-")) return;

    window.setTimeout(() => {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 90);
  }, [location.hash, categorySlug]);

  if (!category) {
    return <Navigate to="/tjanster" replace />;
  }

  const labels = {
    allServices: language === "sv" ? "Alla tjänster" : "All services",
    categoryNav: language === "sv" ? "Tjänstekategorier" : "Service categories",
    included: language === "sv" ? "Ingår i kategorin" : "Included in this category",
    serviceCount: language === "sv" ? "tjänster" : "services",
    trustTitle: language === "sv" ? "Trygg premiumprocess" : "Trusted premium process",
    trustItems:
      language === "sv"
        ? [
            "Garanti på alla tjänster",
            "20+ års erfarenhet av bilvård",
            "Premiumprodukter och metodisk leverans"
          ]
        : [
            "Guarantee on all services",
            "20+ years of car care experience",
            "Premium products and methodical delivery"
          ]
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.seoTitle,
    description: category.seoDescription,
    hasPart: categoryServices.map((service) => {
      const localized = localizeService(service, language);
      return {
        "@type": "Service",
        name: localized.displayTitle,
        description: localized.displayDescription,
        areaServed: "Karlskrona",
        offers: {
          "@type": "Offer",
          priceCurrency: "SEK",
          description: localized.displayPriceFrom
        }
      };
    })
  };

  return (
    <>
      <Seo
        title={category.seoTitle}
        description={category.seoDescription}
        path={category.href}
        image={category.image}
        schema={schema}
      />

      <section className="page-hero">
        <div className="absolute inset-0">
          <img
            src={category.image}
            alt={`${category.title} Vikings Car Care Karlskrona`}
            className="h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/25" />
        </div>
        <div className="container-xl relative pb-20 pt-10 md:pb-28">
          <p className="eyebrow text-zinc-300">{category.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight md:text-7xl">
            {category.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
            {category.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="primary-button px-7 py-4" onClick={() => openBooking()}>
              {ui.book} <ArrowRight size={19} />
            </button>
            <Link className="secondary-button border-white/20 bg-white/10 px-7 py-4 text-white" to="/tjanster">
              {labels.allServices}
            </Link>
          </div>
        </div>
      </section>

      <AnimatedSection className="section-padding pb-0">
        <div className="container-xl">
          <nav
            aria-label={labels.categoryNav}
            className="grid gap-3 rounded-[28px] border border-black/10 bg-white p-3 shadow-silver dark:border-white/10 dark:bg-white/[0.045] md:grid-cols-4"
          >
            {categoryPages.map((item) => (
              <Link
                key={item.slug}
                to={item.href}
                className={`rounded-2xl px-4 py-4 transition ${
                  item.slug === category.slug
                    ? "bg-vikingRed text-white shadow-glow"
                    : "bg-zinc-50 text-ink hover:bg-vikingRed/10 hover:text-vikingRed dark:bg-white/[0.06] dark:text-white"
                }`}
              >
                <span className="block text-sm font-black uppercase">{item.shortTitle}</span>
                <span className="mt-1 block text-xs font-bold opacity-80">
                  {item.serviceCount} {labels.serviceCount}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding">
        <div className="container-xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <SectionHeading eyebrow={labels.included} title={category.introTitle}>
                {category.introText}
              </SectionHeading>
            </div>
            <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-silver dark:border-white/10 dark:bg-white/[0.045]">
              <h2 className="text-xl font-black text-ink dark:text-white">{labels.trustTitle}</h2>
              <div className="mt-5 grid gap-3">
                {labels.trustItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-bold text-zinc-700 dark:text-zinc-200">
                    <CheckCircle2 className="text-vikingRed" size={19} />
                    {item}
                  </div>
                ))}
              </div>
              <button className="primary-button mt-6 w-full justify-center" onClick={() => openBooking()}>
                {ui.book} <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <CTA title={category.ctaTitle} text={category.ctaText} />
    </>
  );
}
