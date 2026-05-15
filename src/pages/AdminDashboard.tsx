import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Helmet } from "react-helmet-async";
import {
  BarChart3,
  CalendarClock,
  CheckCircle2,
  Clock,
  Download,
  LogOut,
  Mail,
  MessageSquareText,
  Phone,
  RefreshCw,
  Search,
  Shield,
  Sparkles,
  UserRound
} from "lucide-react";
import { company } from "../data/site";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

type BookingStatus = "new" | "confirmed" | "completed" | "cancelled";

type Booking = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  vehicle_type: string;
  selected_service: string;
  preferred_date: string;
  preferred_time: string;
  message: string | null;
  status: BookingStatus;
  source: string;
};

const statusLabels: Record<BookingStatus, string> = {
  new: "Ny",
  confirmed: "Bekräftad",
  completed: "Klar",
  cancelled: "Avbokad"
};

const statusClasses: Record<BookingStatus, string> = {
  new: "bg-vikingRed/12 text-vikingRed border-vikingRed/30",
  confirmed: "bg-sky-500/12 text-sky-700 border-sky-500/30 dark:text-sky-200",
  completed: "bg-emerald-500/12 text-emerald-700 border-emerald-500/30 dark:text-emerald-200",
  cancelled: "bg-zinc-500/12 text-zinc-600 border-zinc-500/30 dark:text-zinc-300"
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "short", year: "numeric" }).format(new Date(date));

const formatDateTime = (date: string) =>
  new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(date));

const csvEscape = (value: string | null | undefined) => `"${String(value ?? "").replace(/"/g, '""')}"`;

