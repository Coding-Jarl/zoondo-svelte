import { type ViteDevServer } from 'vite';
import { Server } from 'socket.io';
import { broadcastMsg } from './broadcastMsg';
import { playAction } from './playAction';
import db from '../../../lib/data/db';
import { isRoomGame } from '../../../lib/methods/isType';
import { arrayOfKeysToObject } from '../../../lib/methods/array';
import { Board } from '../../../lib/extends/Board';

async function getBoard(room: RoomGame) {
  const board = new Board();
  const [, gameId] = room.split('#');
  const keys = arrayOfKeysToObject(['actions', 'cards', 'player1', 'player2'], true);
  const gameData = await db.games.get(gameId, keys);
  if (gameData) {
    await board.generate(gameData.cards, gameData.actions);
  }

  return Array.from(board.values());
}
export default {
  name: 'webSocketServer',
  configureServer(server: ViteDevServer) {
    if (!server.httpServer) return;

    const io = new Server<ClientToServerEvents, ServerToClientEvents>(server.httpServer);

    io.on('connection', (socket) => {
      socket.emit('serverNotice', 'Hello World !');

      socket.on('joinRoom', async (room) => {
        socket.join(room);

        if (isRoomGame(room)) {
          const board: Game.Square[] = await getBoard(room);
          socket.on('pushAction', playAction({ io, room, board }));
        }
        socket.on('message', broadcastMsg({ io, room }));

        socket.emit('lastMessages', await db.messages.getByRoom(room));
      });
    });
  }
};
