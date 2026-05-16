import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { uiText } from "../data/localization";
import { useApp } from "../context/useApp";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { language } = useApp();
  const copy = uiText[language];

  useEffect(() => {
    setVisible(window.localStorage.getItem("vcc-cookies") !== "accepted");
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-3xl rounded-2xl border border-white/15 bg-carbon/95 p-4 text-white shadow-2xl backdrop-blur-xl md:bottom-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <ShieldCheck className="text-vikingRed" />
        <p className="text-sm leading-6 text-zinc-200">{copy.cookie}</p>
        <button
          className="primary-button shrink-0 justify-center"
          onClick={() => {
            window.localStorage.setItem("vcc-cookies", "accepted");
            setVisible(false);
          }}
        >
          {copy.accept}
        </button>
      </div>
    </div>
  );
}
