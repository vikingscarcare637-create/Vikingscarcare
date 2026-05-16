import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Service } from "../data/site";
import { localizeService, uiText } from "../data/localization";
import { useApp } from "../context/useApp";

export function ServiceCard({ service }: { service: Service }) {
  const { language, openBooking } = useApp();
  const localized = localizeService(service, language);
  const copy = uiText[language];

  return (
    <motion.article
      className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-silver transition duration-300 hover:-translate-y-1 hover:border-vikingRed/40 dark:border-white/10 dark:bg-white/[0.045]"
      whileHover={{ y: -5 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={service.image}
          alt={`${localized.displayTitle} ${language === "sv" ? "hos" : "at"} Vikings Car Care ${language === "sv" ? "i" : "in"} Karlskrona`}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs font-bold uppercase text-white backdrop-blur">
          {localized.displayCategory}
        </span>
        <p className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1 text-sm font-black text-carbon">
          {localized.displayPriceFrom}
        </p>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-black text-ink dark:text-white">{localized.displayTitle}</h3>
        <p className="mt-3 min-h-[96px] text-sm leading-7 text-zinc-600 dark:text-zinc-300">{localized.displayDescription}</p>
        <button className="primary-button mt-5 w-full justify-center" onClick={() => openBooking(service.title)}>
          {copy.book} <ArrowRight size={18} />
        </button>
      </div>
    </motion.article>
  );
}
