import { GameProvider } from "./context";
import { Scoreboard } from "./components/Scoreboard";
import { Controls } from "./components/Controls";

function App() {
  return (
    <GameProvider>
      <main className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">🎲 Greed Game</h1>
        <Scoreboard />
        <Controls />
      </main>
    </GameProvider>
  );
}

export default App;
