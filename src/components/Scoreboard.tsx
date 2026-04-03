import { Card, CardContent } from "@/components/ui/card";
import { useGame } from "@/hooks";

export function Scoreboard() {
  const { game } = useGame();

  return (
    <div className="grid gap-2">
      {game.players.map((p) => (
        <Card
          key={p.playerId}
          className={
            p.playerId === game.currentPlayerId ? "border-blue-500" : ""
          }
        >
          <CardContent>
            <p className="font-bold">{p.name}</p>
            <p>Score: {p.score}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
