import { createClient } from "@/lib/supabase/client";

export async function emitGameEvent(
  gameId: string,
  eventType: string,
  payload: unknown,
) {
  const supabase = createClient();

  await supabase.from("game_events").insert({
    game_id: gameId,
    event_type: eventType,
    payload,
  });
}
