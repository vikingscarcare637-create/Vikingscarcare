import { ArrowRight, Award, Gem, HeartHandshake, ShieldCheck, Sparkles, Users } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { CTA } from "../components/CTA";
import { SectionHeading } from "../components/SectionHeading";
import { Seo } from "../components/Seo";
import { useApp } from "../context/useApp";
import { company, images } from "../data/site";

export function About() {
  const { openBooking } = useApp();

  return (
    <>
      <Seo
        title="Om Oss | Vikings Car Care Karlskrona"
        description="Lär känna Vikings Car Care, premium bilvård i Karlskrona med över 20 års erfarenhet, garanti på alla tjänster och skandinavisk kvalitetskänsla."
        path="/om-oss"
        image={images.workshop}
      />

      <section className="page-hero">
        <div className="absolute inset-0">
          <img src={images.blackCar} alt="Premium bil i skandinavisk detailingmiljö" className="h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>
        <div className="container-xl relative pb-20 pt-10 md:pb-28">
          <p className="eyebrow text-zinc-300">Om Vikings Car Care</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight md:text-7xl">
            Skandinavisk precision för bilar som förtjänar mer
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
            Vi är detailing-specialister i Karlskrona med över 20 års erfarenhet, premiumprodukter och garanti på alla
            tjänster.
          </p>
          <button className="primary-button mt-8 px-7 py-4" onClick={() => openBooking()}>
            Boka Tid <ArrowRight size={19} />
          </button>
        </div>
      </section>

      <AnimatedSection className="section-padding">
        <div className="container-xl grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative">
            <img src={images.workshop} alt="Professionell bilvårdsverkstad i Karlskrona" className="rounded-[32px] object-cover shadow-2xl" />
            <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-carbon/86 p-5 text-white backdrop-blur-xl">
              <p className="text-4xl font-black">{company.experience}</p>
              <p className="mt-1 text-sm uppercase tracking-[0.2em] text-zinc-300">års erfarenhet</p>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Vår standard" title="Premiumprodukter, ärligt hantverk och tydlig trygghet">
              Vikings Car Care är byggt för kunder som vill känna förtroende direkt. Vi arbetar strukturerat, kommunicerar
              tydligt och behandlar varje bil med samma noggrannhet oavsett om det gäller snabb biltvätt eller avancerad
              keramisk lackförsegling.
            </SectionHeading>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, title: "Garanti", text: company.guarantee },
                { icon: Gem, title: "Premiumkänsla", text: "Luxuös finish utan överdrift, med fokus på verkligt resultat." },
                { icon: Sparkles, title: "Detaljprecision", text: "Noggranna steg för tvätt, polering, skydd och interiör." },
                { icon: HeartHandshake, title: "Kundnöjdhet", text: "Tydlig dialog före, under och efter varje bokning." }
              ].map((item) => (
                <div key={item.title} className="glass-panel rounded-2xl p-5">
                  <item.icon className="text-vikingRed" />
                  <h3 className="mt-4 font-black text-ink dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-carbon text-white">
        <div className="container-xl">
          <SectionHeading eyebrow="Resan" title="20 år av bilvård, rekond och lackskydd" align="center">
            Erfarenheten bakom Vikings Car Care syns i processen: rätt analys, rätt produkter och rätt finish.
          </SectionHeading>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              ["2000-tal", "Grunden", "Praktisk erfarenhet av professionell bilvård och rekond byggs upp."],
              ["2010-tal", "Specialisering", "Fokus på polering, lackkorrigering och skyddande behandlingar."],
              ["2020-tal", "Premiumstandard", "Keramisk coating, modern kundresa och tydligare garantier."],
              ["Idag", "Karlskrona", "Vikings Car Care hjälper bilägare i Karlskrona med premium bilvård."]
            ].map(([year, title, text]) => (
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
            {[
              ["20+", "års erfarenhet"],
              ["100%", "garanti på tjänster"],
              ["6", "huvudsidor för enkel bokning"],
              ["1", "premiumteam i Karlskrona"]
            ].map(([value, label]) => (
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
          <SectionHeading eyebrow="Team" title="Specialister som arbetar lugnt, metodiskt och noggrant" align="center">
            Teamsektionen är byggd för förtroende och kan enkelt uppdateras med riktiga porträtt när de finns tillgängliga.
          </SectionHeading>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { role: "Lackspecialist", image: images.polish, icon: Award },
              { role: "Interiörspecialist", image: images.interior, icon: Users },
              { role: "Coating-specialist", image: images.coating, icon: ShieldCheck }
            ].map((member) => (
              <div key={member.role} className="overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.045]">
                <img src={member.image} alt={`${member.role} hos Vikings Car Care`} className="aspect-[4/3] w-full object-cover" />
                <div className="p-6">
                  <member.icon className="text-vikingRed" />
                  <h3 className="mt-4 text-xl font-black text-ink dark:text-white">{member.role}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                    Professionell roll med fokus på kvalitet, kommunikation och ett resultat kunden känner direkt.
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
            <h2 className="mt-3 text-3xl font-black text-ink dark:text-white">Att göra premium bilvård trygg och tillgänglig</h2>
            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-300">
              Vårt uppdrag är att ge bilägare i Karlskrona en bilvårdsupplevelse som känns exklusiv, tydlig och
              förtroendeingivande från första klick till färdig leverans.
            </p>
          </div>
          <div className="rounded-[28px] border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-white/[0.045]">
            <p className="eyebrow">Vision</p>
            <h2 className="mt-3 text-3xl font-black text-ink dark:text-white">Att vara det självklara valet för bilrekond i Karlskrona</h2>
            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-300">
              Vi vill bli den lokala referensen för bilvård Karlskrona, helrekond Karlskrona och keramisk lackförsegling
              Karlskrona genom resultat som håller och service som känns personlig.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <CTA />
    </>
  );
}
