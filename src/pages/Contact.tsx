import { CalendarDays, Clock, Mail, MapPin, Phone, Share2 } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { CTA } from "../components/CTA";
import { SectionHeading } from "../components/SectionHeading";
import { Seo } from "../components/Seo";
import { useApp } from "../context/useApp";
import { company, images } from "../data/site";
import { uiText } from "../data/localization";
import { pageCopy } from "../data/pageCopy";

export function Contact() {
  const { language, openBooking } = useApp();
  const copy = pageCopy[language].contact;
  const ui = uiText[language];

  return (
    <>
      <Seo
        title={copy.seoTitle}
        description={copy.seoDescription}
        path="/kontakta-oss"
        image={images.hero}
      />

      <section className="page-hero">
        <div className="absolute inset-0">
          <img src={images.hero} alt="Vikings Car Care kontakt och bokning" className="h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>
        <div className="container-xl relative pb-20 pt-10 md:pb-28">
          <p className="eyebrow text-zinc-300">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight md:text-7xl">{copy.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
            {copy.text}
          </p>
          <button className="primary-button mt-8 px-7 py-4" onClick={() => openBooking()}>
            <CalendarDays size={19} /> {ui.book}
          </button>
        </div>
      </section>

      <AnimatedSection className="section-padding">
        <div className="container-xl grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading eyebrow={copy.contactEyebrow} title={copy.contactTitle}>
              {copy.contactText}
            </SectionHeading>
            <div className="mt-8 grid gap-4">
              {[
                { icon: Phone, label: copy.phone, value: company.phone, href: company.phoneHref },
                { icon: Mail, label: copy.email, value: company.email, href: company.emailHref },
                { icon: MapPin, label: copy.address, value: company.address, href: "https://www.google.com/maps/search/?api=1&query=Borgm%C3%A4starekajen%2032%2C%20371%2034%20Karlskrona" }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 rounded-2xl border border-black/10 bg-white p-5 shadow-silver transition hover:-translate-y-1 hover:border-vikingRed/40 dark:border-white/10 dark:bg-white/[0.045]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-vikingRed text-white">
                    <item.icon />
                  </span>
                  <span>
                    <span className="block text-sm font-bold uppercase text-zinc-500 dark:text-zinc-400">{item.label}</span>
                    <span className="mt-1 block font-black text-ink dark:text-white">{item.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-white/[0.045]">
              <h2 className="flex items-center gap-2 text-xl font-black text-ink dark:text-white">
                <Clock className="text-vikingRed" /> {copy.hours}
              </h2>
              <div className="mt-4 grid gap-2 text-zinc-600 dark:text-zinc-300">
                <p>{copy.weekdays}</p>
                <p>{copy.saturday}</p>
                <p>{copy.sunday}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a className="secondary-button" href={company.socials.instagram}>
                <Share2 size={18} /> Instagram
              </a>
              <a className="secondary-button" href={company.socials.facebook}>
                <Share2 size={18} /> Facebook
              </a>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-silver dark:border-white/10 dark:bg-white/[0.045]">
              <img src={images.workshop} alt={copy.contactTitle} className="aspect-[16/9] w-full object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-black text-ink dark:text-white">{copy.ctaTitle}</h2>
                <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">{copy.ctaText}</p>
                <button className="primary-button mt-5 justify-center" type="button" onClick={() => openBooking()}>
                  <CalendarDays size={18} /> {ui.book}
                </button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="pb-16">
        <div className="container-xl">
          <div className="overflow-hidden rounded-[28px] border border-black/10 shadow-2xl dark:border-white/10">
            <iframe
              title="Google Maps Vikings Car Care"
              src={company.mapUrl}
              className="h-[520px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </AnimatedSection>

      <CTA title={copy.ctaTitle} text={copy.ctaText} />
    </>
  );
}
