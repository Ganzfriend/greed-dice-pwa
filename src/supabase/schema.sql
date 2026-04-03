-- Players table (optional if you just use auth.users)
create table players (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id), -- tie to Supabase Auth
  name text not null,
  is_guest boolean default true,
  created_at timestamp default now()
);

-- Games table
create table games (
  id uuid primary key default gen_random_uuid(),
  join_code text unique not null,
  status text default 'waiting', -- 'waiting', 'active', 'finished'
  host_id uuid references auth.users(id), -- who created the game
  current_player_id uuid references auth.users(id),
  winner_player_id uuid references auth.users(id),
  created_at timestamp default now()
);

-- Game players join table
create table game_players (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references games(id) on delete cascade,
  player_id uuid references auth.users(id) on delete cascade,
  seat_order int,
  score int default 0,
  joined_at timestamp default now()
);

-- Game turns (history of rolls / points)
create table game_turns (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references games(id) on delete cascade,
  player_id uuid references auth.users(id),
  points_scored int,
  created_at timestamp default now()
);