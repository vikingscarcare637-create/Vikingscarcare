import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CalendarDays, Languages, Menu, Moon, Phone, Sun, X } from "lucide-react";
import { company, navItems } from "../data/site";
import { useApp } from "../context/useApp";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, language, toggleTheme, toggleLanguage, openBooking } = useApp();

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3 py-2 text-sm font-bold transition ${
      isActive
        ? "bg-vikingRed text-white"
        : "text-zinc-700 hover:bg-black/5 hover:text-vikingRed dark:text-zinc-200 dark:hover:bg-white/10"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/78 backdrop-blur-2xl dark:border-white/10 dark:bg-carbon/78">
      <div className="container-xl flex h-20 items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-3" aria-label="Vikings Car Care hem">
          <img src={company.logo} alt="Vikings Car Care logo" className="h-12 w-auto" />
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Huvudmeny">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} className={navClass}>
              {language === "sv" ? item.sv : item.en}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a className="secondary-button px-4 py-2.5" href={company.phoneHref}>
            <Phone size={17} /> Ring
          </a>
          <button className="icon-button" onClick={toggleLanguage} aria-label="Byt språk">
            <Languages size={19} />
            <span className="sr-only">{language === "sv" ? "English" : "Svenska"}</span>
          </button>
          <button className="icon-button" onClick={toggleTheme} aria-label="Byt färgtema">
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button className="primary-button px-5 py-2.5" onClick={() => openBooking()}>
            <CalendarDays size={18} /> Boka Tid
          </button>
        </div>

        <button className="icon-button lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Öppna meny">
          <Menu />
        </button>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 bg-carbon/95 p-4 text-white backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between">
            <img src={company.logo} alt="Vikings Car Care logo" className="h-14 w-auto" />
            <button className="icon-button border-white/10 bg-white/10 text-white" onClick={() => setMobileOpen(false)} aria-label="Stäng meny">
              <X />
            </button>
          </div>
          <nav className="mt-10 grid gap-3" aria-label="Mobil meny">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-lg font-black"
              >
                {language === "sv" ? item.sv : item.en}
              </NavLink>
            ))}
          </nav>
          <div className="mt-8 grid gap-3">
            <button
              className="primary-button justify-center py-4"
              onClick={() => {
                setMobileOpen(false);
                openBooking();
              }}
            >
              <CalendarDays size={18} /> Boka Tid
            </button>
            <a className="secondary-button justify-center border-white/10 bg-white/10 py-4 text-white" href={company.phoneHref}>
              <Phone size={18} /> Ring Nu
            </a>
            <div className="grid grid-cols-2 gap-3">
              <button className="secondary-button justify-center border-white/10 bg-white/10 text-white" onClick={toggleLanguage}>
                <Languages size={18} /> {language === "sv" ? "EN" : "SV"}
              </button>
              <button className="secondary-button justify-center border-white/10 bg-white/10 text-white" onClick={toggleTheme}>
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />} Tema
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
