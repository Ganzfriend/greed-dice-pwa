alter table game_events
add column event_number bigint generated always as identity;

create index idx_game_events_game_event_number
on game_events (game_id, event_number);

create type game_event_type as enum (
  'GAME_CREATED',
  'PLAYER_JOINED',
  'ROLL_DICE',
  'SAVE_DICE',
  'END_TURN',
  'BUST',
  'BANK_POINTS'
);

alter table game_events
alter column event_type
type game_event_type
using event_type::game_event_type;

create policy "allow reading events"
on game_events
for select
to anon, authenticated
using (true);

create policy "allow inserting events"
on game_events
for insert
to anon, authenticated
with check (true);

alter table games
add column turn_number integer default 1;