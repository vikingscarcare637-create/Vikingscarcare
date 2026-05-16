import { Link } from "react-router-dom";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import { company, navItems, services } from "../data/site";
import { getLocalizedBlogArticles, localizeService, uiText } from "../data/localization";
import { useApp } from "../context/useApp";

export function Footer() {
  const { language, openBooking } = useApp();
  const copy = uiText[language];
  const blogArticles = getLocalizedBlogArticles(language);

  return (
    <footer className="border-t border-white/10 bg-carbon pb-24 pt-14 text-white md:pb-8">
      <div className="container-xl">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.15fr_0.7fr_1fr_0.9fr_1fr]">
          <div>
            <img src={company.logo} alt="Vikings Car Care logo" className="h-20 w-44 rounded-xl object-contain object-left" />
            <p className="mt-5 max-w-sm leading-7 text-zinc-300">{copy.footerDescription}</p>
            <p className="mt-4 rounded-2xl border border-vikingRed/30 bg-vikingRed/10 p-4 text-sm font-bold text-white">
              {copy.warranty}
            </p>
            <button className="primary-button mt-5" onClick={() => openBooking()}>
              <CalendarDays size={18} /> {copy.book}
            </button>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase text-metal">{copy.footerPages}</h3>
            <div className="mt-4 grid gap-3">
              {navItems.map((item) => (
                <Link key={item.href} to={item.href} className="text-zinc-300 transition hover:text-white">
                  {language === "sv" ? item.sv : item.en}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase text-metal">{copy.footerBlog}</h3>
            <div className="mt-4 grid gap-3">
              {blogArticles.map((article) => (
                <Link key={article.slug} to={`/blogg#${article.slug}`} className="text-zinc-300 transition hover:text-white">
                  {article.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase text-metal">{copy.footerPopular}</h3>
            <div className="mt-4 grid gap-3">
              {services.slice(0, 6).map((service) => (
                <button key={service.slug} className="text-left text-zinc-300 transition hover:text-white" onClick={() => openBooking(service.title)}>
                  {localizeService(service, language).displayTitle}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase text-metal">{copy.footerContact}</h3>
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
          <p>© {new Date().getFullYear()} Vikings Car Care. {copy.footerRights}</p>
          <p>{copy.footerKeywords}</p>
        </div>
      </div>
    </footer>
  );
}
