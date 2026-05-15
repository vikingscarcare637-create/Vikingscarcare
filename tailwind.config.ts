import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        carbon: "#0A0A0A",
        graphite: "#1A1A1A",
        metal: "#C0C0C0",
        vikingRed: "#C1121F",
        frost: "#F6F7F8",
        ink: "#111111"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Cinzel", "serif"]
      },
      boxShadow: {
        glow: "0 0 45px rgba(193, 18, 31, 0.28)",
        silver: "0 18px 60px rgba(192, 192, 192, 0.12)"
      },
      backgroundImage: {
        "metal-line": "linear-gradient(90deg, transparent, rgba(192,192,192,.65), transparent)",
        "red-glow": "radial-gradient(circle at center, rgba(193,18,31,.32), transparent 62%)"
      }
    }
  },
  plugins: []
};

export default config;
