create policy "Allow guest players"
on players
for insert
to anon
with check (is_guest = true);