import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Maximize2, Play, X } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { BeforeAfter } from "../components/BeforeAfter";
import { CTA } from "../components/CTA";
import { SectionHeading } from "../components/SectionHeading";
import { Seo } from "../components/Seo";
import { useApp } from "../context/useApp";
import { galleryItems, images } from "../data/site";

export function Gallery() {
  const [filter, setFilter] = useState("Alla");
  const [activeImage, setActiveImage] = useState<(typeof galleryItems)[number] | null>(null);
  const { openBooking } = useApp();

  const categories = useMemo(() => ["Alla", ...Array.from(new Set(galleryItems.map((item) => item.category)))], []);
  const visible = filter === "Alla" ? galleryItems : galleryItems.filter((item) => item.category === filter);

  return (
    <>
      <Seo
        title="Galleri | Före Efter Bilrekond & Keramisk Coating Karlskrona"
        description="Se galleri från Vikings Car Care med före/efter, lyxbilar, detailingprocess, polering och keramisk lackförsegling i Karlskrona."
        path="/galleri"
        image={images.redCar}
      />

      <section className="page-hero">
        <div className="absolute inset-0">
          <img src={images.redCar} alt="Lyxbil med blank lack efter rekond" className="h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />
        </div>
        <div className="container-xl relative pb-20 pt-10 md:pb-28">
          <p className="eyebrow text-zinc-300">Galleri</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight md:text-7xl">Resultat som syns i varje reflektion</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
            Före/efter, keramisk coating, interiör, polering och detailingprocess från en premium bilvårdsupplevelse.
          </p>
          <button className="primary-button mt-8 px-7 py-4" onClick={() => openBooking()}>
            Boka Tid <ArrowRight size={19} />
          </button>
        </div>
      </section>

      <AnimatedSection className="section-padding">
        <div className="container-xl">
          <SectionHeading eyebrow="Före & efter" title="Dra reglaget och jämför skillnaden" align="center">
            Lacken får djupare ton, klarare reflektioner och en mer exklusiv finish efter professionell rekond och polering.
          </SectionHeading>
          <div className="mt-10">
            <BeforeAfter before={images.silverCar} after={images.redCar} />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-white/65 dark:bg-white/[0.025]">
        <div className="container-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Bildbank" title="Lyxbilar, process och detaljarbete" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`rounded-full px-4 py-2 text-sm font-black transition ${
                    filter === category
                      ? "bg-vikingRed text-white shadow-glow"
                      : "border border-black/10 bg-white text-ink dark:border-white/10 dark:bg-white/10 dark:text-white"
                  }`}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="masonry mt-10">
            {visible.map((item, index) => (
              <button
                key={`${item.title}-${index}`}
                className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-black/10 bg-white text-left shadow-silver dark:border-white/10 dark:bg-white/[0.045]"
                onClick={() => setActiveImage(item)}
              >
                <div className="relative">
                  <img src={item.image} alt={`${item.title} hos Vikings Car Care`} className="w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
                  <Maximize2 className="absolute right-4 top-4 text-white opacity-0 transition group-hover:opacity-100" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-black uppercase text-vikingRed">{item.category}</p>
                    <h3 className="mt-1 text-lg font-black text-white">{item.title}</h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-carbon text-white">
        <div className="container-xl grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10">
            <img src={images.detailing} alt="Detaljerad bilvårdsprocess i verkstad" className="aspect-video w-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <button className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-vikingRed text-white shadow-glow" aria-label="Processfilm">
              <Play fill="currentColor" />
            </button>
            <p className="absolute bottom-5 left-5 rounded-full bg-white/10 px-4 py-2 text-sm font-black backdrop-blur">
              Video section
            </p>
          </div>
          <div>
            <p className="eyebrow text-zinc-300">Processfilm</p>
            <h2 className="mt-4 text-4xl font-black md:text-6xl">Följ resan från smuts till showroom-känsla</h2>
            <p className="mt-6 leading-8 text-zinc-300">
              Videoområdet är förberett för en egen film från verkstaden. Det fungerar som en premium presentation av
              tvätt, dekontaminering, polering och keramisk lackförsegling.
            </p>
            <button className="primary-button mt-8" onClick={() => openBooking()}>
              Boka Tid
            </button>
          </div>
        </div>
      </AnimatedSection>

      <CTA title="Vill du se din bil här?" text="Boka rekond, polering eller keramisk lackförsegling så skapar vi en finish värdig galleriet." />

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/88 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <button className="icon-button absolute right-5 top-5 border-white/10 bg-white/10 text-white" aria-label="Stäng bild">
              <X />
            </button>
            <motion.img
              src={activeImage.image}
              alt={activeImage.title}
              className="max-h-[85vh] rounded-3xl object-contain shadow-2xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
