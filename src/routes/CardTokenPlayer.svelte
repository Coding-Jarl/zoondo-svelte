<script lang="ts">
	import { currentFocus } from '$lib/stores/game';

	export let card: Game.Card;

	function setCurrentFocus() {
		currentFocus.set(card);
	}
</script>

<img
	src="/assets/card-back-board-alt.webp"
	alt="{card.name} Card owned by you"
	on:mouseenter={setCurrentFocus}
/>

<style lang="scss">
</style>
