import db from '../../../lib/data/db';
import { arrayOfKeysToObject, generateBoard, roll } from '../../../lib/methods';

type PlayAction = SocketEventsWithIo<
  ClientToServerEvents,
  'pushAction',
  { board: Game.Square[], room: RoomGame }
>;

export const playAction: PlayAction =
  ({ io, room, board }) =>
  async (action: DB.Action) => {
    //TODO Validation de l'action
    const attackerCard = await db.cardInstances.getCard(action.cardinstance_id);
    if (!attackerCard) throw new Error('Card not found');

    if (!validateAction(attackerCard, action)) throw new Error('Invalid action');
    console.log(`${attackerCard.name} is moving to ${action.destination}`);

    const [x, y] = action.destination.split(';').map(Number);
    const defenderCard = board.find((sq) => sq.x === x && sq.y === y)?.card ?? null;

    const result = applyAction(attackerCard, defenderCard);
    result;

    saveAction(io, room, action);
  };

function validateAction(attacker: Game.Card, action: DB.Action) {
  attacker;
  action;
  return true;
}

async function applyAction(attacker: Game.Card, defender: Game.Card | null) {
  if (defender) {
    console.log(`${defender.name} is ready to receive him!`);

    const attackerValue = attacker.corners[roll(4)];
    const defenderValue = defender.corners[roll(4)];

    //WIP Trigger combat + resolution
    if (attackerValue === '*') {
      console.log('attacker resolved *');
      const resolver = await db.cards.getResolver(attacker.slug);
      resolver();
      return 0;
    } else if (defenderValue === '*') {
      console.log('defender resolved *');
      const resolver = await db.cards.getResolver(defender.slug);
      resolver();
      return 0;
    } else {
      if (attackerValue > defenderValue) {
        console.log('The attacker wins !');
        return 1;
      } else if (attackerValue < defenderValue) {
        console.log('The defender wins !');
        return -1;
      } else {
        console.log("It's a tie !");
        return 0;
      }
    }
  } else {
    console.log(`No problem, since this square is ${defender}`);
  }
}

async function saveAction<T extends ClientToServerEvents | ServerToClientEvents>(
  io: SocketSide<T>,
  room: RoomGame,
  action: DB.Action
) {
  const act: DB.ActionCreate = { ...action, action_id: crypto.randomUUID() };
  const newAct = await db.actions.create(act).catch((err) => {
    console.error(err);
  });
  if (!newAct) return;

  const keys = arrayOfKeysToObject(['actions', 'cards', 'player1', 'player2'], true);
  const gameData = await db.games.get(action.game_id, keys);
  if (gameData) {
    const board = generateBoard(gameData);

    io.to(room).emit('syncAction', {
      board,
      nextActionRestrictions: null
    });
  }
}
