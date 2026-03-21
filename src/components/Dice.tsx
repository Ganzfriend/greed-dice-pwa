import { useGame } from "@/context/useGame";

export default function Dice() {
  const { game } = useGame();

  if (!game) return null;

  return (
    <div>
      {game.map((player) => (
        <div key={player.id}>
          {player.players.name} — {player.score}
        </div>
      ))}
    </div>
  );
}
