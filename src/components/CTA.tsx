import { ArrowRight, Phone } from "lucide-react";
import { company } from "../data/site";
import { uiText } from "../data/localization";
import { useApp } from "../context/useApp";

export function CTA({ title, text }: { title?: string; text?: string }) {
  const { language, openBooking } = useApp();
  const copy = uiText[language];

  return (
    <section className="section-padding">
      <div className="container-xl overflow-hidden rounded-[32px] border border-white/10 bg-carbon p-8 text-white shadow-2xl md:p-12">
        <div className="absolute" />
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="eyebrow text-zinc-300">{copy.ctaEyebrow}</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">{title ?? copy.defaultCtaTitle}</h2>
            <p className="mt-4 max-w-2xl leading-8 text-zinc-300">{text ?? copy.defaultCtaText}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <button className="primary-button justify-center px-7 py-4" onClick={() => openBooking()}>
              {copy.book} <ArrowRight size={19} />
            </button>
            <a className="secondary-button justify-center border-white/20 bg-white/10 px-7 py-4 text-white" href={company.phoneHref}>
              <Phone size={19} /> {copy.callNow}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
