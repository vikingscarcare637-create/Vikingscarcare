drop policy if exists "Public users can insert bookings" on public.bookings;
create policy "Public users can insert bookings"
on public.bookings
for insert
to anon, authenticated
with check (
  status = 'pending'
  and reg_number is not null
  and char_length(trim(reg_number)) between 2 and 12
  and booking_date is not null
  and booking_date >= current_date
  and extract(dow from booking_date) <> 0
);

select pg_notify('pgrst', 'reload schema');
