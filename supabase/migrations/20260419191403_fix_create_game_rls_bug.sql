drop policy "Players can create games" on games;

create policy "Players can create games"
on games
for insert
with check (
  exists (
    select 1
    from players
    where players.id = host_id
    and players.user_id = auth.uid()
  )
);

drop policy "Players can join games" on game_players;

create policy "Players can join games"
on game_players
for insert
with check (
  exists (
    select 1
    from players
    where players.id = player_id
    and players.user_id = auth.uid()
  )
);

drop policy "Players in game can update game" on games;

create policy "Players in game can update game"
on games
for update
using (
  exists (
    select 1
    from game_players gp
    join players p on p.id = gp.player_id
    where gp.game_id = games.id
    and p.user_id = auth.uid()
  )
);