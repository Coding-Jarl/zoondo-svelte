<script lang="ts">
	import CardTokenOpponent from './CardTokenOpponent.svelte';
	import CardTokenPlayer from './CardTokenPlayer.svelte';
	import { page } from '$app/stores';
	import { drop } from '$lib/methods/dragAndDrop';

	export let board: Game.Board;
	export let userId: string;
	export let room = 'waiting';

	function hDragDrop(evt: DragEvent & { currentTarget: HTMLElement }, destination: Game.Position) {
		drop(evt, {
			room,
			gameId: $page.params.id,
			userId,
			destination
		});
	}
</script>

<div class="wrapper">
	{#each board as square}
		<div
			class="square"
			on:drop|preventDefault={(evt) => hDragDrop(evt, { x: square.x, y: square.y })}
			on:dragover|preventDefault
			aria-dropeffect="move"
			role="gridcell"
			tabindex="0"
		>
			{#if square.card}
				{#if square.owner === userId}
					<CardTokenPlayer cardInstance={square} />
				{:else}
					<CardTokenOpponent />
				{/if}
			{/if}
			<span>{square.x}-{square.y}</span>
		</div>
	{/each}
</div>

<style lang="scss">
	@use '$styles/abstracts/variables.module' as *;

	.wrapper {
		display: flex;
		flex-flow: row wrap;
		width: 100%;
		height: 100%;
		background-image: url('/assets/board.webp');
		background-size: cover;
	}
	.square {
		width: calc(100% / $gameSquaresX);
		aspect-ratio: 1;
		border: 1px solid $baseColor;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;

		position: relative;

		span {
			position: absolute;
			inset: 0;
			display: grid;
			place-items: center;
			pointer-events: none;
		}
	}
</style>
