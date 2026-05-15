import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  Mail,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  X
} from "lucide-react";
import { company, services } from "../data/site";
import { useApp } from "../context/useApp";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

type BookingStep = "select" | "details";

type BookingFormState = {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  registration: string;
  service: string;
  date: string;
  dropoffTime: string;
  message: string;
  humanConfirmed: boolean;
};

type BookingInsertError = {
  code?: string;
  message?: string;
};

const defaultDropoffTime = "09:00";
const pickupTime = "18:00";
const timeSlots = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];
const featuredServices = ["Stor rekond", "Keramisk lackförsegling", "Steg 3 polering", "In- och utvändig tvätt"];

const initialState: BookingFormState = {
  name: "",
  phone: "",
  email: "",
  vehicle: "",
  registration: "",
  service: "",
  date: "",
  dropoffTime: defaultDropoffTime,
  message: "",
  humanConfirmed: false
};

const toIsoDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const dateFromIso = (isoDate: string) => {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const getDateFromOffset = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return toIsoDate(date);
};

const formatLongDate = (isoDate: string) =>
  isoDate
    ? new Intl.DateTimeFormat("sv-SE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }).format(dateFromIso(isoDate))
    : "Välj datum";

const formatShortDate = (isoDate: string) =>
  new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "short" }).format(dateFromIso(isoDate));

const formatWeekday = (isoDate: string) =>
  new Intl.DateTimeFormat("sv-SE", { weekday: "short" }).format(dateFromIso(isoDate));

const servicePriceText = (serviceTitle: string) => {
  const service = services.find((item) => item.title === serviceTitle);
  return service?.priceFrom.replace("kr", "SEK") ?? "Offert";
};

const isLegacyColumnError = (error: BookingInsertError) => {
  const text = `${error.code ?? ""} ${error.message ?? ""}`.toLowerCase();
  return (
    text.includes("pgrst204") ||
    text.includes("registration_number") ||
    text.includes("price_text") ||
    text.includes("dropoff_time") ||
    text.includes("pickup_time")
  );
};

const friendlyBookingError = (error: BookingInsertError) => {
  const text = `${error.code ?? ""} ${error.message ?? ""}`.toLowerCase();

  if (text.includes("pgrst205") || text.includes("could not find") || text.includes("schema cache")) {
    return "Bokningen kunde inte skickas online just nu. Skicka via e-post eller WhatsApp så hjälper vi dig direkt.";
  }

  return "Bokningen kunde inte skickas just nu. Skicka via e-post eller kontakta oss via WhatsApp så hjälper vi dig direkt.";
};

