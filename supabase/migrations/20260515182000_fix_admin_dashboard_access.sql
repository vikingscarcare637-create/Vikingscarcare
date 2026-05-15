grant usage on schema private to authenticated;
grant execute on function private.is_booking_admin() to authenticated;

grant usage on schema public to anon;
grant usage on schema public to authenticated;
grant insert on public.bookings to anon;
grant select on public.bookings to authenticated;
grant update (status) on public.bookings to authenticated;

select pg_notify('pgrst', 'reload schema');
