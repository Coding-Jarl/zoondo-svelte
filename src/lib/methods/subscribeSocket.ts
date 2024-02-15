import { addToast } from '$lib/stores/toast';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { writable } from 'svelte/store';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

export function subscribeSocket(room = 'waiting') {
	const messages = writable<Array<DB.Message>>([]);

	socket.emit('joinRoom', room);

	socket.on('serverNotice', (msg) => {
		addToast({ msg, type: 'notice' });
	});
	socket.on('lastMessages', (msg) => {
		messages.set(msg);
	});
	socket.on('newMessage', (msg) => {
		messages.update((m) => [...m, msg]);
	});
	socket.on('newAction', (act) => {
		addToast({
			msg: `Succesfully dropped ${act.cardinstance_id} into ${act.destination}`,
			type: 'notice'
		});
	});

	return { socket, messages };
}
