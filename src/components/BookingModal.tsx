import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Mail, MessageCircle, X } from "lucide-react";
import { company, services } from "../data/site";
import { useApp } from "../context/useApp";

type BookingFormState = {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  service: string;
  date: string;
  time: string;
  message: string;
};

const initialState: BookingFormState = {
  name: "",
  phone: "",
  email: "",
  vehicle: "",
  service: "",
  date: "",
  time: "",
  message: ""
};

export function BookingModal() {
  const { bookingOpen, closeBooking, selectedService } = useApp();
  const [form, setForm] = useState<BookingFormState>(initialState);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (bookingOpen) {
      setForm((current) => ({ ...current, service: selectedService || current.service }));
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [bookingOpen, selectedService]);

  const update = (field: keyof BookingFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = [
      "Ny bokningsförfrågan till Vikings Car Care",
      "",
      `Namn: ${form.name}`,
      `Telefon: ${form.phone}`,
      `E-post: ${form.email}`,
      `Fordon: ${form.vehicle}`,
      `Tjänst: ${form.service}`,
      `Önskat datum: ${form.date}`,
      `Önskad tid: ${form.time}`,
      "",
      `Meddelande: ${form.message || "Inget meddelande"}`
    ].join("\n");

    const mailto = `${company.emailHref}?subject=${encodeURIComponent(
      `Bokning: ${form.service || "Bilvård"}`
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
    window.location.href = mailto;
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <AnimatePresence>
      {bookingOpen ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Boka tid"
        >
          <motion.div
            className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[28px] border border-white/15 bg-white text-ink shadow-2xl dark:bg-[#0d0d0d] dark:text-white"
            initial={{ scale: 0.94, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 24 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
          >
            <button className="icon-button absolute right-4 top-4 z-10" onClick={closeBooking} aria-label="Stäng bokning">
              <X size={20} />
            </button>
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[320px] overflow-hidden rounded-t-[28px] bg-carbon p-8 text-white lg:rounded-l-[28px] lg:rounded-tr-none">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=82')] bg-cover bg-center opacity-45" />
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/70 to-vikingRed/25" />
                <div className="relative flex h-full flex-col justify-between">
                  <img src={company.logo} alt="Vikings Car Care" className="h-20 w-44 rounded-xl object-contain object-left" />
                  <div>
                    <p className="eyebrow text-zinc-200">Snabb bokning</p>
                    <h2 className="mt-4 text-4xl font-black tracking-normal md:text-5xl">Boka premium bilvård</h2>
                    <p className="mt-5 text-zinc-200">
                      Skicka en förfrågan så återkommer vi med bekräftelse. Du kan också ringa eller skriva på WhatsApp.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a className="secondary-button border-white/20 bg-white/10 text-white" href={company.phoneHref}>
                        Ring nu
                      </a>
                      <a className="secondary-button border-white/20 bg-white/10 text-white" href={company.whatsapp}>
                        <MessageCircle size={18} /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <form className="space-y-5 p-6 md:p-8" onSubmit={submit}>
                {sent ? (
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-200">
                    <div className="flex items-center gap-2 font-bold">
                      <CheckCircle2 size={18} /> Tack! Bokningsförfrågan är förberedd.
                    </div>
                    <p className="mt-2">Din e-postapp öppnas med uppgifterna. Skicka mejlet för att slutföra förfrågan.</p>
                  </div>
                ) : null}

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="field-label">
                    Namn
                    <input required value={form.name} onChange={(event) => update("name", event.target.value)} />
                  </label>
                  <label className="field-label">
                    Telefon
                    <input required type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} />
                  </label>
                  <label className="field-label">
                    E-post
                    <input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} />
                  </label>
                  <label className="field-label">
                    Fordonstyp
                    <input
                      required
                      placeholder="Ex. SUV, sedan, elbil"
                      value={form.vehicle}
                      onChange={(event) => update("vehicle", event.target.value)}
                    />
                  </label>
                  <label className="field-label">
                    Vald tjänst
                    <select required value={form.service} onChange={(event) => update("service", event.target.value)}>
                      <option value="">Välj tjänst</option>
                      {services.map((service) => (
                        <option key={service.slug} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="field-label">
                    Önskat datum
                    <input
                      required
                      min={today}
                      type="date"
                      value={form.date}
                      onChange={(event) => update("date", event.target.value)}
                    />
                  </label>
                  <label className="field-label">
                    Önskad tid
                    <input required type="time" value={form.time} onChange={(event) => update("time", event.target.value)} />
                  </label>
                  <label className="field-label md:col-span-2">
                    Meddelande
                    <textarea
                      rows={4}
                      placeholder="Berätta gärna om bilens skick eller särskilda önskemål."
                      value={form.message}
                      onChange={(event) => update("message", event.target.value)}
                    />
                  </label>
                </div>

                <button className="primary-button w-full justify-center py-4" type="submit">
                  <CalendarDays size={19} /> Skicka bokningsförfrågan
                </button>
                <p className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <Mail size={14} /> Uppgifterna används endast för att hantera din bokning enligt GDPR.
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
