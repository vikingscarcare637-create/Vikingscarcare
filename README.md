# Vikings Car Care

Production-ready React, TypeScript, TailwindCSS and Framer Motion website for Vikings Car Care in Karlskrona.

## Features

- Six main SEO-friendly pages: Hem, Tjänster, Om Oss, Galleri, Blogg, Kontakta Oss
- Premium Scandinavian luxury design with dark and light mode
- Swedish default language with English UI switcher option
- Supabase-powered two-step booking modal with service/date selection, registration number, email notifications, email fallback and WhatsApp fallback
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
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_EMAIL=nidaldarwishe@gmail.com
```

## Supabase Booking Backend

Run the single SQL file in `supabase/migrations` in the Supabase SQL Editor for the project:

```text
supabase/migrations/20260518153000_create_vikings_booking_system.sql
```

The booking form inserts into `public.bookings` using the live schema: `customer_name`, `customer_email`, `customer_phone`, `service`, `booking_date`, `booking_time`, `vehicle_type`, `message`, and `status`. Row Level Security is enabled so public visitors can create booking requests, but they cannot read, update, or delete bookings.

If the booking form shows a technical `PGRST205` or `404` for `/rest/v1/bookings`, confirm the table exists and that the project exposes `public.bookings` in Supabase Data API settings. Newer Supabase projects can disable automatic Data API exposure for SQL-created tables.

### Booking Email Notifications

The booking form calls the Supabase Edge Function `send-booking-email` after a booking is saved. The function sends every booking notification to:

```text
nidaldarwishe@gmail.com
info@vikingscarcare.com
```

Deploy `supabase/functions/send-booking-email` in Supabase and set these function secrets:

```bash
RESEND_API_KEY=your_resend_api_key
BOOKING_EMAIL_FROM=Vikings Car Care <bookings@your-verified-domain.com>
SITE_URL=https://vikingscarcare.vercel.app
```

`BOOKING_EMAIL_FROM` must use a domain verified in Resend. If the function or email provider is not configured, the booking still falls back to a prefilled email link addressed to both recipients.
The function has `verify_jwt = false` in `supabase/config.toml` because visitors are not logged in when they submit a booking; recipients are hardcoded server-side.

## Admin Dashboard

The protected dashboard is available at `/admin`.

Run the booking migration in Supabase SQL Editor:

```text
supabase/migrations/20260518153000_create_vikings_booking_system.sql
```

Create an admin user in Supabase Auth with email/password login. Recommended primary admin:

```text
Email: nidaldarwishe@gmail.com
Username shown on site: admin
Password: set this securely in Supabase Auth
```

The migration allows both `nidaldarwishe@gmail.com` and `info@vikingscarcare.com` to read/update bookings after matching Supabase Auth users exist. To add another admin later:

```sql
insert into public.booking_admins (email, note)
values ('your-admin-email@example.com', 'Primary admin')
on conflict (email) do nothing;
```

The `/admin` login accepts either the configured username (`VITE_ADMIN_USERNAME`, default `admin`) or the actual admin email (`VITE_ADMIN_EMAIL`, default `nidaldarwishe@gmail.com`) plus the Supabase Auth password. If the dashboard still says it cannot read bookings, rerun the booking migration and confirm the authenticated user's email exists in `public.booking_admins`.

The admin dashboard supports:

- Username/email and password login through Supabase Auth
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
VITE_ADMIN_USERNAME
VITE_ADMIN_EMAIL
```

## Production Build

```bash
npm run build
```

## Important Launch Notes

- Confirm final prices, opening hours and social media URLs before publishing.
- Booking email delivery requires the deployed Supabase Edge Function and Resend secrets above.
