import db from '$lib/data/db';
import { generateBoard } from '$lib/game.js';

type ErrorMessage = {
	status: number;
	message: string;
};

type Data = {
	status: number;
	board: Game.Square[];
};

export const load = async ({ params, parent }) => {
	await parent();
	const rawData = await db.games.get(params.id);
	if (!rawData) {
		return {
			status: 404,
			message: 'Game not found'
		} satisfies ErrorMessage;
	}

	const board: Game.Square[] = generateBoard(rawData);
	// TODO obfuscation selon le user

	return {
		status: 200,
		board
	} satisfies Data;
};
