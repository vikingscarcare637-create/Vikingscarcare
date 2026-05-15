import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, HelpCircle } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { CTA } from "../components/CTA";
import { FaqAccordion } from "../components/FaqAccordion";
import { SectionHeading } from "../components/SectionHeading";
import { Seo } from "../components/Seo";
import { useApp } from "../context/useApp";
import { baseUrl, blogArticles, images } from "../data/site";

export function Blog() {
  const { openBooking } = useApp();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Vikings Car Care Blogg",
    url: `${baseUrl}/blogg`,
    blogPost: blogArticles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      description: article.excerpt,
      image: article.image,
      datePublished: article.date,
      author: {
        "@type": "Organization",
        name: "Vikings Car Care"
      },
      mainEntityOfPage: `${baseUrl}/blogg#${article.slug}`
    }))
  };

  return (
    <>
      <Seo
        title="Blogg | Bilvård Karlskrona, Lackskydd & Helrekond Tips"
        description="SEO-guider från Vikings Car Care om keramisk lackförsegling, vintervård, biltvätt och professionell helrekond i Karlskrona."
        path="/blogg"
        image={images.coating}
        schema={schema}
      />

      <section className="page-hero">
        <div className="absolute inset-0">
          <img src={images.coating} alt="Keramisk lackförsegling och bilvård i Karlskrona" className="h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>
        <div className="container-xl relative pb-20 pt-10 md:pb-28">
          <p className="eyebrow text-zinc-300">Blogg</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight md:text-7xl">
            Guider för bilvård, rekond och lackskydd i Karlskrona
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
            Läs praktiska, SEO-optimerade guider om biltvätt Karlskrona, helrekond Karlskrona, bilpolering Karlskrona
            och keramisk lackförsegling Karlskrona.
          </p>
          <button className="primary-button mt-8 px-7 py-4" onClick={() => openBooking()}>
            Boka Tid <ArrowRight size={19} />
          </button>
        </div>
      </section>

      <AnimatedSection className="section-padding">
        <div className="container-xl">
          <SectionHeading eyebrow="Artiklar" title="Kunskap som hjälper dig välja rätt bilvård" align="center">
            Varje guide innehåller naturliga lokala sökord, internlänkar, FAQ och tydliga bokningsvägar.
          </SectionHeading>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {blogArticles.map((article) => (
              <a
                key={article.slug}
                href={`#${article.slug}`}
                className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-silver dark:border-white/10 dark:bg-white/[0.045]"
              >
                <img src={article.image} alt={article.title} className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="p-5">
                  <div className="flex flex-wrap gap-4 text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {article.readTime}
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-black text-ink dark:text-white">{article.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{article.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <div className="container-xl pb-16">
        <div className="grid gap-12">
          {blogArticles.map((article, index) => (
            <AnimatedSection
              key={article.slug}
              className="scroll-mt-28 overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-silver dark:border-white/10 dark:bg-white/[0.045]"
            >
              <article id={article.slug}>
                <div className="relative">
                  <img src={article.image} alt={article.title} className="h-[360px] w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="eyebrow text-zinc-200">Guide {index + 1}</p>
                    <h2 className="mt-3 max-w-4xl text-3xl font-black md:text-5xl">{article.title}</h2>
                  </div>
                </div>
                <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-[1fr_280px]">
                  <div className="prose-content">
                    <p className="text-lg leading-8 text-zinc-700 dark:text-zinc-200">{article.excerpt}</p>
                    {article.sections.map((section) => (
                      <section key={section.heading} className="mt-9">
                        <h3 className="text-2xl font-black text-ink dark:text-white">{section.heading}</h3>
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph} className="mt-4 leading-8 text-zinc-600 dark:text-zinc-300">
                            {paragraph}
                          </p>
                        ))}
                      </section>
                    ))}
                    <div className="mt-9 rounded-2xl border border-vikingRed/25 bg-vikingRed/10 p-6">
                      <h3 className="text-xl font-black text-ink dark:text-white">Vill du ha personlig rekommendation?</h3>
                      <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">
                        Läs mer om våra <Link className="font-bold text-vikingRed" to="/tjanster">tjänster</Link> eller
                        kontakta oss för bokning av bilvård nära mig Karlskrona, rekond för bil Karlskrona och lackskydd
                        Karlskrona.
                      </p>
                      <button className="primary-button mt-5" onClick={() => openBooking()}>
                        Boka Tid <ArrowRight size={18} />
                      </button>
                    </div>
                    <section className="mt-9">
                      <h3 className="mb-4 flex items-center gap-2 text-2xl font-black text-ink dark:text-white">
                        <HelpCircle className="text-vikingRed" /> FAQ
                      </h3>
                      <FaqAccordion items={article.faq} />
                    </section>
                  </div>
                  <aside className="h-fit rounded-2xl border border-black/10 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/[0.06]">
                    <p className="text-sm font-black uppercase text-vikingRed">Interna länkar</p>
                    <div className="mt-4 grid gap-3 text-sm font-bold">
                      <Link className="hover:text-vikingRed" to="/tjanster">
                        Tjänster
                      </Link>
                      <Link className="hover:text-vikingRed" to="/galleri">
                        Galleri
                      </Link>
                      <Link className="hover:text-vikingRed" to="/kontakta-oss">
                        Kontakta Oss
                      </Link>
                      <button className="primary-button mt-3 justify-center" onClick={() => openBooking()}>
                        Boka Tid
                      </button>
                    </div>
                  </aside>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <CTA title="Få rätt behandling för din bil" text="Skicka en bokningsförfrågan så hjälper vi dig välja mellan tvätt, rekond, polering, vax och keramisk coating." />
    </>
  );
}
