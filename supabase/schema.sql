create table players (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id), -- tie to Supabase Auth
  name text,
  is_guest boolean default true,
  created_at timestamp default now()
);

-- Games table
create table games (
  id uuid primary key default gen_random_uuid(),
  join_code text unique not null,
  status text default 'waiting', -- 'waiting', 'active', 'finished'
  host_id uuid references players(id), -- who created the game
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

-- Game turns (history of rolls / points)
create table game_turns (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references games(id) on delete cascade,
  player_id uuid references players(id),
  dice jsonb,
  score integer,
  created_at timestamp default now()
);