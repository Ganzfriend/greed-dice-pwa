export const calculatePoints = (newDice: number[]): number => {
  console.log({ newDice });
  const counts: Record<number, number> = {};

  for (let i = 1; i <= 6; i++) {
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

    // Add the single 1s and 5s
    if (counts[i] < 3) {
      score += i === 1 ? counts[1] * 100 : i === 5 ? counts[5] * 50 : 0;
    }
  }

  return score;
};
