import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(window.localStorage.getItem("vcc-cookies") !== "accepted");
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-3xl rounded-2xl border border-white/15 bg-carbon/95 p-4 text-white shadow-2xl backdrop-blur-xl md:bottom-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <ShieldCheck className="text-vikingRed" />
        <p className="text-sm leading-6 text-zinc-200">
          Vi använder nödvändiga cookies och lokal lagring för tema, språk och bokningsupplevelse. Inga uppgifter säljs vidare.
        </p>
        <button
          className="primary-button shrink-0 justify-center"
          onClick={() => {
            window.localStorage.setItem("vcc-cookies", "accepted");
            setVisible(false);
          }}
        >
          Acceptera
        </button>
      </div>
    </div>
  );
}
