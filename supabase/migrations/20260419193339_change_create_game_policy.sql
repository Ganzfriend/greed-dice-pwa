drop policy if exists "Players can create games" on games;

create policy "Players can create games"
on games
for insert
to anon, authenticated
with check (
  exists (
    select 1
    from players
    where players.id = host_id
    and (
      players.user_id = auth.uid()
      OR (players.user_id is null and auth.uid() is null)
    )
  )
);