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
import { bookingEmailRecipients, company, services } from "../data/site";
import {
  getServiceDisplayTitle,
  getServicePriceText,
  localizeService,
  uiText
} from "../data/localization";
import { useApp } from "../context/useApp";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { sendBookingEmail } from "../lib/bookingEmail";
import type { Language } from "../context/contextStore";

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
  details?: string;
  hint?: string;
  name?: string;
  status?: number;
};

const defaultDropoffTime = "09:00";
const pickupTime = "18:00";
const timeSlots = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];
const featuredServices = ["Stor rekond", "Keramisk lackförsegling", "Steg 3 polering", "In- och utvändig tvätt"];

const bookingCopy = {
  sv: {
    dialog: "Boka tid",
    close: "Stäng bokning",
    quick: "Snabb bokning",
    selectTitle: "Välj tid för premium bilvård",
    selectText: "Skicka en bokningsförfrågan så återkommer vi med bekräftelse. Du kan också ringa eller skriva på WhatsApp.",
    step: "Steg 1 av 2",
    chooseServiceDate: "Välj tjänst och datum",
    service: "Tjänst",
    chooseDate: "Välj datum",
    otherDate: "Annat datum",
    dropoff: "Inlämningstid",
    continue: "Fortsätt",
    back: "Tillbaka",
    detailsTitle: "Dina uppgifter",
    price: "Pris",
    date: "Datum",
    pickupNote: "Lämna bilen kl {dropoff} och hämta kl {pickup}",
    name: "Namn *",
    phone: "Telefonnummer *",
    email: "E-post *",
    vehicle: "Fordonstyp *",
    vehiclePlaceholder: "Ex. SUV, sedan, elbil",
    registration: "Reg.nr (valfritt)",
    message: "Meddelande",
    messagePlaceholder: "Skriv ett meddelande om du har något att meddela...",
    messageExample: 'T.ex: "Jag ska lämna nyckeln i brevlådan"',
    human: "Jag är inte en robot",
    sending: "Skickar...",
    submit: "Skicka bokningsförfrågan",
    gdpr: "Uppgifterna används endast för att hantera din bokning enligt GDPR.",
    missingSelection: "Välj tjänst, datum och inlämningstid först.",
    missingHuman: "Bekräfta bokningsförfrågan innan du skickar.",
    onlineError: "Bokningen kunde inte skickas online just nu. Skicka via e-post eller WhatsApp så hjälper vi dig direkt.",
    genericError: "Bokningen kunde inte skickas just nu. Skicka via e-post eller kontakta oss via WhatsApp så hjälper vi dig direkt.",
    emailNotificationError:
      "Bokningen sparades i adminpanelen. E-postnotisen kunde inte skickas automatiskt, men vi kan fortfarande hantera bokningen.",
    technicalDetails: "Teknisk detalj",
    errorTitle: "Något gick fel",
    emailFallback: "Skicka via e-post istället",
    whatsappFallback: "Kontakta via WhatsApp",
    mailIntro: "Ny bokningsförfrågan till Vikings Car Care",
    noMessage: "Inget meddelande",
    notProvided: "Ej angivet",
    subject: "Bokning",
    successTitle: "Tack! Din förfrågan är skickad.",
    successText: "Vi återkommer med bekräftelse för {service} {date} så snart vi kan.",
    onDate: "den",
    successClose: "Stäng",
    emailCopy: "Skicka kopia via e-post",
    chooseDateFallback: "Välj datum"
  },
  en: {
    dialog: "Book appointment",
    close: "Close booking",
    quick: "Quick booking",
    selectTitle: "Choose a time for premium car care",
    selectText: "Send a booking request and we will return with confirmation. You can also call or message us on WhatsApp.",
    step: "Step 1 of 2",
    chooseServiceDate: "Choose service and date",
    service: "Service",
    chooseDate: "Choose date",
    otherDate: "Other date",
    dropoff: "Drop-off time",
    continue: "Continue",
    back: "Back",
    detailsTitle: "Your details",
    price: "Price",
    date: "Date",
    pickupNote: "Drop off the car at {dropoff} and collect it at {pickup}",
    name: "Name *",
    phone: "Phone number *",
    email: "Email *",
    vehicle: "Vehicle type *",
    vehiclePlaceholder: "E.g. SUV, sedan, electric car",
    registration: "Reg. no. (optional)",
    message: "Message",
    messagePlaceholder: "Write a message if there is anything you want to add...",
    messageExample: 'E.g. "I will leave the key in the mailbox"',
    human: "I am not a robot",
    sending: "Sending...",
    submit: "Send booking request",
    gdpr: "Your details are only used to manage your booking according to GDPR.",
    missingSelection: "Choose service, date and drop-off time first.",
    missingHuman: "Confirm the booking request before sending.",
    onlineError: "The booking could not be sent online right now. Send it by email or WhatsApp and we will help you directly.",
    genericError: "The booking could not be sent right now. Send it by email or contact us on WhatsApp and we will help you directly.",
    emailNotificationError:
      "The booking was saved in the admin panel. The email notification could not be sent automatically, but we can still handle the booking.",
    technicalDetails: "Technical detail",
    errorTitle: "Something went wrong",
    emailFallback: "Send by email instead",
    whatsappFallback: "Contact via WhatsApp",
    mailIntro: "New booking request to Vikings Car Care",
    noMessage: "No message",
    notProvided: "Not provided",
    subject: "Booking",
    successTitle: "Thank you! Your request has been sent.",
    successText: "We will return with confirmation for {service} {date} as soon as we can.",
    onDate: "on",
    successClose: "Close",
    emailCopy: "Send copy by email",
    chooseDateFallback: "Choose date"
  }
} as const;

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

