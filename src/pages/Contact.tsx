import { FormEvent, useState } from "react";
import { CalendarDays, CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone, Send, Share2 } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { CTA } from "../components/CTA";
import { SectionHeading } from "../components/SectionHeading";
import { Seo } from "../components/Seo";
import { useApp } from "../context/useApp";
import { company, images, services } from "../data/site";
import { localizeService, uiText } from "../data/localization";
import { pageCopy } from "../data/pageCopy";

type ContactForm = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

export function Contact() {
  const { language, openBooking } = useApp();
  const copy = pageCopy[language].contact;
  const ui = uiText[language];
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<ContactForm>({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: ""
  });

  const update = (field: keyof ContactForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = [
      copy.emailIntro,
      "",
      `${copy.name}: ${form.name}`,
      `${copy.phone}: ${form.phone}`,
      `${copy.email}: ${form.email}`,
      `${copy.service}: ${form.service}`,
      "",
      `${copy.message}: ${form.message}`
    ].join("\n");
    setSent(true);
    window.location.href = `${company.emailHref}?subject=${encodeURIComponent(copy.emailSubject)}&body=${encodeURIComponent(body)}`;
  };

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
                { icon: MapPin, label: copy.address, value: company.address, href: "https://www.google.com/maps/search/?api=1&query=Borgm%C3%A4starekajen%2032%2C%20371%2034%20Karlskrona" },
                { icon: MessageCircle, label: "WhatsApp", value: copy.quickContact, href: company.whatsapp }
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

            <div className="mt-6 rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-white/[0.045]">
              <h2 className="flex items-center gap-2 text-xl font-black text-ink dark:text-white">
                <Clock className="text-vikingRed" /> {copy.hours}
              </h2>
              <div className="mt-4 grid gap-2 text-zinc-600 dark:text-zinc-300">
                <p>{copy.weekdays}</p>
                <p>{copy.saturday}</p>
                <p>{copy.sunday}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a className="secondary-button" href={company.socials.instagram}>
                <Share2 size={18} /> Instagram
              </a>
              <a className="secondary-button" href={company.socials.facebook}>
                <Share2 size={18} /> Facebook
              </a>
            </div>
          </div>

          <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-silver dark:border-white/10 dark:bg-white/[0.045] md:p-8">
            {sent ? (
              <div className="mb-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-200">
                <div className="flex items-center gap-2 font-black">
                  <CheckCircle2 size={18} /> {copy.sentTitle}
                </div>
                <p className="mt-2">{copy.sentText}</p>
              </div>
            ) : null}
            <form className="grid gap-4" onSubmit={submit}>
              <label className="field-label">
                {copy.name}
                <input required value={form.name} onChange={(event) => update("name", event.target.value)} />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="field-label">
                  {copy.phone}
                  <input required type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} />
                </label>
                <label className="field-label">
                  {copy.email}
                  <input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} />
                </label>
              </div>
              <label className="field-label">
                {copy.service}
                <select required value={form.service} onChange={(event) => update("service", event.target.value)}>
                  <option value="">{copy.selectService}</option>
                  {services.map((service) => (
                    <option key={service.slug} value={service.title}>
                      {localizeService(service, language).displayTitle}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field-label">
                {copy.message}
                <textarea
                  required
                  rows={6}
                  placeholder={copy.messagePlaceholder}
                  value={form.message}
                  onChange={(event) => update("message", event.target.value)}
                />
              </label>
              <button className="primary-button justify-center py-4" type="submit">
                <Send size={18} /> {copy.send}
              </button>
              <button className="secondary-button justify-center py-4" type="button" onClick={() => openBooking()}>
                <CalendarDays size={18} /> {copy.openBooking}
              </button>
            </form>
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
