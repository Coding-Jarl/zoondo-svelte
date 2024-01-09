<script lang="ts">
	import { currentFocus } from '$lib/stores/game';

	export let card: Game.Card;
	export let id: string;

	function setCurrentFocus() {
		currentFocus.set(card);
	}

	function hDragStart(evt: DragEvent) {
		if (!evt.dataTransfer) return;

		evt.dataTransfer.dropEffect = 'move';
		evt.dataTransfer.setData('cardId', id);
	}
</script>

<img
	src="/assets/card-back-board-alt.webp"
	alt="{card.name} Card owned by you"
	draggable="true"
	on:mouseenter={setCurrentFocus}
	on:dragstart={hDragStart}
/>

<style lang="scss">
</style>
