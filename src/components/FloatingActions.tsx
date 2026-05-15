import { CalendarDays, MessageCircle } from "lucide-react";
import { company } from "../data/site";
import { useApp } from "../context/useApp";

export function FloatingActions() {
  const { openBooking } = useApp();

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 hidden flex-col gap-3 md:flex">
        <a
          href={company.whatsapp}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-emerald-500 text-white shadow-2xl transition hover:scale-105"
          aria-label="Kontakta Vikings Car Care via WhatsApp"
        >
          <MessageCircle size={24} />
        </a>
        <button
          className="flex h-14 w-14 items-center justify-center rounded-full bg-vikingRed text-white shadow-glow transition hover:scale-105"
          onClick={() => openBooking()}
          aria-label="Boka tid"
        >
          <CalendarDays size={24} />
        </button>
      </div>
      <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-3 md:hidden">
        <a className="secondary-button justify-center border-emerald-500/30 bg-emerald-500 text-white" href={company.whatsapp}>
          <MessageCircle size={18} /> WhatsApp
        </a>
        <button className="primary-button justify-center" onClick={() => openBooking()}>
          <CalendarDays size={18} /> Boka Tid
        </button>
      </div>
    </>
  );
}
