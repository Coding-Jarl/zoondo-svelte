<script lang="ts">
	import { page } from '$app/stores';
	import Board from './(components)/Board.svelte';
	import CardSample from './(components)/CardSample.svelte';
	import Chat from '$lib/components/Chat.svelte';

	export let data;
	$: ({
		user: { userId },
		board
	} = data);
</script>

<svelte:head>
	<title>Zoondo : Game</title>
</svelte:head>

<main>
	<!-- {#await data.board}
		<p>Loading...</p>
	{:then board}  -->
	{#if board}
		<div class="Board">
			<Board {board} {userId} room="game#{$page.params.id}" />
		</div>
		<div class="CardSample">
			<CardSample />
		</div>
	{/if}
	<div class="Chat">
		<Chat room="game#{$page.params.id}" {userId} />
	</div>
	<!-- {:catch err}
		<p>Error: {err.message}</p>
	{/await} -->
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
