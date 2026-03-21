create table players (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  is_guest boolean default true,
  created_at timestamp default now()
);

create table games (
  id uuid primary key default gen_random_uuid(),
  join_code text unique not null,
  status text default 'waiting',
  current_player_id uuid,
  winner_player_id uuid,
  created_at timestamp default now()
);

create table game_players (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references games(id) on delete cascade,
  player_id uuid references players(id) on delete cascade,
  seat_order int,
  score int default 0,
  joined_at timestamp default now()
);

create table game_turns (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references games(id),
  player_id uuid references players(id),
  points_scored int,
  created_at timestamp default now()
);