import { json } from '@sveltejs/kit';
import { generatePositions } from '$lib/game';
import { cardsOnBoard } from '$lib/data/mock';

export function GET() {
	const idPlayer = 1;
	let board: Array<Game.Square> = generatePositions(0, 5);

	board = board.map((square) => {
		const squareContent: Game.Square =
			cardsOnBoard.find((candidate) => candidate.x === square.x && candidate.y === square.y) ??
			square;

		if (hasNoCard(squareContent)) {
			return square;
		}
		if (isOwner(squareContent, idPlayer)) {
			return { ...squareContent };
		}

		return { ...squareContent, card: null };
	});

	return json(board);
}

function hasNoCard(square: Game.Square): square is Game.SquareWithoutCard {
	return square.card === undefined;
}

function isOwner(card: Game.CardInstance, idPlayer: number): card is Game.PlayerCard {
	return card.owner === idPlayer;
}
