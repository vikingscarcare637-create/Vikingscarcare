insert into public.booking_admins (email, note)
values
  ('nidaldarwishe@gmail.com', 'Primary Vikings Car Care admin'),
  ('info@vikingscarcare.com', 'Vikings Car Care shared inbox')
on conflict (email) do update
set note = excluded.note;

select pg_notify('pgrst', 'reload schema');
