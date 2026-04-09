-- tables
create table players (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  is_guest boolean default true,
  created_at timestamp default now()
);

create table games (
  id uuid primary key default gen_random_uuid(),
  join_code text unique not null,
  status text default 'waiting', -- 'waiting', 'active', 'finished'
  host_id uuid references players(id),
  current_player_id uuid references players(id),
  winner_player_id uuid references players(id),
  created_at timestamp default now()
);

create table game_players (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references games(id) on delete cascade,
  player_id uuid references players(id) on delete cascade,
  score integer default 0,
  turn_order integer,
  joined_at timestamp default now(),
  unique (game_id, player_id)
);

create table game_events (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references games(id) on delete cascade,
  player_id uuid references players(id),
  event_type text,
  payload jsonb,
  created_at timestamp default now()
);


-- indexes
create index idx_game_players_game_id on game_players(game_id);
create index idx_game_events_game_id on game_events(game_id);
create unique index idx_games_join_code on games(join_code);


-- enable rls
alter table players enable row level security;
alter table games enable row level security;
alter table game_players enable row level security;
alter table game_events enable row level security;


-- policies
create policy "Players can create their own profile"
on players
for insert
with check (auth.uid() = id);

create policy "Players can view their own profile"
on players
for select
using (auth.uid() = id);

create policy "Players can update their profile"
on players
for update
using (auth.uid() = id);

create policy "Players can view their games"
on games
for select
using (
  exists (
    select 1
    from game_players
    where game_players.game_id = games.id
    and game_players.player_id = auth.uid()
  )
);

create policy "Players can create games"
on games
for insert
with check (auth.uid() = host_id);

create policy "Players in game can update game"
on games
for update
using (
  exists (
    select 1
    from game_players
    where game_players.game_id = games.id
    and game_players.player_id = auth.uid()
  )
);

create policy "Players can view players in their games"
on game_players
for select
using (
  exists (
    select 1
    from game_players gp
    where gp.game_id = game_players.game_id
    and gp.player_id = auth.uid()
  )
);

create policy "Players can join games"
on game_players
for insert
with check (auth.uid() = player_id);

create policy "Players can update their game state"
on game_players
for update
using (auth.uid() = player_id);

create policy "Players can view events in their games"
on game_events
for select
using (
  exists (
    select 1
    from game_players
    where game_players.game_id = game_events.game_id
    and game_players.player_id = auth.uid()
  )
);

create policy "Players can create events"
on game_events
for insert
with check (auth.uid() = player_id);


-- functions
create or replace function generate_join_code()
returns text
language plpgsql
as $$
declare
  code text;
begin
  loop
    code := upper(substr(md5(random()::text),1,6));
    exit when not exists(select 1 from games where join_code = code);
  end loop;
  return code;
end;
$$;

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