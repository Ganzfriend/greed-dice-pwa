import { useGame } from "@/context";
import { GameContextType } from "@/context/types";

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
