import { Card, CardContent } from "@/components/ui/card";
import { useGame } from "@/context";

export function Scoreboard() {
  const { state } = useGame();

  return (
    <div className="grid gap-2">
      {state.players.map((p, i) => (
        <Card
          key={p.id}
          className={i === state.currentPlayer ? "border-blue-500" : ""}
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
