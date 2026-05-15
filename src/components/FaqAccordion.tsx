import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.question} className="rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.045]">
          <button
            className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold text-ink dark:text-white"
            onClick={() => setOpen((current) => (current === index ? -1 : index))}
            aria-expanded={open === index}
          >
            {item.question}
            <ChevronDown className={`shrink-0 transition ${open === index ? "rotate-180 text-vikingRed" : ""}`} />
          </button>
          {open === index ? (
            <div className="px-5 pb-5 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{item.answer}</div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