const localeFor = (language: Language) => (language === "sv" ? "sv-SE" : "en-GB");

const formatLongDate = (isoDate: string, language: Language) =>
  isoDate
    ? new Intl.DateTimeFormat(localeFor(language), {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }).format(dateFromIso(isoDate))
    : bookingCopy[language].chooseDateFallback;

const formatShortDate = (isoDate: string, language: Language) =>
  new Intl.DateTimeFormat(localeFor(language), { day: "numeric", month: "short" }).format(dateFromIso(isoDate));

const formatWeekday = (isoDate: string, language: Language) =>
  new Intl.DateTimeFormat(localeFor(language), { weekday: "short" }).format(dateFromIso(isoDate));

const bookingErrorDetails = (error: BookingInsertError, language: Language) => {
  const copy = bookingCopy[language];
  const details = [error.code, error.message, error.details, error.hint].filter(Boolean).join(" | ");
  return details ? `${copy.technicalDetails}: ${details}` : "";
};

const friendlyBookingError = (error: BookingInsertError, language: Language) => {
  const details = bookingErrorDetails(error, language);
  const text = `${error.code ?? ""} ${error.message ?? ""} ${error.details ?? ""} ${error.hint ?? ""}`.toLowerCase();
  const copy = bookingCopy[language];
  const suffix = details ? ` ${details}` : "";

  if (text.includes("pgrst205") || text.includes("pgrst204") || text.includes("could not find") || text.includes("schema cache")) {
    return `${copy.onlineError}${suffix}`;
  }

  return `${copy.genericError}${suffix}`;
};

const unknownBookingError = (error: unknown, language: Language) => {
  const copy = bookingCopy[language];
  const message = error instanceof Error ? error.message : String(error);
  return `${copy.genericError} ${copy.technicalDetails}: ${message}`;
};

