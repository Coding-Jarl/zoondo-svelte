import { Prisma } from '@prisma/client';
import { dbClient } from '../../server/prisma';

export function create(p1: DB.Game['player1_id'], p2: DB.Game['player2_id']) {
  return dbClient.game.create({
    data: {
      game_id: crypto.randomUUID(), // SQLite
      player1: { connect: { id: p1 } },
      player2: { connect: { id: p2 } },
      current_turn: 0,
      game_status: 'ongoing'
    }
  });
}

/**
 * Retrieves a game from the database with the specified game ID and includes the specified data.
 *
 * @param {DB.Game['game_id']} game_id - The ID of the game to retrieve.
 * @param {T} include - The data to include in the retrieved game.
 * @return  A promise that resolves to the retrieved game with the included data.
 */
export function get<T extends DB.GameInclude>(game_id: DB.Game['game_id'], include: T) {
  return dbClient.game.findUnique({
    where: { game_id },
    include
  });
}

// export function getExtended(game_id: string) {
//   return dbClient.game.findFirst({
//     where: { game_id },
//     include: {
//       actions: true,
//       cards: true
//     }
//   });
// }

export function getExtendedBy(criteria: Prisma.GameWhereInput) {
  return dbClient.game.findMany({
    where: criteria,
    include: {
      actions: true,
      cards: true,
      player1: true,
      player2: true
    }
  });
}
