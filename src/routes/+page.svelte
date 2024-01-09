<script lang="ts">
	import Board from './(components)/game/Board.svelte';
	import CardSample from './(components)/game/CardSample.svelte';
	import Chat from './(components)/layout/Chat.svelte';
	import { subscribeSocket } from '$lib/methods/subscribeSocket';

	export let data;
	let currMsg = '';

	const { socket, messages } = subscribeSocket([]);

	const hClickSend = () => {
		socket.emit('message', currMsg);
		currMsg = '';
	};
</script>

<svelte:head>
	<title>Zoondo : Board</title>
</svelte:head>

<main>
	<div class="Board">
		<Board board={data.board} />
	</div>
	<div class="CardSample">
		<CardSample />
	</div>
	<div class="Chat">
		<Chat messages={$messages} />
		<form on:submit|preventDefault={hClickSend}>
			<label>
				<span class="sr-only">Message:</span>
				<input type="text" bind:value={currMsg} />
			</label>
			<button>Send a message!</button>
		</form>
	</div>
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 1rem;
		grid-template-areas:
			'Board CardSample'
			'Board Chat';

		height: 90vh;

		& > * {
			border: 2px dotted yellowgreen;
		}
	}
	.Board {
		grid-area: Board;
	}
	.CardSample {
		grid-area: CardSample;
	}
	.Chat {
		grid-area: Chat;
	}
</style>
