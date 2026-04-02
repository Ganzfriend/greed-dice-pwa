import { useGame } from "@/context/useGame.ts";
import { GameContextType } from "@/context/types.ts";

export function Dice() {
  const { state }: GameContextType = useGame();

  if (!state) return null;

  return (
    <div>
      {state.players?.map(({ playerId, name, score }) => (
        <div key={playerId}>
          {name} — {score}
        </div>
      ))}
    </div>
  );
}
