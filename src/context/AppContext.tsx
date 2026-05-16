import { ReactNode, useEffect, useMemo, useState } from "react";
import { AppContext, AppContextValue, Language, Theme } from "./contextStore";

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = window.localStorage.getItem("vcc-theme") as Theme | null;
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });
  const [language, setLanguage] = useState<Language>(() => {
    const saved = window.localStorage.getItem("vcc-language") as Language | null;
    return saved === "en" ? "en" : "sv";
  });
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("vcc-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("vcc-language", language);
  }, [language]);

  const value = useMemo<AppContextValue>(
    () => ({
      theme,
      language,
      bookingOpen,
      selectedService,
      toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
      toggleLanguage: () => setLanguage((current) => (current === "sv" ? "en" : "sv")),
      setLanguage,
      openBooking: (service?: string) => {
        setSelectedService(service ?? "");
        setBookingOpen(true);
      },
      closeBooking: () => setBookingOpen(false)
    }),
    [bookingOpen, language, selectedService, theme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
