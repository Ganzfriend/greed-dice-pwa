import { useGame } from "@/hooks";
import { GameContextType } from "@/types";

export function Dice() {
  const { game }: GameContextType = useGame();

  if (!game) return null;

  return (
    <div>
      {game.players?.map(({ playerId, name, score }) => (
        <div key={playerId}>
          {name} — {score}
        </div>
      ))}
    </div>
  );
}
