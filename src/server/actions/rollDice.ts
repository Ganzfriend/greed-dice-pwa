"use server";

import { createClient } from "@/lib/supabase/server";

export async function rollDice(gameId: string) {
  const supabase = await createClient();

  const dice = Array.from(
    { length: 6 },
    () => Math.floor(Math.random() * 6) + 1,
  );

  await supabase
    .from("games")
    .update({
      dice,
      saved_dice: [],
      is_bust: false,
    })
    .eq("id", gameId);
}
