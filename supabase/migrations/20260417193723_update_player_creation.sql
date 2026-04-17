drop policy "Players can create their own profile" on players;
drop policy "Allow guest players" on players;

create policy "Players can create profiles"
on players
for insert
to anon, authenticated
with check (
  is_guest = true
  OR auth.uid() = user_id
);


drop policy "Players can view their own profile" on players;

create policy "Players can view profiles"
on players
for select
using (
  is_guest = true
  OR auth.uid() = user_id
);