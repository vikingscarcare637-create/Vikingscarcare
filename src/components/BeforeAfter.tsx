import { useState } from "react";
import { images } from "../data/site";

export function BeforeAfter({
  before = images.blackCar,
  after = images.redCar,
  title = "Före och efter professionell bilrekond"
}: {
  before?: string;
  after?: string;
  title?: string;
}) {
  const [value, setValue] = useState(52);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-carbon shadow-2xl">
      <div className="relative aspect-[16/10] min-h-[320px]">
        <img src={after} alt={`${title} efter behandling`} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${value}%` }}>
          <img src={before} alt={`${title} före behandling`} className="h-full w-[100vw] max-w-none object-cover md:w-[900px]" />
        </div>
        <div className="absolute inset-y-0 z-10 w-1 bg-white shadow-glow" style={{ left: `${value}%` }} />
        <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-sm font-bold text-white backdrop-blur">
          Före
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-vikingRed px-3 py-1 text-sm font-bold text-white">
          Efter
        </div>
        <input
          className="absolute inset-x-6 bottom-6 z-20 accent-vikingRed"
          type="range"
          min="20"
          max="80"
          value={value}
          aria-label="Jämför före och efter"
          onChange={(event) => setValue(Number(event.target.value))}
        />
      </div>
    </div>
  );
}
