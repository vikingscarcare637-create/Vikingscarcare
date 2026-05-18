alter table public.bookings
add column if not exists reg_number text;

alter table public.bookings
add column if not exists price_text text;

alter table public.bookings
add column if not exists updated_at timestamptz not null default now();

update public.bookings
set updated_at = coalesce(updated_at, created_at, now())
where updated_at is null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_reg_number_length_check'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
    add constraint bookings_reg_number_length_check
    check (reg_number is null or char_length(trim(reg_number)) between 2 and 12);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_price_text_length_check'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
    add constraint bookings_price_text_length_check
    check (price_text is null or char_length(trim(price_text)) <= 80);
  end if;
end $$;

create index if not exists bookings_reg_number_idx
on public.bookings (lower(reg_number));

create index if not exists bookings_status_created_at_idx
on public.bookings (status, created_at desc);

grant select, update, delete on table public.bookings to authenticated;

drop policy if exists "Public users can insert bookings" on public.bookings;
create policy "Public users can insert bookings"
on public.bookings
for insert
to anon, authenticated
with check (
  status = 'pending'
  and reg_number is not null
  and char_length(trim(reg_number)) between 2 and 12
);

drop policy if exists "Authenticated admins can delete bookings" on public.bookings;
create policy "Authenticated admins can delete bookings"
on public.bookings
for delete
to authenticated
using ((select private.is_booking_admin()));

create or replace function private.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function private.set_updated_at() from public;

drop trigger if exists bookings_set_updated_at on public.bookings;
create trigger bookings_set_updated_at
before update on public.bookings
for each row
execute function private.set_updated_at();

select pg_notify('pgrst', 'reload schema');
