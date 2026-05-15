create extension if not exists pgcrypto with schema extensions;

create table if not exists public.bookings (
  id uuid primary key default extensions.gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(trim(name)) between 2 and 160),
  phone text not null check (char_length(trim(phone)) between 5 and 40),
  email text not null check (position('@' in email) > 1 and char_length(trim(email)) <= 254),
  vehicle_type text not null check (char_length(trim(vehicle_type)) between 2 and 120),
  registration_number text check (registration_number is null or char_length(trim(registration_number)) <= 30),
  selected_service text not null check (char_length(trim(selected_service)) between 2 and 160),
  price_text text check (price_text is null or char_length(trim(price_text)) <= 80),
  preferred_date date not null,
  preferred_time time not null,
  dropoff_time time not null default '09:00',
  pickup_time time not null default '18:00',
  message text check (message is null or char_length(message) <= 2000),
  status text not null default 'new' check (status in ('new', 'confirmed', 'completed', 'cancelled')),
  source text not null default 'website' check (source = 'website')
);

create index if not exists bookings_created_at_idx on public.bookings (created_at desc);
create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_preferred_date_idx on public.bookings (preferred_date);

alter table public.bookings enable row level security;

drop policy if exists "Public visitors can create booking requests" on public.bookings;
create policy "Public visitors can create booking requests"
on public.bookings
for insert
to anon
with check (status = 'new' and source = 'website');

grant usage on schema public to anon;
grant insert on public.bookings to anon;
