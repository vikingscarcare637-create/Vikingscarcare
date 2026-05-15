import { FormEvent, useState } from "react";
import { CalendarDays, CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone, Send, Share2 } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { CTA } from "../components/CTA";
import { SectionHeading } from "../components/SectionHeading";
import { Seo } from "../components/Seo";
import { useApp } from "../context/useApp";
import { company, images, services } from "../data/site";

type ContactForm = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

export function Contact() {
  const { openBooking } = useApp();
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
      "Kontaktförfrågan från vikingscarcare.com",
      "",
      `Namn: ${form.name}`,
      `Telefon: ${form.phone}`,
      `E-post: ${form.email}`,
      `Tjänst: ${form.service}`,
      "",
      `Meddelande: ${form.message}`
    ].join("\n");
    setSent(true);
    window.location.href = `${company.emailHref}?subject=${encodeURIComponent("Kontaktförfrågan Vikings Car Care")}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <Seo
        title="Kontakta Oss | Vikings Car Care Karlskrona"
        description="Kontakta Vikings Car Care för bilvård, biltvätt, helrekond, bilpolering och keramisk lackförsegling i Karlskrona. Ring, maila, WhatsApp eller boka online."
        path="/kontakta-oss"
        image={images.hero}
      />

      <section className="page-hero">
        <div className="absolute inset-0">
          <img src={images.hero} alt="Vikings Car Care kontakt och bokning" className="h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>
        <div className="container-xl relative pb-20 pt-10 md:pb-28">
          <p className="eyebrow text-zinc-300">Kontakta Oss</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight md:text-7xl">Boka premium bilvård i Karlskrona</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
            Ring, maila, skicka WhatsApp eller fyll i formuläret. Vi hjälper dig snabbt hitta rätt tjänst för bilen.
          </p>
          <button className="primary-button mt-8 px-7 py-4" onClick={() => openBooking()}>
            <CalendarDays size={19} /> Boka Tid
          </button>
        </div>
      </section>

      <AnimatedSection className="section-padding">
        <div className="container-xl grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading eyebrow="Direktkontakt" title="Vi finns på Borgmästarekajen 32">
              Kontakta oss för professionell bilvård Karlskrona, premium biltvätt Karlskrona, bilpolering Karlskrona och
              keramisk lackförsegling Karlskrona.
            </SectionHeading>
            <div className="mt-8 grid gap-4">
              {[
                { icon: Phone, label: "Telefon", value: company.phone, href: company.phoneHref },
                { icon: Mail, label: "E-post", value: company.email, href: company.emailHref },
                { icon: MapPin, label: "Adress", value: company.address, href: "https://www.google.com/maps/search/?api=1&query=Borgm%C3%A4starekajen%2032%2C%20371%2034%20Karlskrona" },
                { icon: MessageCircle, label: "WhatsApp", value: "Snabb kontakt", href: company.whatsapp }
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
                <Clock className="text-vikingRed" /> Öppettider
              </h2>
              <div className="mt-4 grid gap-2 text-zinc-600 dark:text-zinc-300">
                <p>Måndag-Fredag: Enligt bokning</p>
                <p>Lördag: Enligt bokning</p>
                <p>Söndag: Stängt</p>
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
                  <CheckCircle2 size={18} /> Tack! Meddelandet är förberett.
                </div>
                <p className="mt-2">Din e-postapp öppnas med dina uppgifter. Skicka mejlet för att kontakta oss.</p>
              </div>
            ) : null}
            <form className="grid gap-4" onSubmit={submit}>
              <label className="field-label">
                Namn
                <input required value={form.name} onChange={(event) => update("name", event.target.value)} />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="field-label">
                  Telefon
                  <input required type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} />
                </label>
                <label className="field-label">
                  E-post
                  <input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} />
                </label>
              </div>
              <label className="field-label">
                Tjänst
                <select required value={form.service} onChange={(event) => update("service", event.target.value)}>
                  <option value="">Välj tjänst</option>
                  {services.map((service) => (
                    <option key={service.slug} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field-label">
                Meddelande
                <textarea
                  required
                  rows={6}
                  placeholder="Berätta vad du vill boka eller fråga om."
                  value={form.message}
                  onChange={(event) => update("message", event.target.value)}
                />
              </label>
              <button className="primary-button justify-center py-4" type="submit">
                <Send size={18} /> Skicka meddelande
              </button>
              <button className="secondary-button justify-center py-4" type="button" onClick={() => openBooking()}>
                <CalendarDays size={18} /> Öppna komplett bokningsformulär
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

      <CTA title="Snabbast väg till blankare bil" text="Boka tid direkt eller kontakta oss så rekommenderar vi rätt nivå av rekond, polering och lackskydd." />
    </>
  );
}
