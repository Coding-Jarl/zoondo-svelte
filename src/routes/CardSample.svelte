<script lang="ts">
	import { currentFocus } from '$lib/stores/game';
	import { generatePositions, movesToTransitions } from '$lib/game';
	let squares = generatePositions(-2, 2);
</script>

{#if $currentFocus}
	<div class="card">
		<div class="corner cor-tl">{$currentFocus.corners[0]}</div>
		<div class="corner cor-tr">{$currentFocus.corners[1]}</div>
		<div class="corner cor-br">{$currentFocus.corners[2]}</div>
		<div class="corner cor-bl">{$currentFocus.corners[3]}</div>
		<div class="moves">
			{#each squares as square}
				{@const origin = square.x === 0 && square.y === 0 ? 'origin' : ''}
				{@const move = $currentFocus.moves
					.flat()
					.every(([x, y]) => x !== square.x || y !== square.y)
					? ''
					: 'move'}
				<div class={`square ${origin} ${move}`} />
			{/each}
			<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
				{#each movesToTransitions($currentFocus.moves, squares.length) as [src, dst]}
				{@const delta = src.x === 0 && dst.x === 0 ? 49.75 : 50}
					<line
						x1={src.x + 50}
						y1={src.y + 50}
						x2={dst.x + 50}
						y2={dst.y + 50}
						stroke="black"
						stroke-width="2"
					/>
				{/each}
			</svg>
		</div>
		<img src={`/assets/types/${$currentFocus.type}.webp`} alt={$currentFocus.type} class="type" />
		<div class="value">{$currentFocus.value}</div>
		<img
			src={`/assets/tribes/${$currentFocus.slug}.webp`}
			alt={$currentFocus.slug}
			class="picture"
		/>
		<div class="name">{$currentFocus.name}</div>
		{#if $currentFocus.power}
			<div class="power">Special: {$currentFocus.power}</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	.card {
		display: grid;
		place-items: center;
		grid-template-columns: 3em 1fr 1fr 3em;
		grid-template-rows: 3em 1fr 3em;
		gap: 0;
		grid-auto-flow: row;
		grid-template-areas:
			'cor-tl name name cor-tr'
			'type moves picture value'
			'cor-bl power power cor-br';

		& > * {
			outline: 1px dashed violet;
		}

		background-color: black;
	}

	.cor-tl {
		grid-area: cor-tl;
	}

	.cor-bl {
		grid-area: cor-bl;
	}

	.moves {
		grid-area: moves;
	}

	.cor-br {
		grid-area: cor-br;
	}

	.cor-tr {
		grid-area: cor-tr;
	}

	.picture {
		grid-area: picture;
	}

	.type {
		grid-area: type;
	}

	.name {
		grid-area: name;
	}

	.value {
		grid-area: value;
	}

	.power {
		grid-area: power;
	}

	.corner {
		border-radius: 50%;
		width: 80%;
		aspect-ratio: 1;
		background-color: orangered;

		display: grid;
		place-items: center;
	}

	.moves {
		grid-area: moves;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr); 
		gap: 4px;
		aspect-ratio: 1;
		align-self: center;
		position: relative;
		width: 10rem; //TODO valeur magique -_-

		.square {
			width: 100%;
			height: 100%;
			outline: 1px solid lightgray;
			box-sizing: border-box;
			position: relative;

			&::after {
				content: '';
				background: black;
				width: 6px;
				height: 6px;
				display: block;
				top: 50%;
				left: 50%;
				position: absolute;
				transform: translate(-50%, -50%);
				border-radius: 50%;
			}

			&.origin {
				background-color: red;
			}
			&.move {
				background-color: yellow;
			}
		}

		svg {
			position: absolute;
		}
	}
</style>
