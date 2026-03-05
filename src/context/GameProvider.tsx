import { useMemo, useState } from "react";

import GameContext from "./GameContext";
import { calculatePoints } from "./helpers";
import type { GameContextType, GameState, Player } from "./types";

const defaultDice: GameState["dice"] = new Array(6).fill([1, false]);

const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  // dice value represents numeric val AND whether or not it's saved
  const [dice, setDice] = useState<GameState["dice"]>(defaultDice);
  const [tempPoints, setTempPoints] = useState<number>(0);
  const [winner, setWinner] = useState<Player | null>(null);

  const isABust = useMemo(() => {
    const values = [...dice].map(([v]) => v);
    return calculatePoints(values) === 0;
  }, [dice]);

  const rollDice: GameContextType["rollDice"] = () => {
    console.log("## calling rollDice");
    setDice((prev) =>
      prev.map(([value, isSaved]) =>
        isSaved
          ? [value, isSaved]
          : [Math.floor(Math.random() * 6) + 1, isSaved],
      ),
    );
  };

  const addTempPoints = (newDiceIdxs: Set<number>) => {
    const newPoints = calculatePoints(
      Array.from(newDiceIdxs).map((v) => dice[v][0]),
    );
    setTempPoints((prev) => prev + newPoints);
  };

  const saveDice: GameContextType["saveDice"] = (newDiceIdxs: Set<number>) => {
    const updatedDice = [...dice];

    newDiceIdxs.forEach((i) => {
      updatedDice[i] = [dice[i][0], true];
    });

    setDice(updatedDice);

    // calculate value of newDiceIdxs combo to add to tempPoints
    addTempPoints(newDiceIdxs);
  };

  const savePoints: GameContextType["savePoints"] = () => {
    setPlayers((prev) =>
      prev.map((p, i) =>
        i === currentPlayer ? { ...p, score: p.score + tempPoints } : p,
      ),
    );
    if (players[currentPlayer].score + tempPoints >= 10000) {
      setWinner(players[currentPlayer]);
    }
  };

  const nextPlayer: GameContextType["nextPlayer"] = () => {
    setCurrentPlayer((prev) => (prev + 1) % players.length);
  };

  const resetGame: GameContextType["resetGame"] = () => {
    setPlayers([]);
    setDice(defaultDice);
    setCurrentPlayer(0);
    setWinner(null);
    setTempPoints(0);
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
