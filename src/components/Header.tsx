import { ChangeEvent, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CalendarDays, ChevronDown, Menu, Moon, Phone, Sun, X } from "lucide-react";
import { company, navItems, services } from "../data/site";
import { getServiceCategoryPages, localizeService } from "../data/localization";
import type { Language } from "../context/contextStore";
import { useApp } from "../context/useApp";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [overLightSection, setOverLightSection] = useState(false);
  const location = useLocation();
  const { theme, language, setLanguage, toggleTheme, openBooking } = useApp();

  const isTransparent = !overLightSection;
  const labels = {
    call: language === "sv" ? "Ring" : "Call",
    callNow: language === "sv" ? "Ring Nu" : "Call Now",
    book: language === "sv" ? "Boka Tid" : "Book Now",
    menu: language === "sv" ? "Öppna meny" : "Open menu",
    close: language === "sv" ? "Stäng meny" : "Close menu",
    theme: language === "sv" ? "Tema" : "Theme",
    mainMenu: language === "sv" ? "Huvudmeny" : "Main menu",
    mobileMenu: language === "sv" ? "Mobil meny" : "Mobile menu",
    language: language === "sv" ? "Välj språk" : "Choose language",
    home: language === "sv" ? "Vikings Car Care hem" : "Vikings Car Care home",
    themeToggle: language === "sv" ? "Byt färgtema" : "Change color theme"
  };
  const localizedServices = services.map((service) => localizeService(service, language));
  const serviceCategories = getServiceCategoryPages(language);
  const getServicesForCategory = (categories: string[]) =>
    localizedServices.filter((service) => categories.includes(service.category));

  useEffect(() => {
    const updateHeaderTone = () => {
      const firstSection = document.querySelector("main section");
      const heroBottom = firstSection
        ? firstSection.getBoundingClientRect().bottom + window.scrollY
        : window.innerHeight * 0.85;

      setOverLightSection(window.scrollY + 88 >= heroBottom);
    };

    const frame = window.requestAnimationFrame(updateHeaderTone);
    window.addEventListener("scroll", updateHeaderTone, { passive: true });
    window.addEventListener("resize", updateHeaderTone);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHeaderTone);
      window.removeEventListener("resize", updateHeaderTone);
    };
  }, [location.pathname]);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-bold transition ${
      isActive
        ? "bg-vikingRed text-white"
        : isTransparent
          ? "text-white hover:bg-white/10 hover:text-white"
          : "text-zinc-800 hover:bg-black/5 hover:text-vikingRed dark:text-zinc-200 dark:hover:bg-white/10"
    }`;

  const utilityButtonClass = isTransparent
    ? "secondary-button border-white/20 bg-white/10 text-white"
    : "secondary-button";

  const iconButtonClass = isTransparent ? "icon-button border-white/20 bg-white/10 text-white" : "icon-button";

  const languageSelectClass = `language-select appearance-none rounded-full border px-4 py-2.5 pr-9 text-sm font-black uppercase outline-none transition focus:ring-4 focus:ring-vikingRed/25 ${
    isTransparent
      ? "border-white/20 bg-white/10 text-white"
      : "border-black/10 bg-white/85 text-ink dark:border-white/10 dark:bg-white/10 dark:text-white"
  }`;

  const changeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as Language);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-2xl transition duration-300 ${
        isTransparent
          ? "border-transparent bg-transparent"
          : "border-black/10 bg-white/88 shadow-lg dark:border-white/10 dark:bg-carbon/88"
      }`}
    >
      <div className="container-xl flex h-20 items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-3" aria-label={labels.home}>
          <img src={company.logo} alt="Vikings Car Care logo" className="h-14 w-36 rounded-lg object-contain object-left" />
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={labels.mainMenu}>
          {navItems.map((item) =>
            item.href === "/tjanster" ? (
              <div key={item.href} className="group relative">
                <NavLink to={item.href} className={navClass}>
                  {language === "sv" ? item.sv : item.en}
                  <ChevronDown size={14} />
                </NavLink>
                <div className="pointer-events-none absolute left-0 top-full z-[60] mt-3 w-[760px] rounded-2xl border border-black/10 bg-white p-3 text-ink opacity-0 shadow-2xl transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 dark:border-white/10 dark:bg-carbon dark:text-white">
                  <div className="grid max-h-[560px] gap-3 overflow-y-auto pr-1 md:grid-cols-2">
                    {serviceCategories.map((category) => (
                      <div key={category.slug} className="rounded-2xl bg-zinc-50 p-3 dark:bg-white/[0.06]">
                        <Link
                          to={category.href}
                          className="block rounded-xl border border-black/10 bg-white p-3 transition hover:border-vikingRed/40 hover:text-vikingRed dark:border-white/10 dark:bg-carbon/70"
                        >
                          <span className="flex items-center justify-between gap-3 text-sm font-black">
                            {category.title}
                            <span className="rounded-full bg-vikingRed px-2 py-1 text-[10px] uppercase text-white">
                              {category.serviceCount}
                            </span>
                          </span>
                          <span className="mt-1 block text-xs font-bold leading-5 text-zinc-500 dark:text-zinc-400">
                            {category.menuDescription}
                          </span>
                        </Link>
                        <div className="mt-2 grid gap-1">
                          {getServicesForCategory(category.categories).map((service) => (
                            <Link
                              key={service.slug}
                              to={`${category.href}#service-${service.slug}`}
                              className="rounded-lg px-3 py-2 text-xs font-black transition hover:bg-vikingRed/10 hover:text-vikingRed"
                            >
                              <span className="block">{service.displayTitle}</span>
                              <span className="mt-0.5 block font-bold text-zinc-500 dark:text-zinc-400">
                                {service.displayPriceFrom}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink key={item.href} to={item.href} className={navClass}>
                {language === "sv" ? item.sv : item.en}
              </NavLink>
            )
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a className={`${utilityButtonClass} px-4 py-2.5`} href={company.phoneHref}>
            <Phone size={17} /> {labels.call}
          </a>
          <label className="relative">
            <span className="sr-only">{labels.language}</span>
            <select className={languageSelectClass} value={language} onChange={changeLanguage} aria-label={labels.language}>
              <option value="sv">SV Svenska</option>
              <option value="en">EN English</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" size={16} />
          </label>
          <button className={iconButtonClass} onClick={toggleTheme} aria-label={labels.themeToggle}>
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button className="primary-button px-5 py-2.5" onClick={() => openBooking()}>
            <CalendarDays size={18} /> {labels.book}
          </button>
        </div>

        <button className={`${iconButtonClass} lg:hidden`} onClick={() => setMobileOpen(true)} aria-label={labels.menu}>
          <Menu />
        </button>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[100] min-h-dvh overflow-y-auto bg-[#050505] p-4 pb-28 text-white shadow-2xl backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between">
            <img src={company.logo} alt="Vikings Car Care logo" className="h-16 w-40 rounded-lg object-contain object-left" />
            <button className="icon-button border-white/10 bg-white/10 text-white" onClick={() => setMobileOpen(false)} aria-label={labels.close}>
              <X />
            </button>
          </div>
          <nav className="mt-8 grid gap-3" aria-label={labels.mobileMenu}>
            {navItems.map((item) =>
              item.href === "/tjanster" ? (
                <div key={item.href} className="overflow-hidden rounded-2xl border border-white/10 bg-white text-ink shadow-xl">
                  <NavLink
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-5 py-4 text-lg font-black"
                  >
                    {language === "sv" ? item.sv : item.en}
                    <ChevronDown size={18} />
                  </NavLink>
                  <div className="grid max-h-[62vh] gap-3 overflow-y-auto border-t border-black/10 bg-zinc-50 p-3">
                    {serviceCategories.map((category) => (
                      <div key={category.slug} className="rounded-2xl border border-black/10 bg-white p-3 shadow-sm">
                        <Link
                          to={category.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-start justify-between gap-3 rounded-xl bg-zinc-50 px-3 py-3 text-ink transition hover:text-vikingRed"
                        >
                          <span>
                            <span className="block text-sm font-black">{category.title}</span>
                            <span className="mt-1 block text-xs font-bold leading-5 text-zinc-500">
                              {category.menuDescription}
                            </span>
                          </span>
                          <span className="rounded-full bg-vikingRed px-2 py-1 text-[10px] font-black text-white">
                            {category.serviceCount}
                          </span>
                        </Link>
                        <div className="mt-2 grid gap-1">
                          {getServicesForCategory(category.categories).map((service) => (
                            <Link
                              key={service.slug}
                              to={`${category.href}#service-${service.slug}`}
                              onClick={() => setMobileOpen(false)}
                              className="rounded-lg px-3 py-2 text-xs font-black text-zinc-700 transition hover:bg-vikingRed/10 hover:text-vikingRed"
                            >
                              {service.displayTitle}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl bg-white px-5 py-4 text-lg font-black text-ink shadow-xl transition hover:text-vikingRed"
                >
                  {language === "sv" ? item.sv : item.en}
                </NavLink>
              )
            )}
          </nav>
          <div className="mt-8 grid gap-3">
            <button
              className="primary-button justify-center py-4"
              onClick={() => {
                setMobileOpen(false);
                openBooking();
              }}
            >
              <CalendarDays size={18} /> {labels.book}
            </button>
            <a className="secondary-button justify-center border-white/10 bg-white/10 py-4 text-white" href={company.phoneHref}>
              <Phone size={18} /> {labels.callNow}
            </a>
            <div className="grid grid-cols-2 gap-3">
              <label className="relative">
                <span className="sr-only">{labels.language}</span>
                <select
                  className="language-select w-full appearance-none rounded-full border border-white/10 bg-white/10 px-5 py-3 pr-9 text-center text-sm font-black uppercase text-white outline-none"
                  value={language}
                  onChange={changeLanguage}
                  aria-label={labels.language}
                >
                  <option value="sv">SV Svenska</option>
                  <option value="en">EN English</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" size={16} />
              </label>
              <button className="secondary-button justify-center border-white/10 bg-white/10 text-white" onClick={toggleTheme}>
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />} {labels.theme}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
