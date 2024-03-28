import db from '../../../lib/data/db';

type BroadcastMsg = SocketEventsWithIoAndRoom<ClientToServerEvents, 'message'>;

export const broadcastMsg: BroadcastMsg =
  ({ io, room }) =>
  async (content, author_id) => {
    const msg: DB.MessageCreate = {
      id: crypto.randomUUID(),
      author_id,
      room,
      content
    };
    const newMsg = await db.messages.create(msg);
    io.to(room).emit('newMessage', newMsg);
  };
