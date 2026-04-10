"use client";

import { useState } from "react";

import { Button } from "@/components/ui";
import { useGame } from "@/providers/game/useGame";
import { rollDice } from "@/server/actions/rollDice";
import { bankPoints } from "@/server/actions/bankPoints";

export function Controls() {
  const { game, isMyTurn } = useGame();

  const [selectedDice, setSelectedDice] = useState<number[]>([]);

  if (!game) return null;

  const toggleDie = (idx: number) => {
    setSelectedDice((prev) =>
      prev.includes(idx) ? prev.filter((d) => d !== idx) : [...prev, idx],
    );
  };

  const handleRoll = async () => {
    await rollDice(game.id);
  };

  const handleBank = async () => {
    await bankPoints(game.id, game.turn_points || 0);
  };

  if (!isMyTurn) {
    return <div>Waiting for other player...</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        {game.dice?.map((value, i) => (
          <Button
            key={i}
            onClick={() => toggleDie(i)}
            variant={selectedDice.includes(i) ? "default" : "outline"}
          >
            {value}
          </Button>
        ))}
      </div>

      <div className="flex gap-2">
        <Button onClick={handleRoll}>Roll</Button>

        <Button onClick={handleBank}>Bank {game.turn_points}</Button>
      </div>
    </div>
  );
}

// export function Controls() {
//   const {
//     rollDice,
//     savePoints,
//     saveSelectedDice,
//     nextPlayer,
//     resetGame,
//     game: {
//       winnerPlayerId,
//       players,
//       currentPlayerId,
//       dice,
//       savedDice,
//       isBust,
//       turnPoints,
//     },
//   } = useGame();

//   const [tempDiceToSave, setTempDiceToSave] = useState<Set<number>>(new Set());

//   const [rollCount, setRollCount] = useState(0);

//   const addDieToSave = (idx: number) => {
//     setTempDiceToSave((prev) => {
//       const result = new Set(prev);
//       if (result.has(idx)) {
//         result.delete(idx);
//       } else {
//         result.add(idx);
//       }
//       return result;
//     });
//   };

//   const saveSelectedDiceAndRoll = () => {
//     if (rollCount > 0 && tempDiceToSave.size < 1) {
//       alert("Save at least one die before rolling again!");
//       return;
//     }

//     if (tempDiceToSave.size > 0) saveSelectedDice([...tempDiceToSave]);

//     rollDice();

//     setRollCount((prev) => prev + 1);
//   };

//   const handleSavePoints = () => {
//     const { score } = players[currentPlayerId];
//     if (score === 0 && turnPoints < 500) {
//       alert("You need at least 500 points to get on the board!");
//       return;
//     }
//     savePoints();
//   };

//   return (
//     <div className="flex gap-2 mt-4">
//       {isBust && (
//         <div>
//           <h2>BUST!</h2>
//           <h4>Someone got greedy...</h4>
//         </div>
//       )}
//       {!!winnerPlayerId && <h1>The winner is: winnerPlayerId </h1>}
//       <Button onClick={saveSelectedDiceAndRoll} disabled={isBust}>
//         Roll Dice
//       </Button>
//       <div>
//         {dice.map((value, i) => {
//           return (
//             <Button
//               onClick={() => addDieToSave(i)}
//               // disabled={saved}
//               variant={tempDiceToSave.has(i) ? "default" : "outline"}
//               key={i}
//             >
//               {value}
//             </Button>
//           );
//         })}
//       </div>
//       <div>
//         {savedDice.map((value, i) => {
//           return (
//             <Button
//               onClick={() => addDieToSave(i)}
//               disabled={true}
//               variant={tempDiceToSave.has(i) ? "default" : "outline"}
//               key={i}
//             >
//               {value}
//             </Button>
//           );
//         })}
//       </div>
//       <Button onClick={handleSavePoints} disabled={isBust}>
//         Save {turnPoints}
//       </Button>
//       <Button onClick={nextPlayer}>Next Player</Button>
//       <Button onClick={resetGame}>Reset Game</Button>
//       <dialog open={isBust}>
//         <h1>BUST!</h1>
//       </dialog>
//     </div>
//   );
// }
