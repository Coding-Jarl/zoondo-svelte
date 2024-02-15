<script lang="ts">
	import { dragStart } from '$lib/methods/dragAndDrop';
	import { game } from '$lib/stores/game';

	export let cardInstance: Game.PlayerCard;

	function setCurrentFocus() {
		game.setFocus(cardInstance.card);
	}

	function hDragStart(evt: DragEvent) {
		dragStart(evt, {
			cardInstance,
		})
	}
</script>

<img
	src="/assets/card-back-board-alt.webp"
	alt="{cardInstance.card.name} Card owned by you"
	draggable="true"
	on:mouseenter={setCurrentFocus}
	on:dragstart={hDragStart}
/>

<style lang="scss">
</style>
