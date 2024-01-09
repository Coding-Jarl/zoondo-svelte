import { addToast } from '$lib/stores/toast';
import { io } from 'socket.io-client';
import { writable } from 'svelte/store';

export function subscribeSocket(initialMessages: Array<Chat.Message> = []) {
	const messages = writable<Array<Chat.Message>>(initialMessages);
	const socket = io();

	socket.on('serverNotice', (msg: string) => {
		addToast({ msg, type: 'notice' });
	});
	socket.on('lastMessages', (msg: Array<Chat.Message>) => {
		messages.set(msg);
	});
	socket.on('newMessage', (msg: Chat.Message) => {
		messages.update((m) => [...m, msg]);
	});

	return { socket, messages };
}
