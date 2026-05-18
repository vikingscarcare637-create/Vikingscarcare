create schema if not exists private;
create schema if not exists extensions;

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null check (char_length(trim(customer_name)) between 2 and 160),
  customer_email text check (
    customer_email is null
    or (
      char_length(trim(customer_email)) <= 254
      and position('@' in customer_email) > 1
    )
  ),
  customer_phone text not null check (char_length(trim(customer_phone)) between 5 and 40),
  service text not null check (char_length(trim(service)) between 2 and 160),
  booking_date date,
  booking_time text check (booking_time is null or char_length(trim(booking_time)) <= 40),
  vehicle_type text check (vehicle_type is null or char_length(trim(vehicle_type)) <= 120),
  message text check (message is null or char_length(message) <= 2000),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled'))
);

create table if not exists public.booking_admins (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text unique not null check (
    char_length(trim(email)) <= 254
    and position('@' in email) > 1
  ),
  note text
);

create unique index if not exists booking_admins_email_lower_idx
on public.booking_admins (lower(email));

create index if not exists bookings_created_at_idx
on public.bookings (created_at desc);

create index if not exists bookings_status_idx
on public.bookings (status);

create index if not exists bookings_booking_date_idx
on public.bookings (booking_date);

alter table public.bookings enable row level security;
alter table public.booking_admins enable row level security;

create or replace function private.is_booking_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.booking_admins admin
    where lower(admin.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

do $$
begin
  if exists (select 1 from pg_roles where rolname = 'postgres') then
    execute 'alter table public.bookings owner to postgres';
    execute 'alter table public.booking_admins owner to postgres';
    execute 'alter function private.is_booking_admin() owner to postgres';
  end if;
exception
  when insufficient_privilege then
    null;
end $$;

revoke all on table public.bookings from public;
revoke all on table public.booking_admins from public;
revoke all on function private.is_booking_admin() from public;

grant usage on schema public to anon, authenticated;
grant usage on schema private to authenticated;

grant insert on table public.bookings to anon, authenticated;
grant select, update on table public.bookings to authenticated;

grant select, insert, update, delete on table public.booking_admins to authenticated;
grant execute on function private.is_booking_admin() to authenticated;

drop policy if exists "Public users can insert bookings" on public.bookings;
create policy "Public users can insert bookings"
on public.bookings
for insert
-- Authenticated is included so an already signed-in admin browser can still submit a public booking form.
to anon, authenticated
with check (status = 'pending');

drop policy if exists "Authenticated admins can read bookings" on public.bookings;
create policy "Authenticated admins can read bookings"
on public.bookings
for select
to authenticated
using ((select private.is_booking_admin()));

drop policy if exists "Authenticated admins can update bookings" on public.bookings;
create policy "Authenticated admins can update bookings"
on public.bookings
for update
to authenticated
using ((select private.is_booking_admin()))
with check ((select private.is_booking_admin()));

drop policy if exists "Authenticated admins can read booking admins" on public.booking_admins;
create policy "Authenticated admins can read booking admins"
on public.booking_admins
for select
to authenticated
using ((select private.is_booking_admin()));

drop policy if exists "Authenticated admins can insert booking admins" on public.booking_admins;
create policy "Authenticated admins can insert booking admins"
on public.booking_admins
for insert
to authenticated
with check ((select private.is_booking_admin()));

drop policy if exists "Authenticated admins can update booking admins" on public.booking_admins;
create policy "Authenticated admins can update booking admins"
on public.booking_admins
for update
to authenticated
using ((select private.is_booking_admin()))
with check ((select private.is_booking_admin()));

drop policy if exists "Authenticated admins can delete booking admins" on public.booking_admins;
create policy "Authenticated admins can delete booking admins"
on public.booking_admins
for delete
to authenticated
using ((select private.is_booking_admin()));

insert into public.booking_admins (email, note)
values
  ('nidaldarwishe@gmail.com', 'Default admin'),
  ('info@vikingscarcare.com', 'Default admin')
on conflict (email) do update
set note = excluded.note;

select pg_notify('pgrst', 'reload schema');
