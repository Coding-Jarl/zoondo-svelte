<script lang="ts">
	import CardTokenOpponent from './CardTokenOpponent.svelte';
	import CardTokenPlayer from './CardTokenPlayer.svelte';

	export let board: Game.Board;
</script>

<div class="wrapper">
	{#each board as square}
		<div class="square">
			{#if square.card === null}
				<CardTokenOpponent />
			{:else if square.card}
				<CardTokenPlayer card={square.card} />
			{/if}
		</div>
	{/each}
</div>

<style lang="scss">
	@use '../styles/abstracts/variables.module' as *;

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
	}
</style>