export function BookingModal() {
  const { bookingOpen, closeBooking, selectedService } = useApp();
  const [step, setStep] = useState<BookingStep>("select");
  const [form, setForm] = useState<BookingFormState>(initialState);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const selectedServiceInfo = useMemo(() => services.find((service) => service.title === form.service), [form.service]);
  const selectedPrice = useMemo(() => servicePriceText(form.service), [form.service]);
  const dateCards = useMemo(
    () =>
      Array.from({ length: 10 }, (_, index) => {
        const date = getDateFromOffset(index + 1);
        return {
          date,
          weekday: formatWeekday(date),
          label: formatShortDate(date)
        };
      }),
    []
  );

  useEffect(() => {
    if (bookingOpen) {
      const defaultService = services.some((service) => service.title === selectedService) ? selectedService : "Stor rekond";

      setForm((current) => ({
        ...current,
        service: defaultService || current.service || services[0]?.title || "",
        date: current.date || getDateFromOffset(1),
        dropoffTime: current.dropoffTime || defaultDropoffTime,
        humanConfirmed: false
      }));
      setStep("select");
      setSent(false);
      setErrorMessage("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [bookingOpen, selectedService]);

  const update = (field: keyof BookingFormState, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const buildMailto = () => {
    const body = [
      "Ny bokningsförfrågan till Vikings Car Care",
      "",
      `Tjänst: ${form.service}`,
      `Pris: ${selectedPrice}`,
      `Datum: ${formatLongDate(form.date)}`,
      `Lämning: ${form.dropoffTime}`,
      `Hämtning: ${pickupTime}`,
      "",
      `Namn: ${form.name}`,
      `Telefon: ${form.phone}`,
      `E-post: ${form.email}`,
      `Fordonstyp: ${form.vehicle}`,
      `Reg.nr: ${form.registration || "Ej angivet"}`,
      "",
      `Meddelande: ${form.message || "Inget meddelande"}`
    ].join("\n");

    return `${company.emailHref}?subject=${encodeURIComponent(`Bokning: ${form.service || "Bilvård"}`)}&body=${encodeURIComponent(
      body
    )}`;
  };

  const continueToDetails = () => {
    if (!form.service || !form.date || !form.dropoffTime) {
      setErrorMessage("Välj tjänst, datum och inlämningstid först.");
      return;
    }

    setErrorMessage("");
    setStep("details");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!form.humanConfirmed) {
      setErrorMessage("Bekräfta bokningsförfrågan innan du skickar.");
      return;
    }

    setSubmitting(true);

    if (!isSupabaseConfigured || !supabase) {
      setSent(true);
      setSubmitting(false);
      window.location.href = buildMailto();
      return;
    }

    const bookingPayload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      vehicle_type: form.vehicle.trim(),
      selected_service: form.service,
      preferred_date: form.date,
      preferred_time: form.dropoffTime,
      registration_number: form.registration.trim() || null,
      price_text: selectedPrice,
      dropoff_time: form.dropoffTime,
      pickup_time: pickupTime,
      message: form.message.trim() || null,
      source: "website"
    };

    let { error } = await supabase.from("bookings").insert(bookingPayload);

    if (error && isLegacyColumnError(error)) {
      const fallbackMessage = [
        form.message.trim(),
        form.registration.trim() ? `Reg.nr: ${form.registration.trim()}` : "",
        `Pris: ${selectedPrice}`,
        `Lämning: ${form.dropoffTime}`,
        `Hämtning: ${pickupTime}`
      ]
        .filter(Boolean)
        .join("\n");

      const fallback = await supabase.from("bookings").insert({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        vehicle_type: form.vehicle.trim(),
        selected_service: form.service,
        preferred_date: form.date,
        preferred_time: form.dropoffTime,
        message: fallbackMessage || null,
        source: "website"
      });

      error = fallback.error;
    }

    setSubmitting(false);

    if (error) {
      console.error("Booking insert failed", error);
      setErrorMessage(friendlyBookingError(error));
      return;
    }

    setSent(true);
  };

  const minimumDate = getDateFromOffset(0);

  return (
    <AnimatePresence>
      {bookingOpen ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 backdrop-blur-xl md:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Boka tid"
        >
          <motion.div
            className={`relative max-h-[94vh] w-full overflow-y-auto rounded-[28px] border border-white/15 bg-white text-ink shadow-2xl dark:bg-[#0d0d0d] dark:text-white ${
              step === "details" || sent ? "max-w-3xl" : "max-w-5xl"
            }`}
            initial={{ scale: 0.94, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 24 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
          >
            <button className="icon-button absolute right-4 top-4 z-20" type="button" onClick={closeBooking} aria-label="Stäng bokning">
              <X size={20} />
            </button>

            {sent ? (
              <SuccessState service={form.service} date={form.date} onClose={closeBooking} mailto={buildMailto()} />
            ) : step === "select" ? (
              <form className="grid lg:grid-cols-[0.92fr_1.08fr]" onSubmit={(event) => event.preventDefault()}>
                <div className="relative min-h-[360px] overflow-hidden rounded-t-[28px] bg-carbon p-7 text-white lg:rounded-l-[28px] lg:rounded-tr-none md:p-8">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-45"
                    style={{ backgroundImage: `url(${selectedServiceInfo?.image ?? company.logo})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black via-black/75 to-vikingRed/30" />
                  <div className="relative flex h-full flex-col justify-between gap-10">
                    <img src={company.logo} alt="Vikings Car Care" className="h-20 w-44 rounded-xl object-contain object-left" />
                    <div>
                      <p className="eyebrow text-zinc-200">Snabb bokning</p>
                      <h2 className="mt-4 text-4xl font-black tracking-normal md:text-5xl">Välj tid för premium bilvård</h2>
                      <p className="mt-5 max-w-md text-zinc-200">
                        Skicka en bokningsförfrågan så återkommer vi med bekräftelse. Du kan också ringa eller skriva på WhatsApp.
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

                <div className="space-y-6 p-6 md:p-8">
                  {errorMessage ? <ErrorNotice message={errorMessage} mailto={buildMailto()} /> : null}

                  <div>
                    <p className="eyebrow">Steg 1 av 2</p>
                    <h3 className="mt-2 text-3xl font-black">Välj tjänst och datum</h3>
                  </div>

                  <label className="field-label">
                    Tjänst
                    <select required value={form.service} onChange={(event) => update("service", event.target.value)}>
                      {services.map((service) => (
                        <option key={service.slug} value={service.title}>
                          {service.title} - {service.priceFrom}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {featuredServices.map((serviceTitle) => {
                      const service = services.find((item) => item.title === serviceTitle);
                      if (!service) return null;

                      const active = form.service === service.title;
                      return (
                        <button
                          key={service.slug}
                          type="button"
                          className={`group overflow-hidden rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 ${
                            active
                              ? "border-vikingRed bg-vikingRed/10 shadow-glow"
                              : "border-black/10 bg-zinc-50 hover:border-vikingRed/40 dark:border-white/10 dark:bg-white/[0.055]"
                          }`}
                          onClick={() => update("service", service.title)}
                        >
                          <div className="flex items-center gap-3">
                            <img src={service.image} alt={service.title} className="h-16 w-20 rounded-xl object-cover" />
                            <div>
                              <p className="font-black">{service.title}</p>
                              <p className="mt-1 text-sm font-bold text-vikingRed">{service.priceFrom}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm font-black">
                      <CalendarDays className="text-vikingRed" size={18} /> Välj datum
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                      {dateCards.map((card) => (
                        <button
                          key={card.date}
                          type="button"
                          className={`rounded-2xl border px-3 py-3 text-center transition hover:-translate-y-0.5 ${
                            form.date === card.date
                              ? "border-vikingRed bg-vikingRed text-white shadow-glow"
                              : "border-black/10 bg-zinc-50 hover:border-vikingRed/40 dark:border-white/10 dark:bg-white/[0.055]"
                          }`}
                          onClick={() => update("date", card.date)}
                        >
                          <span className="block text-xs font-black uppercase">{card.weekday}</span>
                          <span className="mt-1 block text-sm font-bold">{card.label}</span>
                        </button>
                      ))}
                    </div>
                    <label className="field-label mt-3">
                      Annat datum
                      <input required min={minimumDate} type="date" value={form.date} onChange={(event) => update("date", event.target.value)} />
                    </label>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm font-black">
                      <Clock className="text-vikingRed" size={18} /> Inlämningstid
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          className={`rounded-2xl border px-3 py-3 text-sm font-black transition hover:-translate-y-0.5 ${
                            form.dropoffTime === time
                              ? "border-vikingRed bg-vikingRed text-white shadow-glow"
                              : "border-black/10 bg-zinc-50 hover:border-vikingRed/40 dark:border-white/10 dark:bg-white/[0.055]"
                          }`}
                          onClick={() => update("dropoffTime", time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button className="primary-button w-full justify-center py-4" type="button" onClick={continueToDetails}>
                    Fortsätt <Sparkles size={18} />
                  </button>
                </div>
              </form>
            ) : (
              <form className="p-5 md:p-8" onSubmit={submit}>
                <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <button
                    className="inline-flex items-center gap-2 text-sm font-bold text-zinc-600 transition hover:text-vikingRed dark:text-zinc-300"
                    type="button"
                    onClick={() => {
                      setErrorMessage("");
                      setStep("select");
                    }}
                  >
                    <ArrowLeft size={18} /> Tillbaka
                  </button>
                  <h2 className="text-center text-xl font-black md:text-2xl">Dina uppgifter</h2>
                  <span />
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-[#fff8ef] p-4 text-sm leading-7 dark:bg-white/[0.06]">
                    <p>
                      <span className="font-black">Tjänst:</span> {form.service}
                    </p>
                    <p>
                      <span className="font-black">Pris:</span> <span className="font-black text-[#ff8a00]">{selectedPrice}</span>
                    </p>
                    <p>
                      <span className="font-black">Datum:</span> {formatLongDate(form.date)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-[#ff8a00]/35 bg-[#fff3df] p-4 text-sm font-bold dark:bg-[#ff8a00]/10">
                    <AlertCircle className="shrink-0 text-[#ff8a00]" size={19} />
                    <span>
                      Lämna bilen kl {form.dropoffTime} och hämta kl {pickupTime}
                    </span>
                  </div>

                  {errorMessage ? <ErrorNotice message={errorMessage} mailto={buildMailto()} /> : null}

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="field-label">
                      Namn *
                      <input required value={form.name} onChange={(event) => update("name", event.target.value)} />
                    </label>
                    <label className="field-label">
                      Telefonnummer *
                      <input required type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} />
                    </label>
                    <label className="field-label md:col-span-2">
                      E-post *
                      <input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} />
                    </label>
                    <label className="field-label">
                      Fordonstyp *
                      <input
                        required
                        placeholder="Ex. SUV, sedan, elbil"
                        value={form.vehicle}
                        onChange={(event) => update("vehicle", event.target.value)}
                      />
                    </label>
                    <label className="field-label">
                      Reg.nr (valfritt)
                      <input placeholder="ABC123" value={form.registration} onChange={(event) => update("registration", event.target.value)} />
                    </label>
                    <label className="field-label md:col-span-2">
                      Meddelande
                      <textarea
                        rows={2}
                        placeholder="Skriv ett meddelande om du har något att meddela..."
                        value={form.message}
                        onChange={(event) => update("message", event.target.value)}
                      />
                      <span className="text-xs italic text-zinc-500 dark:text-zinc-400">T.ex: "Jag ska lämna nyckeln i brevlådan"</span>
                    </label>
                  </div>

                  <label className="flex w-full max-w-[320px] items-center justify-between gap-4 rounded-xl border border-black/10 bg-zinc-50 p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.055]">
                    <span className="flex items-center gap-3">
                      <input
                        required
                        type="checkbox"
                        checked={form.humanConfirmed}
                        onChange={(event) => update("humanConfirmed", event.target.checked)}
                        className="h-6 w-6 rounded border-black/20 accent-vikingRed"
                      />
                      <span className="text-sm font-bold">Jag är inte en robot</span>
                    </span>
                    <ShieldCheck className="text-zinc-400" size={28} />
                  </label>

                  <button
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ff8a00] px-5 py-4 text-sm font-black uppercase tracking-normal text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e67900] focus:outline-none focus:ring-4 focus:ring-[#ff8a00]/30 disabled:cursor-not-allowed disabled:opacity-70"
                    type="submit"
                    disabled={submitting}
                  >
                    <Send size={18} /> {submitting ? "Skickar..." : "Skicka bokningsförfrågan"}
                  </button>

                  <p className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <Mail size={14} /> Uppgifterna används endast för att hantera din bokning enligt GDPR.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ErrorNotice({ message, mailto }: { message: string; mailto: string }) {
  return (
    <div className="rounded-2xl border border-vikingRed/30 bg-vikingRed/10 p-4 text-sm text-vikingRed dark:text-red-200">
      <div className="flex items-center gap-2 font-black">
        <AlertCircle size={18} /> Något gick fel
      </div>
      <p className="mt-2 leading-6">{message}</p>
      <div className="mt-3 flex flex-wrap gap-3">
        <a className="inline-flex font-black underline" href={mailto}>
          Skicka via e-post istället
        </a>
        <a className="inline-flex font-black underline" href={company.whatsapp}>
          Kontakta via WhatsApp
        </a>
      </div>
    </div>
  );
}

function SuccessState({
  service,
  date,
  onClose,
  mailto
}: {
  service: string;
  date: string;
  onClose: () => void;
  mailto: string;
}) {
  return (
    <div className="p-8 text-center md:p-12">
      <img src={company.logo} alt="Vikings Car Care" className="mx-auto h-24 w-56 rounded-2xl object-contain" />
      <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-600 dark:text-emerald-300">
        <CheckCircle2 size={34} />
      </div>
      <h2 className="mt-6 text-3xl font-black">Tack! Din förfrågan är skickad.</h2>
      <p className="mx-auto mt-4 max-w-md leading-7 text-zinc-600 dark:text-zinc-300">
        Vi återkommer med bekräftelse för {service} {date ? `den ${formatLongDate(date)}` : ""} så snart vi kan.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button className="primary-button" type="button" onClick={onClose}>
          Stäng
        </button>
        <a className="secondary-button" href={mailto}>
          <Mail size={18} /> Skicka kopia via e-post
        </a>
      </div>
    </div>
  );
}
