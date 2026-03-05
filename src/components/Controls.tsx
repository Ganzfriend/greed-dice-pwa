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
      // winner,
      players,
      currentPlayer,
      dice,
      isABust,
      tempPoints,
    },
  } = useGame();

  const [tempDiceToSave, setTempDiceToSave] = useState<Set<number>>(new Set());

  const [rollCount, setRollCount] = useState(0);

  const addDieToSave = (idx: number) => {
    setTempDiceToSave((prev) => {
      const result = new Set(prev);
      if (result.has(idx)) {
        result.delete(idx);
      } else {
        result.add(idx);
      }
      return result;
    });
  };

  const saveDiceAndRoll = () => {
    if (rollCount > 0 && tempDiceToSave.size < 1) {
      alert("Save at least one die before rolling again!");
      return;
    }

    if (tempDiceToSave.size > 0) saveDice(tempDiceToSave);

    rollDice();

    setRollCount((prev) => prev + 1);
  };

  const handleSavePoints = () => {
    const { score } = players[currentPlayer];
    if (score === 0 && tempPoints < 500) {
      alert("You need at least 500 points to get on the board!");
      return;
    }
    savePoints();
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
        {dice.map(([v, isSaved], i) => {
          return (
            <Button
              onClick={() => addDieToSave(i)}
              disabled={isSaved}
              variant={tempDiceToSave.has(i) ? "default" : "outline"}
              key={i}
            >
              {v}
            </Button>
          );
        })}
      </div>
      <Button onClick={handleSavePoints} disabled={isABust}>
        Save {tempPoints}
      </Button>
      <Button onClick={nextPlayer}>Next Player</Button>
      <Button onClick={resetGame}>Reset Game</Button>
      <dialog open={isABust}>
        <h1>BUST!</h1>
      </dialog>
    </div>
  );
}