export function BookingModal() {
  const { bookingOpen, closeBooking, selectedService, language } = useApp();
  const [step, setStep] = useState<BookingStep>("select");
  const [form, setForm] = useState<BookingFormState>(initialState);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const copy = bookingCopy[language];
  const ui = uiText[language];

  const selectedServiceInfo = useMemo(() => services.find((service) => service.title === form.service), [form.service]);
  const selectedPrice = useMemo(() => getServicePriceText(form.service, language).replace("kr", "SEK"), [form.service, language]);
  const selectedServiceDisplay = useMemo(() => getServiceDisplayTitle(form.service, language), [form.service, language]);
  const dateCards = useMemo(
    () =>
      Array.from({ length: 10 }, (_, index) => {
        const date = getDateFromOffset(index + 1);
        return {
          date,
          weekday: formatWeekday(date, language),
          label: formatShortDate(date, language)
        };
      }),
    [language]
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
      setEmailWarning("");
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
      copy.mailIntro,
      "",
      `${copy.service}: ${selectedServiceDisplay}`,
      `${copy.price}: ${selectedPrice}`,
      `${copy.date}: ${formatLongDate(form.date, language)}`,
      `${copy.dropoff}: ${form.dropoffTime}`,
      `${language === "sv" ? "Hämtning" : "Pick-up"}: ${pickupTime}`,
      "",
      `${copy.name.replace(" *", "")}: ${form.name}`,
      `${copy.phone.replace(" *", "")}: ${form.phone}`,
      `${copy.email.replace(" *", "")}: ${form.email}`,
      `${copy.vehicle.replace(" *", "")}: ${form.vehicle}`,
      `${copy.registration}: ${form.registration || copy.notProvided}`,
      "",
      `${copy.message}: ${form.message || copy.noMessage}`
    ].join("\n");

    return `mailto:${bookingEmailRecipients.join(",")}?subject=${encodeURIComponent(`${copy.subject}: ${selectedServiceDisplay || (language === "sv" ? "Bilvård" : "Car care")}`)}&body=${encodeURIComponent(
      body
    )}`;
  };

  const continueToDetails = () => {
    if (!form.service || !form.date || !form.dropoffTime) {
      setErrorMessage(copy.missingSelection);
      return;
    }

    setErrorMessage("");
    setStep("details");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setEmailWarning("");

    if (!form.humanConfirmed) {
      setErrorMessage(copy.missingHuman);
      return;
    }

    setSubmitting(true);

    try {
      if (!isSupabaseConfigured || !supabase) {
        console.warn("[booking] Supabase is not configured, opening email fallback.");
        setSent(true);
        setSubmitting(false);
        window.location.href = buildMailto();
        return;
      }

      const detailMessage = [
        form.message.trim(),
        form.registration.trim() ? `${copy.registration}: ${form.registration.trim()}` : "",
        `${copy.price}: ${selectedPrice}`,
        `${copy.dropoff}: ${form.dropoffTime}`,
        `${language === "sv" ? "Hämtning" : "Pick-up"}: ${pickupTime}`
      ]
        .filter(Boolean)
        .join("\n");

      const bookingPayload = {
        customer_name: form.name.trim(),
        customer_email: form.email.trim() || null,
        customer_phone: form.phone.trim(),
        service: selectedServiceDisplay,
        booking_date: form.date || null,
        booking_time: form.dropoffTime || null,
        vehicle_type: form.vehicle.trim() || null,
        message: detailMessage || null,
        status: "pending"
      } as const;

      console.info("[booking] Saving booking", {
        service: bookingPayload.service,
        booking_date: bookingPayload.booking_date,
        booking_time: bookingPayload.booking_time
      });

      const { error } = await supabase.from("bookings").insert(bookingPayload);

      if (error) {
        console.error("[booking] Database insert failed", error);
        setErrorMessage(friendlyBookingError(error, language));
        return;
      }

      console.info("[booking] Booking saved, sending email notification.");

      const { data: emailData, error: emailError } = await sendBookingEmail({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        vehicle_type: form.vehicle.trim(),
        selected_service: selectedServiceDisplay,
        preferred_date: form.date,
        preferred_time: form.dropoffTime,
        registration_number: form.registration.trim() || null,
        price_text: selectedPrice,
        dropoff_time: form.dropoffTime,
        pickup_time: pickupTime,
        message: form.message.trim() || null,
        source: "website",
        language
      });

      if (emailError) {
        console.error("[booking] Email notification failed after successful database insert", emailError);
        setEmailWarning(`${copy.emailNotificationError} ${unknownBookingError(emailError, language)}`);
      } else {
        console.info("[booking] Email notification sent", emailData);
      }

      setSent(true);
    } catch (error) {
      console.error("[booking] Unexpected booking failure", error);
      setErrorMessage(unknownBookingError(error, language));
    } finally {
      setSubmitting(false);
    }
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
          aria-label={copy.dialog}
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
            <button className="icon-button absolute right-4 top-4 z-20" type="button" onClick={closeBooking} aria-label={copy.close}>
              <X size={20} />
            </button>

            {sent ? (
              <SuccessState
                service={selectedServiceDisplay}
                date={form.date}
                language={language}
                onClose={closeBooking}
                mailto={buildMailto()}
                emailWarning={emailWarning}
              />
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
                      <p className="eyebrow text-zinc-200">{copy.quick}</p>
                      <h2 className="mt-4 text-4xl font-black tracking-normal md:text-5xl">{copy.selectTitle}</h2>
                      <p className="mt-5 max-w-md text-zinc-200">{copy.selectText}</p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <a className="secondary-button border-white/20 bg-white/10 text-white" href={company.phoneHref}>
                          {ui.callNow}
                        </a>
                        <a className="secondary-button border-white/20 bg-white/10 text-white" href={company.whatsapp}>
                          <MessageCircle size={18} /> WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 p-6 md:p-8">
                  {errorMessage ? <ErrorNotice message={errorMessage} mailto={buildMailto()} language={language} /> : null}

                  <div>
                    <p className="eyebrow">{copy.step}</p>
                    <h3 className="mt-2 text-3xl font-black">{copy.chooseServiceDate}</h3>
                  </div>

                  <label className="field-label">
                    {copy.service}
                    <select required value={form.service} onChange={(event) => update("service", event.target.value)}>
                      {services.map((service) => {
                        const localized = localizeService(service, language);
                        return (
                          <option key={service.slug} value={service.title}>
                            {localized.displayTitle} - {localized.displayPriceFrom}
                          </option>
                        );
                      })}
                    </select>
                  </label>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {featuredServices.map((serviceTitle) => {
                      const service = services.find((item) => item.title === serviceTitle);
                      if (!service) return null;
                      const localized = localizeService(service, language);
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
                            <img src={service.image} alt={localized.displayTitle} className="h-16 w-20 rounded-xl object-cover" />
                            <div>
                              <p className="font-black">{localized.displayTitle}</p>
                              <p className="mt-1 text-sm font-bold text-vikingRed">{localized.displayPriceFrom}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm font-black">
                      <CalendarDays className="text-vikingRed" size={18} /> {copy.chooseDate}
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
                      {copy.otherDate}
                      <input required min={minimumDate} type="date" value={form.date} onChange={(event) => update("date", event.target.value)} />
                    </label>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm font-black">
                      <Clock className="text-vikingRed" size={18} /> {copy.dropoff}
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
                    {copy.continue} <Sparkles size={18} />
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
                    <ArrowLeft size={18} /> {copy.back}
                  </button>
                  <h2 className="text-center text-xl font-black md:text-2xl">{copy.detailsTitle}</h2>
                  <span />
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-[#fff8ef] p-4 text-sm leading-7 dark:bg-white/[0.06]">
                    <p>
                      <span className="font-black">{copy.service}:</span> {selectedServiceDisplay}
                    </p>
                    <p>
                      <span className="font-black">{copy.price}:</span> <span className="font-black text-[#ff8a00]">{selectedPrice}</span>
                    </p>
                    <p>
                      <span className="font-black">{copy.date}:</span> {formatLongDate(form.date, language)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-[#ff8a00]/35 bg-[#fff3df] p-4 text-sm font-bold dark:bg-[#ff8a00]/10">
                    <AlertCircle className="shrink-0 text-[#ff8a00]" size={19} />
                    <span>{copy.pickupNote.replace("{dropoff}", form.dropoffTime).replace("{pickup}", pickupTime)}</span>
                  </div>

                  {errorMessage ? <ErrorNotice message={errorMessage} mailto={buildMailto()} language={language} /> : null}

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="field-label">
                      {copy.name}
                      <input required value={form.name} onChange={(event) => update("name", event.target.value)} />
                    </label>
                    <label className="field-label">
                      {copy.phone}
                      <input required type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} />
                    </label>
                    <label className="field-label md:col-span-2">
                      {copy.email}
                      <input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} />
                    </label>
                    <label className="field-label">
                      {copy.vehicle}
                      <input
                        required
                        placeholder={copy.vehiclePlaceholder}
                        value={form.vehicle}
                        onChange={(event) => update("vehicle", event.target.value)}
                      />
                    </label>
                    <label className="field-label">
                      {copy.registration}
                      <input placeholder="ABC123" value={form.registration} onChange={(event) => update("registration", event.target.value)} />
                    </label>
                    <label className="field-label md:col-span-2">
                      {copy.message}
                      <textarea
                        rows={2}
                        placeholder={copy.messagePlaceholder}
                        value={form.message}
                        onChange={(event) => update("message", event.target.value)}
                      />
                      <span className="text-xs italic text-zinc-500 dark:text-zinc-400">{copy.messageExample}</span>
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
                      <span className="text-sm font-bold">{copy.human}</span>
                    </span>
                    <ShieldCheck className="text-zinc-400" size={28} />
                  </label>

                  <button
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ff8a00] px-5 py-4 text-sm font-black uppercase tracking-normal text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e67900] focus:outline-none focus:ring-4 focus:ring-[#ff8a00]/30 disabled:cursor-not-allowed disabled:opacity-70"
                    type="submit"
                    disabled={submitting}
                  >
                    <Send size={18} /> {submitting ? copy.sending : copy.submit}
                  </button>

                  <p className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <Mail size={14} /> {copy.gdpr}
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

function ErrorNotice({ message, mailto, language }: { message: string; mailto: string; language: Language }) {
  const copy = bookingCopy[language];

  return (
    <div className="rounded-2xl border border-vikingRed/30 bg-vikingRed/10 p-4 text-sm text-vikingRed dark:text-red-200">
      <div className="flex items-center gap-2 font-black">
        <AlertCircle size={18} /> {copy.errorTitle}
      </div>
      <p className="mt-2 leading-6">{message}</p>
      <div className="mt-3 flex flex-wrap gap-3">
        <a className="inline-flex font-black underline" href={mailto}>
          {copy.emailFallback}
        </a>
        <a className="inline-flex font-black underline" href={company.whatsapp}>
          {copy.whatsappFallback}
        </a>
      </div>
    </div>
  );
}

function SuccessState({
  service,
  date,
  language,
  onClose,
  mailto,
  emailWarning
}: {
  service: string;
  date: string;
  language: Language;
  onClose: () => void;
  mailto: string;
  emailWarning: string;
}) {
  const copy = bookingCopy[language];
  const dateText = date ? `${copy.onDate} ${formatLongDate(date, language)}` : "";

  return (
    <div className="p-8 text-center md:p-12">
      <img src={company.logo} alt="Vikings Car Care" className="mx-auto h-24 w-56 rounded-2xl object-contain" />
      <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-600 dark:text-emerald-300">
        <CheckCircle2 size={34} />
      </div>
      <h2 className="mt-6 text-3xl font-black">{copy.successTitle}</h2>
      <p className="mx-auto mt-4 max-w-md leading-7 text-zinc-600 dark:text-zinc-300">
        {copy.successText.replace("{service}", service).replace("{date}", dateText)}
      </p>
      {emailWarning ? (
        <p className="mx-auto mt-5 max-w-md rounded-2xl border border-[#ff8a00]/35 bg-[#fff3df] p-4 text-sm font-bold leading-6 text-[#9a5300] dark:bg-[#ff8a00]/10 dark:text-[#ffd7a3]">
          {emailWarning}
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button className="primary-button" type="button" onClick={onClose}>
          {copy.successClose}
        </button>
        <a className="secondary-button" href={mailto}>
          <Mail size={18} /> {copy.emailCopy}
        </a>
      </div>
    </div>
  );
}
