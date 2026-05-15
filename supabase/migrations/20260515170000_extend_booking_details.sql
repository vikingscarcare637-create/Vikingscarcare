alter table public.bookings
  add column if not exists registration_number text check (registration_number is null or char_length(trim(registration_number)) <= 30),
  add column if not exists price_text text check (price_text is null or char_length(trim(price_text)) <= 80),
  add column if not exists dropoff_time time not null default '09:00',
  add column if not exists pickup_time time not null default '18:00';

update public.bookings
set dropoff_time = preferred_time
where dropoff_time is null;
