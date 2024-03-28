import db from '$lib/data/db';
import { generateBoard } from '$lib/methods';
import { error } from '@sveltejs/kit';

export const load = async ({ params, parent, locals }) => {
  await parent();

  const rawData = await db.games.get(params.id, { actions: true, cards: true });
  if (!rawData) error(404, "Game doesn't exist");

  const isFirstPlayer = locals.user.userId === rawData.player1_id;
  let board: Game.Square[] = generateBoard(rawData);
  if (isFirstPlayer) {
    board = board.reverse();
  }
  // TODO obfuscation selon le user

  return { board, isFirstPlayer };
};
