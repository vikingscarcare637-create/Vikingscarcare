import { useMemo, useState } from "react";
import { ArrowRight, Filter, ShieldCheck } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { CTA } from "../components/CTA";
import { SectionHeading } from "../components/SectionHeading";
import { Seo } from "../components/Seo";
import { ServiceCard } from "../components/ServiceCard";
import { useApp } from "../context/useApp";
import { images, services } from "../data/site";
import { categoryOptions, uiText } from "../data/localization";
import { pageCopy } from "../data/pageCopy";

export function Services() {
  const [category, setCategory] = useState("Alla");
  const { language, openBooking } = useApp();
  const copy = pageCopy[language].services;
  const ui = uiText[language];
  const categories = categoryOptions(language);

  const visibleServices = useMemo(
    () => (category === "Alla" ? services : services.filter((service) => service.category === category)),
    [category]
  );

  return (
    <>
      <Seo
        title={copy.seoTitle}
        description={copy.seoDescription}
        path="/tjanster"
        image={images.workshop}
      />

      <section className="page-hero">
        <div className="absolute inset-0">
          <img src={images.workshop} alt="Professionell verkstad för bilvård i Karlskrona" className="h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />
        </div>
        <div className="container-xl relative pb-20 pt-10 md:pb-28">
          <p className="eyebrow text-zinc-300">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight md:text-7xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
            {copy.text}
          </p>
          <button className="primary-button mt-8 px-7 py-4" onClick={() => openBooking()}>
            {ui.book} <ArrowRight size={19} />
          </button>
        </div>
      </section>

      <AnimatedSection className="section-padding">
        <div className="container-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow={copy.catalogEyebrow} title={copy.catalogTitle}>
              {copy.catalogText}
            </SectionHeading>
            <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white p-2 dark:border-white/10 dark:bg-white/[0.05]">
              <Filter size={18} className="ml-2 text-vikingRed" />
              <select
                className="bg-transparent px-2 py-2 text-sm font-bold outline-none dark:text-white"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                aria-label={copy.filterLabel}
              >
                {categories.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-carbon text-white">
        <div className="container-xl grid gap-8 lg:grid-cols-3">
          {[
            ...copy.steps
          ].map(([step, title, text]) => (
            <div key={step} className="rounded-3xl border border-white/10 bg-white/[0.06] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-vikingRed text-xl font-black">{step}</div>
              <h2 className="mt-6 text-2xl font-black">{title}</h2>
              <p className="mt-4 leading-7 text-zinc-300">{text}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding">
        <div className="container-xl rounded-[32px] border border-black/10 bg-white p-8 shadow-silver dark:border-white/10 dark:bg-white/[0.045] md:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <ShieldCheck className="text-vikingRed" size={42} />
              <h2 className="mt-4 text-3xl font-black text-ink dark:text-white md:text-5xl">{copy.guaranteeTitle}</h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                {copy.guaranteeText}
              </p>
              <button className="primary-button mt-7" onClick={() => openBooking()}>
                {ui.book} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <CTA title={copy.ctaTitle} text={copy.ctaText} />
    </>
  );
}
