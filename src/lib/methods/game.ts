import { availableCards } from '../data/mock';

export function generatePositions(min: number, max: number): Game.Position[] {
  const positions: Array<Game.Position> = [];

  for (let y = max; y >= min; y--) {
    for (let x = min; x <= max; x++) {
      positions.push({ x, y });
    }
  }

  return positions;
}

function positionsToTransition(
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

export function generateBoard<T extends DB.GameExtendedByKeys<['actions', 'cards']>>(rawData: T) {
  const { cards, actions } = rawData;
  const positions = generatePositions(0, 5);
  const board: Game.Square[] = [];

  for (const action of actions) {
    const card = cards.find((card) => card.cardinstance_id === action.cardinstance_id);
    if (!card) continue;
    card.position = action.destination;
  }

  for (const position of positions) {
    const card = cards.find((card) => {
      const [x, y] = card.position.split(';');
      const cardPosition: Game.Position = { x: Number(x), y: Number(y) };

      return JSON.stringify(position) === JSON.stringify(cardPosition);
    });

    let squareContent: Game.CardInstance;
    if (!card)
      squareContent = {
        card: null,
        owner: null
      };
    else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { resolver, ...cardData } = availableCards[card.card_id];

      squareContent = {
        card: cardData,
        owner: card.owner_id,
        instanceid: card.cardinstance_id
      };
    }
    board.push({
      ...position,
      ...squareContent
    });
  }

  return board;
}
