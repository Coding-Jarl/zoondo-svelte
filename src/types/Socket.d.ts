import type { Server } from 'socket.io';

declare global {
  interface ServerToClientEvents {
    serverNotice: (msg: string) => void;
    lastMessages: (messages: Array<DB.Message>) => void;
    newMessage: (msg: DB.Message) => void;
    syncAction: ({
      board,
      nextActionRestrictions
    }: {
      board: Game.Board;
      nextActionRestrictions: object | null;
    }) => void;
  }

  interface ClientToServerEvents {
    joinRoom: (room: Room) => void;
    message: (content: string, author_id: string) => void;
    pushAction: (action: DB.Action) => void;
  }

  type SocketSide<SideEvents extends ClientToServerEvents | ServerToClientEvents> =
    SideEvents extends ClientToServerEvents
      ? Server<ClientToServerEvents, ServerToClientEvents>
      : Server<ServerToClientEvents, ClientToServerEvents>;

  type SocketEvents<
    T extends ClientToServerEvents | ServerToClientEvents,
    K extends keyof T,
    Props extends object = object
  > = (props: Props) => T[K];

  type SocketEventsWithIo<
    T extends ClientToServerEvents | ServerToClientEvents,
    K extends keyof T,
    Props extends object = object
  > = (props: { io: SocketSide<T> } & Props) => T[K];

  type SocketEventsWithIoAndRoom<
    T extends ClientToServerEvents | ServerToClientEvents,
    K extends keyof T,
    Props extends object = object
  > = (props: { io: SocketSide<T>; room: Room } & Props) => T[K];

  type RoomGame = `game#${string}`;
  type RoomWaiting = 'waiting';
  type Room = RoomGame | RoomWaiting;
}

export {};
