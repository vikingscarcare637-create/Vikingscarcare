# Vikings Car Care

Production-ready React, TypeScript, TailwindCSS and Framer Motion website for Vikings Car Care in Karlskrona.

## Features

- Six main SEO-friendly pages: Hem, Tjänster, Om Oss, Galleri, Blogg, Kontakta Oss
- Premium Scandinavian luxury design with dark and light mode
- Swedish default language with English UI switcher option
- Supabase-powered booking modal with date picker, time picker, service dropdown and WhatsApp fallback
- Local business schema, Open Graph tags, canonical URLs, sitemap and robots.txt
- Responsive navigation, sticky mobile booking CTA, floating WhatsApp and booking actions
- Blog articles optimized for bilvård, biltvätt, helrekond, bilpolering and keramisk lackförsegling Karlskrona

## Development

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example`:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

## Supabase Booking Backend

Run the SQL in `supabase/migrations/20260515143000_create_bookings.sql` in the Supabase SQL Editor for the project.

The booking form inserts into `public.bookings` using the browser-safe publishable key. Row Level Security is enabled so public visitors can create booking requests, but they cannot read, update, or delete bookings.

## Admin Dashboard

The protected dashboard is available at `/admin`.

Run both migrations in Supabase SQL Editor:

```text
supabase/migrations/20260515143000_create_bookings.sql
supabase/migrations/20260515154500_admin_booking_access.sql
```

Create an admin user in Supabase Auth, then allow that email to read/update booking status:

```sql
insert into public.booking_admins (email, note)
values ('your-admin-email@example.com', 'Primary admin')
on conflict (email) do nothing;
```

In Supabase Auth settings, add your live website URL and local URL to allowed redirect URLs, including `/admin`.

The admin dashboard supports:

- Magic-link login
- Booking list with contact, vehicle, service, preferred date/time, message and status
- Status updates for `new`, `confirmed`, `completed`, `cancelled`
- Search and filters
- Statistics cards
- Upcoming bookings
- Popular services
- CSV export

For deployment, add these environment variables in your hosting provider:

```bash
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

## Production Build

```bash
npm run build
```

## Important Launch Notes

- Confirm final prices, opening hours and social media URLs before publishing.
- Contact form still uses `mailto:`. Booking form now uses Supabase.
- Add email notifications later with a Supabase Edge Function plus an email provider such as Resend.
