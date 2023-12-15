export function generatePositions(min: number, max: number): Game.Position[] {
	const positions: Array<Game.Position> = [];

	for (let y = max; y >= min; y--) {
		for (let x = min; x <= max; x++) {
			positions.push({ x, y });
		}
	}

	return positions;
}

export function positionsToTransition(
	src: Game.Position,
	dst: Game.Position,
	nbSquares: number
): [Game.Position, Game.Position] {
	const squareSize = 100 / Math.sqrt(nbSquares);
	const coordSrc = { x: src.x * squareSize, y: src.y * squareSize };
	const coordDst = { x: dst.x * squareSize, y: dst.y * squareSize };

	return [coordSrc, coordDst];
}

export function movesToTransitions(
	moves: Game.Move[][],
	nbSquares: number
): Array<Game.Transition> {
	const transitions: Array<Game.Transition> = [];

	for (const move of moves) {
		const moveSerie = [[0, 0], ...move];

		for (let j = 0; j < moveSerie.length - 1; j += 1) {
			const curMove = moveSerie[j];
			const nextMove = moveSerie[j + 1];

			const src: Game.Position = {
				x: curMove[0],
				y: -curMove[1]
			};
			const dst: Game.Position = {
				x: nextMove[0],
				y: -nextMove[1]
			};

			const transition = positionsToTransition(src, dst, nbSquares);
			transitions.push(transition);
		}
	}

	return transitions;
}
