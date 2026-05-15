import { Link } from "react-router-dom";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import { company, navItems, services } from "../data/site";
import { useApp } from "../context/useApp";

export function Footer() {
  const { language, openBooking } = useApp();

  return (
    <footer className="border-t border-white/10 bg-carbon pb-24 pt-14 text-white md:pb-8">
      <div className="container-xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <img src={company.logo} alt="Vikings Car Care logo" className="h-20 w-44 rounded-xl object-contain object-left" />
            <p className="mt-5 max-w-sm leading-7 text-zinc-300">
              Premium bilvård, biltvätt, helrekond, bilpolering och keramisk lackförsegling i Karlskrona.
            </p>
            <p className="mt-4 rounded-2xl border border-vikingRed/30 bg-vikingRed/10 p-4 text-sm font-bold text-white">
              {company.guarantee}
            </p>
            <button className="primary-button mt-5" onClick={() => openBooking()}>
              <CalendarDays size={18} /> Boka Tid
            </button>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase text-metal">Sidor</h3>
            <div className="mt-4 grid gap-3">
              {navItems.map((item) => (
                <Link key={item.href} to={item.href} className="text-zinc-300 transition hover:text-white">
                  {language === "sv" ? item.sv : item.en}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase text-metal">Populära tjänster</h3>
            <div className="mt-4 grid gap-3">
              {services.slice(0, 6).map((service) => (
                <button key={service.slug} className="text-left text-zinc-300 transition hover:text-white" onClick={() => openBooking(service.title)}>
                  {service.title}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase text-metal">Kontakt</h3>
            <div className="mt-4 grid gap-4 text-zinc-300">
              <a className="flex gap-3 transition hover:text-white" href={company.phoneHref}>
                <Phone className="shrink-0 text-vikingRed" size={20} /> {company.phone}
              </a>
              <a className="flex gap-3 transition hover:text-white" href={company.emailHref}>
                <Mail className="shrink-0 text-vikingRed" size={20} /> {company.email}
              </a>
              <div className="flex gap-3">
                <MapPin className="shrink-0 text-vikingRed" size={20} /> {company.address}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Vikings Car Care. Alla rättigheter förbehållna.</p>
          <p>Bilvård Karlskrona | Biltvätt Karlskrona | Keramisk lackförsegling Karlskrona</p>
        </div>
      </div>
    </footer>
  );
}
