export function generatePositions(min: number, max: number): Game.Position[] {
  const positions: Array<Game.Position> = [];

  for (let y = max; y >= min; y--) {
    for (let x = min; x <= max; x++) {
      positions.push({ x, y });
    }
  }

  return positions;
}
