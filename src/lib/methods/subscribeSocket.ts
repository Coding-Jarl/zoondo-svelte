import { writable, type Writable } from 'svelte/store';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { currentBoard } from '../../lib/stores/game';
import { addToast } from '../../lib/stores/toast';

export class SocketSubscriber {
  private static instance: Record<string, SocketSubscriber> = {};
  private _socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  private _messages: Writable<Array<DB.Message>>;

  private constructor(room: Room) {
    this._messages = writable<Array<DB.Message>>([]);
    this._socket = io();
    this._socket.emit('joinRoom', room);
    this._socket.on('serverNotice', (msg) => {
      addToast({ msg, type: 'notice' });
    });
    this._socket.on('lastMessages', this._messages.set);
    this._socket.on('newMessage', (msg) => this._messages.update((m) => [...m, msg]));
    this._socket.on('syncAction', (msg) => {
      currentBoard.set(msg.board);
    });
  }

  get socket() {
    return this._socket;
  }

  get messages() {
    return this._messages;
  }

  public static getInstance(room: Room = 'waiting') {
    if (!SocketSubscriber.instance?.[room]) {
      SocketSubscriber.instance[room] = new SocketSubscriber(room);
    }
    return SocketSubscriber.instance[room];
  }
}
export const subscribeSocket = SocketSubscriber.getInstance;
