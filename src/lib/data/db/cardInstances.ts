import { dbClient } from '../../server/prisma';
import { arrayOfKeysToObject } from '../../../lib/methods';
import * as cards from './cards';

export function create(data: DB.CardInstanceCreate) {
  return dbClient.cardInstance.create({
    data: {
      ...data,
      cardinstance_id: crypto.randomUUID() // SQLite
    }
  });
}

export function get<T extends DB.CardInstanceIncludeKeys>(
  cardinstance_id: DB.CardInstanceCreate['cardinstance_id'],
  arr_include: T[] = []
) {
  const include = arrayOfKeysToObject(arr_include, true);
  return dbClient.cardInstance.findUnique({
    where: { cardinstance_id },
    include
  });
}

/**
 * Retrieves a card based on the provided card instance ID.
 *
 * @param {DB.CardInstanceCreate['cardinstance_id']} cardinstance_id - The ID of the card instance.
 * @return {Promise<Game.Card | null>} The card associated with the card instance, or null if no card is found.
 */
export async function getCard(
  cardinstance_id: DB.CardInstanceCreate['cardinstance_id']
): Promise<Game.Card | null> {
  const cardinstance = await get(cardinstance_id);
  if (!cardinstance) return null;

  return cards.get(cardinstance.card_id);
}
