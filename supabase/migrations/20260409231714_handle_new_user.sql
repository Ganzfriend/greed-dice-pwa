create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.players (id, name, is_guest)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'name',
      'Guest ' || floor(random()*10000)::text
    ),
    true
  );
  return new;
end;
$$;


-- triggers
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();