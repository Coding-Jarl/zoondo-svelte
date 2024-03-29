import { type ViteDevServer } from 'vite';
import { Server } from 'socket.io';
import db from '../data/db';
import { generateBoard } from '../game';
import { availableCards } from '../data/mock';

let io: Server<ClientToServerEvents, ServerToClientEvents>;

const broadcastMsg: (room:string)=>ClientToServerEvents['message'] = (room)=> async (content, author_id) => {
  const msg: DB.MessageCreate = {
    id: crypto.randomUUID(),
    author_id,
    room,
    content
  };
  const newMsg = await db.messages.create(msg);
  io.to(room).emit('newMessage', newMsg);
}

// TODO: rename function !
const playAction = async (action: DB.Action) => {
  //TODO Validation de l'action
  const attacker = await db.cardInstances.get(action.cardinstance_id);
  if (!attacker) return;
  const attackerCard = availableCards[attacker.card_id]
 
  console.log(`${attackerCard.name} is moving to ${action.destination}`);

  const [x, y] = action.destination.split(";").map(txt=>Number(txt))
  const defenderCard = board.find( (sq)=> sq.x===x && sq.y===y)?.card
  if(defenderCard)
    console.log(`${defenderCard.name} is ready to receive him!`);
  else{
    console.log(`No problem, since this square is ${defenderCard}`);
  }

  //WIP Trigger combat + resolution
  if(defenderCard) {
    const attackerValue = attackerCard.corners[Math.floor(Math.random()*4)]
    const defenderValue = defenderCard.corners[Math.floor(Math.random()*4)]

    if(attackerValue==="*") {
      const resolver = await db.cards.getResolver(attackerCard.slug);
      resolver()
      console.log("attacker resolved *");              
    }
    else if(defenderValue==="*") {
      const resolver = await db.cards.getResolver(defenderCard.slug);
      resolver()
      console.log("defender resolved *");              
    }
    else {
      if(attackerValue>defenderValue) console.log("The attacker wins !");
      else console.log("The defender wins !");
    }
  }

  const act: DB.ActionCreate = { ...action, action_id: crypto.randomUUID() };
  const newAct = await db.actions.create(act).catch((err) => {
    console.error(err);
  });
  if (!newAct) return;

  const gameData = await db.games.getExtended(action.game_id);
  if (gameData) {
    const board = generateBoard(gameData);

    io.to(room).emit('syncAction', {
      board,
      nextActionRestrictions: null
    });
  }
}

export default {
  name: 'webSocketServer',
  configureServer(server: ViteDevServer) {
    if (!server.httpServer) return;

    if(!io)
      io = new Server<ClientToServerEvents, ServerToClientEvents>(server.httpServer);

    io.on('connection', (socket) => {
      socket.emit('serverNotice', 'Hello World !');

      socket.on('joinRoom', async (room) => {
        let board: Game.Square[] = [];
        const [,gameId] = room.split("#")
        const gameData = await db.games.getExtended(gameId);
        if (gameData) board = generateBoard(gameData);

        socket.join(room);

        socket.emit('lastMessages', await db.messages.getByRoom(room));

        socket.on('message', broadcastMsg(room));

        socket.on('pushAction', playAction);
      });
    });
  }
};
