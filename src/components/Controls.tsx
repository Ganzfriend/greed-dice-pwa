import { Button } from "@/components/ui/button";
import { useGame } from "@/context";
import { useState } from "react";

export function Controls() {
  const {
    rollDice,
    savePoints,
    saveSelectedDice,
    nextPlayer,
    resetGame,
    state: {
      winnerPlayerId,
      players,
      currentPlayerId,
      dice,
      savedDice,
      isBust,
      turnPoints,
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

  const saveSelectedDiceAndRoll = () => {
    if (rollCount > 0 && tempDiceToSave.size < 1) {
      alert("Save at least one die before rolling again!");
      return;
    }

    if (tempDiceToSave.size > 0) saveSelectedDice([...tempDiceToSave]);

    rollDice();

    setRollCount((prev) => prev + 1);
  };

  const handleSavePoints = () => {
    const { score } = players[currentPlayerId];
    if (score === 0 && turnPoints < 500) {
      alert("You need at least 500 points to get on the board!");
      return;
    }
    savePoints();
  };

  return (
    <div className="flex gap-2 mt-4">
      {isBust && (
        <div>
          <h2>BUST!</h2>
          <h4>Someone got greedy...</h4>
        </div>
      )}
      {!!winnerPlayerId && <h1>The winner is: winnerPlayerId </h1>}
      <Button onClick={saveSelectedDiceAndRoll} disabled={isBust}>
        Roll Dice
      </Button>
      <div>
        {dice.map((value, i) => {
          return (
            <Button
              onClick={() => addDieToSave(i)}
              // disabled={saved}
              variant={tempDiceToSave.has(i) ? "default" : "outline"}
              key={i}
            >
              {value}
            </Button>
          );
        })}
      </div>
      <div>
        {savedDice.map((value, i) => {
          return (
            <Button
              onClick={() => addDieToSave(i)}
              disabled={true}
              variant={tempDiceToSave.has(i) ? "default" : "outline"}
              key={i}
            >
              {value}
            </Button>
          );
        })}
      </div>
      <Button onClick={handleSavePoints} disabled={isBust}>
        Save {turnPoints}
      </Button>
      <Button onClick={nextPlayer}>Next Player</Button>
      <Button onClick={resetGame}>Reset Game</Button>
      <dialog open={isBust}>
        <h1>BUST!</h1>
      </dialog>
    </div>
  );
}
