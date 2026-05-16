import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Car, MapPin, Phone, ShieldCheck, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "../components/AnimatedSection";
import { BeforeAfter } from "../components/BeforeAfter";
import { CTA } from "../components/CTA";
import { FaqAccordion } from "../components/FaqAccordion";
import { SectionHeading } from "../components/SectionHeading";
import { Seo } from "../components/Seo";
import { ServiceCard } from "../components/ServiceCard";
import { useApp } from "../context/useApp";
import { company, images, services } from "../data/site";
import { getLocalizedBlogArticles, getLocalizedFaqs, getLocalizedTestimonials, uiText } from "../data/localization";
import { pageCopy } from "../data/pageCopy";

const popularServices = services.filter((service) =>
  ["Stor rekond", "Keramisk lackförsegling", "Steg 3 polering", "In- och utvändig tvätt"].includes(service.title)
);

export function Home() {
  const { language, openBooking } = useApp();
  const copy = pageCopy[language].home;
  const ui = uiText[language];
  const blogArticles = getLocalizedBlogArticles(language);
  const faqs = getLocalizedFaqs(language);
  const testimonials = getLocalizedTestimonials(language);

  return (
    <>
      <Seo
        title={copy.seoTitle}
        description={copy.seoDescription}
        path="/"
        image={images.hero}
      />

      <section className="relative min-h-screen overflow-hidden bg-carbon pt-24 text-white">
        <div className="absolute inset-0">
          <img src={images.hero} alt={copy.heroAlt} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/72 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-black/40" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-carbon to-transparent" />
        <motion.div
          className="absolute right-[-8rem] top-32 h-96 w-96 rounded-full bg-red-glow blur-3xl"
          animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.9, 1.08, 0.9] }}
          transition={{ duration: 7, repeat: Infinity }}
        />

        <div className="container-xl relative flex min-h-[calc(100vh-6rem)] items-center py-16">
          <div className="max-w-4xl">
            <motion.img
              src={company.logo}
              alt="Vikings Car Care logo"
              className="mb-7 h-24 w-60 rounded-2xl object-contain object-left"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            />
            <motion.p
              className="eyebrow text-zinc-200"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
            >
              {copy.eyebrow}
            </motion.p>
            <motion.h1
              className="mt-5 max-w-4xl text-5xl font-black leading-[0.95] tracking-normal md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15 }}
            >
              {copy.heroTitle}
            </motion.h1>
            <motion.p
              className="mt-7 max-w-2xl text-lg leading-8 text-zinc-200 md:text-xl"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.24 }}
            >
              {copy.heroText}
            </motion.p>
            <motion.div
              className="mt-9 flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.32 }}
            >
              <button className="primary-button justify-center px-7 py-4" onClick={() => openBooking()}>
                {ui.book} <ArrowRight size={20} />
              </button>
              <a className="secondary-button justify-center border-white/20 bg-white/10 px-7 py-4 text-white" href={company.phoneHref}>
                <Phone size={20} /> {ui.callNow}
              </a>
            </motion.div>

            <motion.div
              className="mt-12 grid gap-3 sm:grid-cols-3"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.42 }}
            >
              {copy.stats.map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-3xl font-black">{value}</p>
                  <p className="mt-1 text-sm text-zinc-300">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatedSection className="section-padding">
        <div className="container-xl">
          <SectionHeading
            eyebrow={copy.whyEyebrow}
            title={copy.whyTitle}
            align="center"
          >
            {copy.whyText}
          </SectionHeading>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ShieldCheck,
              Sparkles,
              BadgeCheck,
              Car
            ].map((Icon, index) => (
              <div key={copy.whyCards[index][0]} className="glass-panel rounded-2xl p-6">
                <Icon className="text-vikingRed" size={30} />
                <h3 className="mt-5 text-xl font-black text-ink dark:text-white">{copy.whyCards[index][0]}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{copy.whyCards[index][1]}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-white/65 dark:bg-white/[0.025]">
        <div className="container-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow={copy.servicesEyebrow} title={copy.servicesTitle}>
              {copy.servicesText}
            </SectionHeading>
            <Link className="secondary-button self-start" to="/tjanster">
              {ui.allServices} <ArrowRight size={18} />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {popularServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding">
        <div className="container-xl grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading eyebrow={copy.beforeEyebrow} title={copy.beforeTitle}>
              {copy.beforeText}
            </SectionHeading>
            <button className="primary-button mt-8" onClick={() => openBooking("Stor rekond")}>
              {ui.bookDetail} <ArrowRight size={18} />
            </button>
          </div>
          <BeforeAfter />
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-carbon text-white">
        <div className="container-xl grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-[32px]">
            <img src={images.coating} alt="Keramisk lackförsegling Karlskrona med djup glans" className="aspect-[4/3] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
            <p className="absolute bottom-5 left-5 rounded-full bg-vikingRed px-4 py-2 text-sm font-black">
              Ceramic Coating Karlskrona
            </p>
          </div>
          <div>
            <p className="eyebrow text-zinc-300">{copy.coatingEyebrow}</p>
            <h2 className="mt-4 text-4xl font-black md:text-6xl">{copy.coatingTitle}</h2>
            <p className="mt-6 leading-8 text-zinc-300">
              {copy.coatingText}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="primary-button justify-center" onClick={() => openBooking("Keramisk lackförsegling")}>
                {ui.bookCoating}
              </button>
              <Link className="secondary-button justify-center border-white/20 bg-white/10 text-white" to="/blogg">
                {ui.readGuide}
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding">
        <div className="container-xl">
          <SectionHeading eyebrow={copy.reviewsEyebrow} title={copy.reviewsTitle} align="center">
            {copy.reviewsText}
          </SectionHeading>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((review) => (
              <div key={review.name} className="glass-panel rounded-2xl p-6">
                <div className="flex gap-1 text-vikingRed">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={index} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-5 leading-7 text-zinc-700 dark:text-zinc-200">"{review.text}"</p>
                <p className="mt-5 font-black text-ink dark:text-white">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-white/65 dark:bg-white/[0.025]">
        <div className="container-xl">
          <SectionHeading eyebrow={copy.pricingEyebrow} title={copy.pricingTitle}>
            {copy.pricingText}
          </SectionHeading>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {copy.pricingCards.map(([title, price, text]) => (
              <div key={title} className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-white/[0.045]">
                <h3 className="text-xl font-black text-ink dark:text-white">{title}</h3>
                <p className="mt-4 text-3xl font-black text-vikingRed">{price}</p>
                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{text}</p>
                <button className="secondary-button mt-5 w-full justify-center" onClick={() => openBooking(title)}>
                  {ui.book}
                </button>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding">
        <div className="container-xl grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow={copy.faqEyebrow} title={copy.faqTitle}>
            {copy.faqText}
          </SectionHeading>
          <FaqAccordion items={faqs} />
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-white/65 dark:bg-white/[0.025]">
        <div className="container-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow={copy.blogEyebrow} title={copy.blogTitle} />
            <Link className="secondary-button self-start" to="/blogg">
              {ui.allArticles} <ArrowRight size={18} />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {blogArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/blogg#${article.slug}`}
                className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-silver dark:border-white/10 dark:bg-white/[0.045]"
              >
                <img src={article.image} alt={article.title} className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="p-5">
                  <p className="text-xs font-bold uppercase text-vikingRed">{article.readTime}</p>
                  <h3 className="mt-3 text-xl font-black text-ink dark:text-white">{article.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding">
        <div className="container-xl grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="overflow-hidden rounded-[28px] border border-black/10 shadow-2xl dark:border-white/10">
            <iframe
              title="Karta till Vikings Car Care"
              src={company.mapUrl}
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div>
            <SectionHeading eyebrow={copy.mapEyebrow} title={copy.mapTitle}>
              {copy.mapText}
            </SectionHeading>
            <div className="mt-6 grid gap-3 text-zinc-700 dark:text-zinc-200">
              <p className="flex gap-3">
                <MapPin className="text-vikingRed" /> {company.address}
              </p>
              <a className="flex gap-3 font-bold hover:text-vikingRed" href={company.phoneHref}>
                <Phone className="text-vikingRed" /> {company.phone}
              </a>
            </div>
            <button className="primary-button mt-8" onClick={() => openBooking()}>
              {ui.book}
            </button>
          </div>
        </div>
      </AnimatedSection>

      <CTA />
    </>
  );
}
