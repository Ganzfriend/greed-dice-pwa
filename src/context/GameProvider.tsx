import { useState } from "react";

import GameContext from "./GameContext";
import type { GameState, Player } from "./types";

const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  // dice value represents numeric val AND whether or not it's saved
  const [dice, setDice] = useState<GameState["dice"]>(
    new Array(6).fill([1, false]),
  );
  const [tempPoints, setTempPoints] = useState<number>(0);
  const [isABust, setIsABust] = useState<boolean>(false);
  const [winner, setWinner] = useState<Player | null>(null);

  const calculatePoints = (newDice: number[]): number => {
    console.log({ newDice });
    const counts: Record<number, number> = {};

    for (let i = 0; i < 6; i++) {
      counts[i] = 0;
    }

    for (const die of newDice) {
      counts[die]++;
    }

    let score = 0;
    const values = Object.values(counts);

    if (newDice.length === 6) {
      // Straight
      if ([1, 2, 3, 4, 5, 6].every((n) => counts[n] === 1)) {
        return 1500;
      }

      // Three pairs
      if (values.filter((v) => v === 2).length === 3) {
        return 1500;
      }

      // Two triplets
      if (values.filter((v) => v === 3).length === 2) {
        return 2500;
      }

      // Full house (4 + 2)
      if (values.includes(4) && values.includes(2)) {
        return 2000;
      }
    }

    // Six / Five / Four of a kind & Triples
    for (let i = 1; i <= 6; i++) {
      const count = counts[i];

      if (count === 6) return 3000;

      // Don't return immediately if less than 6 dice are used
      if (count === 5) score += 2000;
      if (count === 4) score += 1000;
      if (counts[i] === 3) {
        score += i === 1 ? 300 : i * 100;
      }
      counts[i] = 0; // Reset count so the single 5s and 1s aren't double-counted later
    }

    // Remaining singles
    score += counts[1] * 100;
    score += counts[5] * 50;

    return score;
  };

  const rollDice = () => {
    setDice((prev) => {
      const newDice: GameState["dice"] = prev.map((die) => {
        const [, isSaved] = die;
        return isSaved ? die : [Math.floor(Math.random() * 6) + 1, isSaved];
      });

      // check first if there are any potential point combos
      const points = calculatePoints([...newDice].map(([v]) => v));
      setIsABust(points === 0);

      return newDice;
    });
  };

  const addTempPoints = (newDiceIdxs: Set<number>) => {
    const newPoints = calculatePoints(
      Array.from(newDiceIdxs).map((v) => dice[v][0]),
    );
    setTempPoints((prev) => prev + newPoints);
  };

  const saveDice = (newDiceIdxs: Set<number>) => {
    const updatedDice = [...dice];

    newDiceIdxs.forEach((i) => {
      updatedDice[i] = [dice[i][0], true];
    });

    setDice(updatedDice);

    // calculate value of newDiceIdxs combo to add to tempPoints
    addTempPoints(newDiceIdxs);
  };

  const savePoints = (points: number) => {
    setPlayers((prev) =>
      prev.map((p, i) =>
        i === currentPlayer ? { ...p, score: p.score + points } : p,
      ),
    );
    if (players[currentPlayer].score + points >= 10000) {
      setWinner(players[currentPlayer]);
    }
  };

  const nextPlayer = () => {
    setCurrentPlayer((prev) => (prev + 1) % players.length);
  };

  const resetGame = () => {
    setPlayers([]);
    setDice(new Array(6).map(() => [1, false]));
    setCurrentPlayer(0);
    setWinner(null);
  };

  return (
    <GameContext.Provider
      value={{
        state: { players, currentPlayer, dice, winner, tempPoints, isABust },
        rollDice,
        savePoints,
        nextPlayer,
        resetGame,
        saveDice,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
