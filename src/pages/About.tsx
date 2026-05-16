import { ArrowRight, Award, Gem, HeartHandshake, ShieldCheck, Sparkles, Users } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { CTA } from "../components/CTA";
import { SectionHeading } from "../components/SectionHeading";
import { Seo } from "../components/Seo";
import { useApp } from "../context/useApp";
import { company, images } from "../data/site";
import { uiText } from "../data/localization";
import { pageCopy } from "../data/pageCopy";

export function About() {
  const { language, openBooking } = useApp();
  const copy = pageCopy[language].about;
  const ui = uiText[language];

  return (
    <>
      <Seo
        title={copy.seoTitle}
        description={copy.seoDescription}
        path="/om-oss"
        image={images.workshop}
      />

      <section className="page-hero">
        <div className="absolute inset-0">
          <img src={images.blackCar} alt="Premium bil i skandinavisk detailingmiljö" className="h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
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
        <div className="container-xl grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative">
            <img src={images.workshop} alt="Professionell bilvårdsverkstad i Karlskrona" className="rounded-[32px] object-cover shadow-2xl" />
            <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-carbon/86 p-5 text-white backdrop-blur-xl">
              <p className="text-4xl font-black">{company.experience}</p>
              <p className="mt-1 text-sm uppercase tracking-[0.2em] text-zinc-300">{copy.experience}</p>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow={copy.standardEyebrow} title={copy.standardTitle}>
              {copy.standardText}
            </SectionHeading>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ShieldCheck,
                Gem,
                Sparkles,
                HeartHandshake
              ].map((Icon, index) => (
                <div key={copy.standardCards[index][0]} className="glass-panel rounded-2xl p-5">
                  <Icon className="text-vikingRed" />
                  <h3 className="mt-4 font-black text-ink dark:text-white">{copy.standardCards[index][0]}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{copy.standardCards[index][1]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-carbon text-white">
        <div className="container-xl">
          <SectionHeading eyebrow={copy.journeyEyebrow} title={copy.journeyTitle} align="center">
            {copy.journeyText}
          </SectionHeading>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {copy.timeline.map(([year, title, text]) => (
              <div key={year} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                <p className="text-sm font-black uppercase text-vikingRed">{year}</p>
                <h3 className="mt-4 text-2xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding">
        <div className="container-xl">
          <div className="grid gap-5 md:grid-cols-4">
            {copy.stats.map(([value, label]) => (
              <div key={label} className="glass-panel rounded-2xl p-7 text-center">
                <p className="text-5xl font-black text-vikingRed">{value}</p>
                <p className="mt-3 font-bold text-zinc-700 dark:text-zinc-200">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-white/65 dark:bg-white/[0.025]">
        <div className="container-xl">
          <SectionHeading eyebrow={copy.teamEyebrow} title={copy.teamTitle} align="center">
            {copy.teamText}
          </SectionHeading>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { role: copy.teamRoles[0], image: images.polish, icon: Award },
              { role: copy.teamRoles[1], image: images.interior, icon: Users },
              { role: copy.teamRoles[2], image: images.coating, icon: ShieldCheck }
            ].map((member) => (
              <div key={member.role} className="overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.045]">
                <img src={member.image} alt={`${member.role} hos Vikings Car Care`} className="aspect-[4/3] w-full object-cover" />
                <div className="p-6">
                  <member.icon className="text-vikingRed" />
                  <h3 className="mt-4 text-xl font-black text-ink dark:text-white">{member.role}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                    {copy.teamDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding">
        <div className="container-xl grid gap-5 lg:grid-cols-2">
          <div className="rounded-[28px] border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-white/[0.045]">
            <p className="eyebrow">Mission</p>
            <h2 className="mt-3 text-3xl font-black text-ink dark:text-white">{copy.missionTitle}</h2>
            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-300">
              {copy.missionText}
            </p>
          </div>
          <div className="rounded-[28px] border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-white/[0.045]">
            <p className="eyebrow">Vision</p>
            <h2 className="mt-3 text-3xl font-black text-ink dark:text-white">{copy.visionTitle}</h2>
            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-300">
              {copy.visionText}
            </p>
          </div>
        </div>
      </AnimatedSection>

      <CTA />
    </>
  );
}
