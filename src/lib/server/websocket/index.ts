import { type ViteDevServer } from 'vite';
import { Server } from 'socket.io';
import { broadcastMsg } from './broadcastMsg';
import { playAction } from './playAction';
import db from '../../../lib/data/db';
import { isRoomGame, generateBoard, arrayOfKeysToObject } from '../../../lib/methods';

export default {
  name: 'webSocketServer',
  configureServer(server: ViteDevServer) {
    if (!server.httpServer) return;

    const io = new Server<ClientToServerEvents, ServerToClientEvents>(server.httpServer);

    io.on('connection', (socket) => {
      socket.emit('serverNotice', 'Hello World !');

      socket.on('joinRoom', async (room) => {
        socket.join(room);
        socket.emit('lastMessages', await db.messages.getByRoom(room));
        socket.on('message', broadcastMsg({ io, room }));

        if (isRoomGame(room)) {
          const board: Game.Square[] = await getBoard(room);
          socket.on('pushAction', playAction({ io, room, board }));
        }
      });
    });
  }
};

async function getBoard(room: RoomGame) {
  let board: Game.Square[] = [];
  const [, gameId] = room.split('#');
  const keys = arrayOfKeysToObject(['actions', 'cards', 'player1', 'player2'], true);
  const gameData = await db.games.get(gameId, keys);
  // console.log(gameData); //! L'id du joueur 2 semble être celui du socket io !
  if (gameData) board = generateBoard(gameData);

  return board;
}
