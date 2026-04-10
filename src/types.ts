import { User } from "@supabase/supabase-js";

/* DATABASE TYPES */

export type Player = {
  id: string;
  name: string;
  is_guest: boolean;
  created_at: string;
};

export type Game = {
  id: string;
  join_code: string;
  status: "waiting" | "active" | "finished";
  current_player_id: string | null;
  winner_player_id: string | null;
  created_at: string;
};

export type GamePlayer = {
  id: string;
  game_id: string;
  player_id: string;
  score: number;
  joined_at: string;
};

/* JOINED TYPES */

export type ActivePlayer = GamePlayer & {
  players: Player;
};

/* CLIENT GAME STATE */

export type GameState = {
  id: string;
  current_player_id: string | null;
  winner_player_id: string | null;

  dice: number[];
  saved_dice: number[];

  turn_points: number;
  is_bust: boolean;

  players: ActivePlayer[];
};

/* CONTEXT TYPES */

export type AuthContextType = {
  user: User | null;
  loading: boolean;
};

export type PlayerContextType = {
  player: Player | null;
  loading: boolean;
};

export type GameContextType = {
  game: GameState | null;
  players: ActivePlayer[];
  currentPlayerId: string | null;
  isMyTurn: boolean;
  refreshGame: () => Promise<void>;
};
