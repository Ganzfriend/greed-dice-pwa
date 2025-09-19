import { Button } from "@/components/ui/button";
import { useGame } from "@/context";

export function Controls() {
  const {
    rollDice,
    bankScore,
    nextPlayer,
    // state
  } = useGame();

  return (
    <div className="flex gap-2 mt-4">
      <Button onClick={rollDice}>Roll Dice</Button>
      <Button onClick={() => bankScore(500)}>Bank 500</Button>
      <Button onClick={nextPlayer}>Next Player</Button>
    </div>
  );
}
