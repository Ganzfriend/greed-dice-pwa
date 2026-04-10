-- ensure uuid generation is available
create extension if not exists pgcrypto;

--------------------------------------------------
-- 1. Modify players table structure
--------------------------------------------------

-- add user_id column for auth users
alter table players
add column if not exists user_id uuid references auth.users(id) on delete cascade;

-- remove dependency between players.id and auth.users.id
alter table players
drop constraint if exists players_id_fkey;

-- ensure players.id auto generates
alter table players
alter column id set default gen_random_uuid();

-- make name required
alter table players
alter column name set not null;

--------------------------------------------------
-- 2. Update RLS policies for new user_id model
--------------------------------------------------

drop policy if exists "Players can create their own profile" on players;
drop policy if exists "Players can view their own profile" on players;
drop policy if exists "Players can update their profile" on players;

create policy "Players can create their own profile"
on players
for insert
with check (auth.uid() = user_id);

create policy "Players can view their own profile"
on players
for select
using (auth.uid() = user_id);

create policy "Players can update their profile"
on players
for update
using (auth.uid() = user_id);

--------------------------------------------------
-- 3. Update new user trigger
--------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.players (user_id, name, is_guest)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'name',
      'Player ' || floor(random()*10000)::text
    ),
    false
  );
  return new;
end;
$$;

--------------------------------------------------
-- 4. Ensure trigger exists
--------------------------------------------------

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();