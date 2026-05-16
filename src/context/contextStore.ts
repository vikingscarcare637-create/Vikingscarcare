import { createContext } from "react";

export type Theme = "dark" | "light";
export type Language = "sv" | "en";

export type AppContextValue = {
  theme: Theme;
  language: Language;
  bookingOpen: boolean;
  selectedService: string;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  setLanguage: (language: Language) => void;
  openBooking: (service?: string) => void;
  closeBooking: () => void;
};

export const AppContext = createContext<AppContextValue | undefined>(undefined);