export function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [magicSent, setMagicSent] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | BookingStatus>("all");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "upcoming" | "past">("all");
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setAuthLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadBookings = async () => {
    if (!supabase) return;

    setLoadingBookings(true);
    setBookingError("");

    const { data, error } = await supabase
      .from("bookings")
      .select("id, created_at, name, phone, email, vehicle_type, selected_service, preferred_date, preferred_time, message, status, source")
      .order("created_at", { ascending: false });

    setLoadingBookings(false);

    if (error) {
      setBookingError(
        "Kunde inte läsa bokningar. Kontrollera att SQL-migrationerna är körda och att din admin-e-post finns i public.booking_admins."
      );
      return;
    }

    setBookings((data ?? []) as Booking[]);
  };

  useEffect(() => {
    if (session) {
      void loadBookings();
    }
  }, [session]);

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;

    setAuthError("");
    setMagicSent(false);
    setAuthLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`
      }
    });

    setAuthLoading(false);

    if (error) {
      setAuthError(error.message);
      return;
    }

    setMagicSent(true);
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setBookings([]);
  };

  const updateStatus = async (id: string, status: BookingStatus) => {
    if (!supabase) return;

    setUpdatingId(id);
    setBookingError("");
    const previousBookings = bookings;
    setBookings((current) => current.map((booking) => (booking.id === id ? { ...booking, status } : booking)));

    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    setUpdatingId("");

    if (error) {
      setBookings(previousBookings);
      setBookingError("Status kunde inte uppdateras. Kontrollera adminbehörighet och RLS-policy.");
    }
  };

  const today = new Date().toISOString().slice(0, 10);

  const filteredBookings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "today" && booking.preferred_date === today) ||
        (dateFilter === "upcoming" && booking.preferred_date >= today) ||
        (dateFilter === "past" && booking.preferred_date < today);
      const searchable = [
        booking.name,
        booking.phone,
        booking.email,
        booking.vehicle_type,
        booking.selected_service,
        booking.message ?? ""
      ]
        .join(" ")
        .toLowerCase();

      return matchesStatus && matchesDate && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [bookings, dateFilter, query, statusFilter, today]);

  const stats = useMemo(() => {
    const upcoming = bookings.filter(
      (booking) => booking.preferred_date >= today && ["new", "confirmed"].includes(booking.status)
    ).length;

    return {
      total: bookings.length,
      new: bookings.filter((booking) => booking.status === "new").length,
      confirmed: bookings.filter((booking) => booking.status === "confirmed").length,
      today: bookings.filter((booking) => booking.preferred_date === today).length,
      upcoming,
      completed: bookings.filter((booking) => booking.status === "completed").length
    };
  }, [bookings, today]);

  const upcomingBookings = useMemo(
    () =>
      bookings
        .filter((booking) => booking.preferred_date >= today && booking.status !== "cancelled")
        .sort((a, b) => `${a.preferred_date}T${a.preferred_time}`.localeCompare(`${b.preferred_date}T${b.preferred_time}`))
        .slice(0, 5),
    [bookings, today]
  );

  const popularServices = useMemo(() => {
    const counts = bookings.reduce<Record<string, number>>((acc, booking) => {
      acc[booking.selected_service] = (acc[booking.selected_service] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [bookings]);

  const exportCsv = () => {
    const headers = [
      "Skapad",
      "Status",
      "Namn",
      "Telefon",
      "E-post",
      "Fordon",
      "Tjänst",
      "Datum",
      "Tid",
      "Meddelande"
    ];
    const rows = filteredBookings.map((booking) => [
      formatDateTime(booking.created_at),
      statusLabels[booking.status],
      booking.name,
      booking.phone,
      booking.email,
      booking.vehicle_type,
      booking.selected_service,
      booking.preferred_date,
      booking.preferred_time,
      booking.message ?? ""
    ]);
    const csv = [headers, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
    const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `vikings-bookings-${today}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Vikings Car Care</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="min-h-screen bg-[#f4f5f6] text-ink dark:bg-carbon dark:text-white">
        {!isSupabaseConfigured || !supabase ? (
          <AdminShell>
            <AdminCard>
              <Shield className="text-vikingRed" size={36} />
              <h1 className="mt-5 text-3xl font-black">Supabase saknas</h1>
              <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">
                Lägg till `VITE_SUPABASE_URL` och `VITE_SUPABASE_PUBLISHABLE_KEY` i miljön för att använda adminpanelen.
              </p>
            </AdminCard>
          </AdminShell>
        ) : !session ? (
          <AdminShell>
            <AdminCard>
              <img src={company.logo} alt="Vikings Car Care" className="h-24 w-56 rounded-2xl object-contain object-left" />
              <p className="eyebrow mt-8">Skyddad admin</p>
              <h1 className="mt-3 text-4xl font-black">Logga in för att se bokningar</h1>
              <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-300">
                Ange en admin-e-post. Supabase skickar en säker magic link till `/admin`.
              </p>
              <form className="mt-8 grid gap-4" onSubmit={signIn}>
                <label className="field-label">
                  Admin e-post
                  <input
                    required
                    type="email"
                    placeholder="admin@vikingscarcare.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </label>
                <button className="primary-button justify-center py-4 disabled:cursor-not-allowed disabled:opacity-70" disabled={authLoading}>
                  <Mail size={18} /> {authLoading ? "Skickar..." : "Skicka magic link"}
                </button>
              </form>
              {magicSent ? (
                <p className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm font-bold text-emerald-700 dark:text-emerald-200">
                  Kontrollera inkorgen och klicka på länken för att öppna adminpanelen.
                </p>
              ) : null}
              {authError ? (
                <p className="mt-5 rounded-2xl border border-vikingRed/30 bg-vikingRed/10 p-4 text-sm font-bold text-vikingRed dark:text-red-200">
                  {authError}
                </p>
              ) : null}
            </AdminCard>
          </AdminShell>
        ) : (
          <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
            <header className="flex flex-col gap-5 rounded-[28px] border border-black/10 bg-white p-5 shadow-silver dark:border-white/10 dark:bg-white/[0.045] lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <img src={company.logo} alt="Vikings Car Care" className="h-16 w-36 rounded-xl object-contain object-left" />
                <div>
                  <p className="eyebrow">Admin Dashboard</p>
                  <h1 className="mt-1 text-2xl font-black md:text-4xl">Bokningar & statistik</h1>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="secondary-button" onClick={loadBookings} disabled={loadingBookings}>
                  <RefreshCw className={loadingBookings ? "animate-spin" : ""} size={18} /> Uppdatera
                </button>
                <button className="secondary-button" onClick={exportCsv}>
                  <Download size={18} /> Exportera
                </button>
                <button className="primary-button" onClick={signOut}>
                  <LogOut size={18} /> Logga ut
                </button>
              </div>
            </header>

            <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
              <StatCard icon={BarChart3} label="Totalt" value={stats.total} />
              <StatCard icon={Sparkles} label="Nya" value={stats.new} tone="red" />
              <StatCard icon={CheckCircle2} label="Bekräftade" value={stats.confirmed} />
              <StatCard icon={Clock} label="Idag" value={stats.today} />
              <StatCard icon={CalendarClock} label="Kommande" value={stats.upcoming} />
              <StatCard icon={CheckCircle2} label="Klara" value={stats.completed} />
            </section>

            {bookingError ? (
              <div className="mt-6 rounded-2xl border border-vikingRed/30 bg-vikingRed/10 p-4 text-sm font-bold text-vikingRed dark:text-red-200">
                {bookingError}
              </div>
            ) : null}

            <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
              <section className="rounded-[28px] border border-black/10 bg-white shadow-silver dark:border-white/10 dark:bg-white/[0.045]">
                <div className="grid gap-3 border-b border-black/10 p-4 dark:border-white/10 md:grid-cols-[1fr_180px_180px]">
                  <label className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input
                      className="w-full rounded-2xl border border-black/10 bg-zinc-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-vikingRed focus:ring-4 focus:ring-vikingRed/10 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
                      placeholder="Sök namn, telefon, e-post, bil eller tjänst"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </label>
                  <select
                    className="rounded-2xl border border-black/10 bg-zinc-50 px-4 py-3 text-sm font-bold outline-none dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value as "all" | BookingStatus)}
                  >
                    <option value="all">Alla statusar</option>
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <select
                    className="rounded-2xl border border-black/10 bg-zinc-50 px-4 py-3 text-sm font-bold outline-none dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
                    value={dateFilter}
                    onChange={(event) => setDateFilter(event.target.value as "all" | "today" | "upcoming" | "past")}
                  >
                    <option value="all">Alla datum</option>
                    <option value="today">Idag</option>
                    <option value="upcoming">Kommande</option>
                    <option value="past">Historik</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[980px] text-left text-sm">
                    <thead className="bg-zinc-50 text-xs uppercase text-zinc-500 dark:bg-white/[0.04] dark:text-zinc-400">
                      <tr>
                        <th className="px-5 py-4">Kund</th>
                        <th className="px-5 py-4">Tjänst</th>
                        <th className="px-5 py-4">Tid</th>
                        <th className="px-5 py-4">Fordon</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4">Meddelande</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/10 dark:divide-white/10">
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id} className="align-top transition hover:bg-zinc-50 dark:hover:bg-white/[0.04]">
                          <td className="px-5 py-5">
                            <p className="font-black text-ink dark:text-white">{booking.name}</p>
                            <div className="mt-2 grid gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                              <a className="flex items-center gap-1 hover:text-vikingRed" href={`tel:${booking.phone}`}>
                                <Phone size={13} /> {booking.phone}
                              </a>
                              <a className="flex items-center gap-1 hover:text-vikingRed" href={`mailto:${booking.email}`}>
                                <Mail size={13} /> {booking.email}
                              </a>
                            </div>
                          </td>
                          <td className="px-5 py-5">
                            <p className="font-bold">{booking.selected_service}</p>
                            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Skapad {formatDateTime(booking.created_at)}</p>
                          </td>
                          <td className="px-5 py-5">
                            <p className="font-black">{formatDate(booking.preferred_date)}</p>
                            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{booking.preferred_time.slice(0, 5)}</p>
                          </td>
                          <td className="px-5 py-5">{booking.vehicle_type}</td>
                          <td className="px-5 py-5">
                            <select
                              className={`rounded-full border px-3 py-2 text-xs font-black outline-none ${statusClasses[booking.status]}`}
                              value={booking.status}
                              disabled={updatingId === booking.id}
                              onChange={(event) => void updateStatus(booking.id, event.target.value as BookingStatus)}
                            >
                              {Object.entries(statusLabels).map(([value, label]) => (
                                <option key={value} value={value}>
                                  {label}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="max-w-[280px] px-5 py-5 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                            {booking.message || "Inget meddelande"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {!loadingBookings && filteredBookings.length === 0 ? (
                  <div className="p-10 text-center text-zinc-500 dark:text-zinc-400">Inga bokningar matchar filtret.</div>
                ) : null}
              </section>

              <aside className="grid h-fit gap-6">
                <InfoPanel title="Nästa bokningar" icon={CalendarClock}>
                  {upcomingBookings.length ? (
                    <div className="grid gap-3">
                      {upcomingBookings.map((booking) => (
                        <div key={booking.id} className="rounded-2xl bg-zinc-50 p-4 dark:bg-white/[0.06]">
                          <p className="font-black">{booking.name}</p>
                          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                            {formatDate(booking.preferred_date)} kl. {booking.preferred_time.slice(0, 5)}
                          </p>
                          <p className="mt-1 text-xs font-bold uppercase text-vikingRed">{booking.selected_service}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Inga kommande bokningar ännu.</p>
                  )}
                </InfoPanel>

                <InfoPanel title="Populära tjänster" icon={BarChart3}>
                  {popularServices.length ? (
                    <div className="grid gap-3">
                      {popularServices.map(([service, count]) => (
                        <div key={service} className="flex items-center justify-between gap-4">
                          <span className="text-sm font-bold">{service}</span>
                          <span className="rounded-full bg-vikingRed px-3 py-1 text-xs font-black text-white">{count}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Statistik visas när bokningar kommer in.</p>
                  )}
                </InfoPanel>

                <InfoPanel title="Admin info" icon={UserRound}>
                  <div className="grid gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                    <p>
                      Inloggad som <span className="font-black text-ink dark:text-white">{session.user.email}</span>
                    </p>
                    <p>Endast e-postadresser i `public.booking_admins` kan läsa eller ändra bokningar.</p>
                  </div>
                </InfoPanel>
              </aside>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-carbon p-4">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-carbon/95 to-vikingRed/20" />
      <div className="relative w-full max-w-xl">{children}</div>
    </div>
  );
}

function AdminCard({ children }: { children: ReactNode }) {
  return <div className="rounded-[32px] border border-white/10 bg-white p-8 shadow-2xl dark:bg-carbon dark:text-white">{children}</div>;
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone = "default"
}: {
  icon: typeof BarChart3;
  label: string;
  value: number;
  tone?: "default" | "red";
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-silver dark:border-white/10 dark:bg-white/[0.045]">
      <div className="flex items-center justify-between">
        <span className={tone === "red" ? "text-vikingRed" : "text-zinc-500 dark:text-zinc-300"}>
          <Icon size={24} />
        </span>
        <span className="text-3xl font-black">{value}</span>
      </div>
      <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">{label}</p>
    </div>
  );
}

function InfoPanel({
  title,
  icon: Icon,
  children
}: {
  title: string;
  icon: typeof MessageSquareText;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[24px] border border-black/10 bg-white p-5 shadow-silver dark:border-white/10 dark:bg-white/[0.045]">
      <h2 className="mb-5 flex items-center gap-2 text-lg font-black">
        <Icon className="text-vikingRed" size={20} /> {title}
      </h2>
      {children}
    </section>
  );
}
