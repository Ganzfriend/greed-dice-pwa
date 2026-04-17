drop policy "Players can view players in their games" on game_players;

create policy "Allow reading game players"
on game_players
for select
to anon, authenticated
using (true);

drop policy "Players can view their games" on games;

create policy "Allow reading games"
on games
for select
to anon, authenticated
using (true);