"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui";
import { createGuestPlayer } from "@/lib/auth";

export default function HomePage() {
  const router = useRouter();

  const handleGuest = async () => {
    const player = await createGuestPlayer();
    console.log("Guest player created:", player);
    router.push("/lobby");
  };

  return (
    <main className="flex flex-col items-center gap-6 mt-20">
      <h1 className="text-4xl font-bold">Greed 🎲</h1>

      <Link href="/login" className="px-6 py-3 bg-black text-white rounded">
        Login
      </Link>

      <Button
        className="px-6 py-3 bg-black text-white rounded"
        onClick={handleGuest}
      >
        Continue as Guest
      </Button>
    </main>
  );
}

// "use client";

// import { GameProvider } from "@/providers";
// import { Scoreboard } from "@/components";
// import { Controls } from "@/components";
// import { useState } from "react";

// export default function Page() {
//   // TODO: get this gameId
//   const [
//     gameId,
//     // setGameId
//   ] = useState<string>("");

//   return (
//     <GameProvider gameId={gameId}>
//       <main className="p-6 max-w-md mx-auto">
//         <h1 className="text-2xl font-bold mb-4">🎲 Greed Game</h1>
//         <Scoreboard />
//         <Controls />
//       </main>
//     </GameProvider>
//   );
// }
