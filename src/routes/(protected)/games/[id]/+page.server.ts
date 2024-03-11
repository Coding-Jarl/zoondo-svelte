import db from '$lib/data/db';
import { generateBoard } from '$lib/game.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params, parent, locals }) => {
  await parent();
  const rawData = await db.games.getExtended(params.id);
  if (!rawData) error(404, 'Game not found');

  const board = generateBoard(rawData);
  // TODO obfuscation selon le user

  return {
    board,
    isFirstPlayer: locals.user.userId === rawData.player1_id
  };
};
