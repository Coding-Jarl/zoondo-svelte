import db from '../data/db';
import { generatePositions } from '../methods/game';

type K = `${number};${number}`;
type V = Game.Square;
type DBBoard = DB.GameExtendedByKeys<['actions', 'cards']>;

export class Board extends Map<K, V> {
  async generate(cards: DBBoard['cards'], actions: DBBoard['actions']) {
    const positions = generatePositions(0, 5);

    for (const action of actions) {
      const card = cards.find((card) => card.cardinstance_id === action.cardinstance_id);
      if (!card) continue;
      card.position = action.destination;
    }

    for (const position of positions) {
      const pos = `${position.x};${position.y}` as K;
      const card = cards.find((card) => card.position === pos);

      let squareContent: Game.CardInstance;
      if (!card) {
        squareContent = { card: null, owner: null };
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { resolver, ...cardData } = await db.cards.get(card.card_id);

        squareContent = {
          card: cardData,
          owner: card.owner_id,
          instanceid: card.cardinstance_id
        };
      }

      this.set(pos, { ...position, ...squareContent });
    }

    return this;
  }

  toArray(): Array<[K, V]> {
    return Array.from(this.entries());
  }
  reverse(): Board {
    return new Board(this.toArray().reverse());
  }

  applyAction() {}
}

// TODO ArrayBoard ?
// Avantage lors de la conversion, on pourrait facilement remettre en MapBoard