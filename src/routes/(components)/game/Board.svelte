<script lang="ts">
	import { addToast } from '$lib/stores/toast';
	import CardTokenOpponent from './CardTokenOpponent.svelte';
	import CardTokenPlayer from './CardTokenPlayer.svelte';

	export let board: Game.Board;

	function hDragDrop(evt: DragEvent & { currentTarget: HTMLElement }) {
		if (!evt.dataTransfer) return;
		
		const cardId = evt.dataTransfer.getData('cardId');

		const coords = `${evt.currentTarget.dataset.x};${evt.currentTarget.dataset.y}`;

		addToast({ msg: `Dropped ${cardId} into ${coords}`, type: 'notice' });
	}
</script>

<div class="wrapper">
	{#each board as square, id}
		<div
			class="square"
			on:drop|preventDefault={hDragDrop}
			on:dragover|preventDefault
			data-x={square.x}
			data-y={square.y}
			aria-dropeffect="move"
			role="gridcell"
			tabindex="0"
		>
			{#if square.card === null}
				<CardTokenOpponent />
			{:else if square.card}
				<CardTokenPlayer card={square.card} id={`card-${id}`} />
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
