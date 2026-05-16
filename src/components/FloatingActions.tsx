import { CalendarDays, MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { company } from "../data/site";
import { uiText } from "../data/localization";
import { useApp } from "../context/useApp";

export function FloatingActions() {
  const { language, openBooking } = useApp();
  const location = useLocation();
  const copy = uiText[language];
  const hideWhatsApp = location.pathname === "/kontakta-oss";

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 hidden flex-col gap-3 md:flex">
        {!hideWhatsApp ? (
          <a
            href={company.whatsapp}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-emerald-500 text-white shadow-2xl transition hover:scale-105"
            aria-label={language === "sv" ? "Kontakta Vikings Car Care via WhatsApp" : "Contact Vikings Car Care via WhatsApp"}
          >
            <MessageCircle size={24} />
          </a>
        ) : null}
        <button
          className="flex h-14 w-14 items-center justify-center rounded-full bg-vikingRed text-white shadow-glow transition hover:scale-105"
          onClick={() => openBooking()}
          aria-label={copy.book}
        >
          <CalendarDays size={24} />
        </button>
      </div>
      <div className={`fixed inset-x-3 bottom-3 z-40 grid gap-3 md:hidden ${hideWhatsApp ? "grid-cols-1" : "grid-cols-2"}`}>
        {!hideWhatsApp ? (
          <a className="secondary-button justify-center border-emerald-500/30 bg-emerald-500 text-white" href={company.whatsapp}>
            <MessageCircle size={18} /> WhatsApp
          </a>
        ) : null}
        <button className="primary-button justify-center" onClick={() => openBooking()}>
          <CalendarDays size={18} /> {copy.book}
        </button>
      </div>
    </>
  );
}
