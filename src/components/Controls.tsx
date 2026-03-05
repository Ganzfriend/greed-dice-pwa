import { Button } from "@/components/ui/button";
import { useGame } from "@/context";
import { useState } from "react";

export function Controls() {
  const {
    rollDice,
    savePoints,
    saveDice,
    nextPlayer,
    resetGame,
    state: {
      // players, currentPlayer, winner,
      dice,
      isABust,
      tempPoints,
    },
  } = useGame();

  const [tempDiceToSave, setTempDiceToSave] = useState<Set<number>>(new Set());

  const addDieToSave = (v: number) => {
    setTempDiceToSave((prev) => {
      const result = new Set(prev);
      if (result.has(v)) {
        result.delete(v);
      } else {
        result.add(v);
      }
      return result;
    });
  };

  const saveDiceAndRoll = () => {
    saveDice(tempDiceToSave);
    rollDice();
  };

  return (
    <div className="flex gap-2 mt-4">
      {isABust && (
        <div>
          <h2>BUST!</h2>
          <h4>Someone got greedy...</h4>
        </div>
      )}
      <Button onClick={saveDiceAndRoll} disabled={isABust}>
        Roll Dice
      </Button>
      <div>
        {dice.map(([v, isSaved]) => {
          return (
            <Button onClick={() => addDieToSave(v)} disabled={isSaved} key={v}>
              {v}
            </Button>
          );
        })}
      </div>
      <Button onClick={() => savePoints(tempPoints)} disabled={isABust}>
        Save {tempPoints}
      </Button>
      <Button onClick={nextPlayer}>Next Player</Button>
      <Button onClick={resetGame}>Reset Game</Button>
    </div>
  );
}
