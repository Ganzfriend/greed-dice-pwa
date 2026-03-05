import { useState } from "react";

import GameContext from "./GameContext";
import type { Player } from "./types";

const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [dice, setDice] = useState<number[]>([1, 1, 1, 1, 1, 1]);
  const [winner, setWinner] = useState<Player | null>(null);

  const rollDice = () => {
    setDice(dice.map(() => Math.floor(Math.random() * 6) + 1));
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
    setDice([1, 1, 1, 1, 1, 1]);
    setCurrentPlayer(0);
    setWinner(null);
  };

  return (
    <GameContext.Provider
      value={{
        state: { players, currentPlayer, dice, winner },
        rollDice,
        savePoints,
        nextPlayer,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
