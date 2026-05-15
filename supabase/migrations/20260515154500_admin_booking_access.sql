create schema if not exists private;

create table if not exists public.booking_admins (
  email text primary key check (position('@' in email) > 1 and char_length(trim(email)) <= 254),
  created_at timestamptz not null default now(),
  note text
);

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

revoke all on function private.is_booking_admin() from public;
grant execute on function private.is_booking_admin() to authenticated;

drop policy if exists "Admins can view booking requests" on public.bookings;
create policy "Admins can view booking requests"
on public.bookings
for select
to authenticated
using ((select private.is_booking_admin()));

drop policy if exists "Admins can update booking status" on public.bookings;
create policy "Admins can update booking status"
on public.bookings
for update
to authenticated
using ((select private.is_booking_admin()))
with check ((select private.is_booking_admin()) and source = 'website');

grant usage on schema public to authenticated;
grant select on public.bookings to authenticated;
grant update (status) on public.bookings to authenticated;

-- Bootstrap one or more admins after creating the Supabase Auth user:
-- insert into public.booking_admins (email, note)
-- values ('admin@example.com', 'Primary admin')
-- on conflict (email) do nothing;
