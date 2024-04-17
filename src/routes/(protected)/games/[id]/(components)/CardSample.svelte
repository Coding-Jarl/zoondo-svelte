<script lang="ts">
  import { currentFocus } from '$lib/stores/game';
  import { generatePositions, movesToTransitions } from '../../../../../lib/methods/game';
  let squares = generatePositions(-2, 2);

  $: cardFocused = $currentFocus?.card;
</script>

<div class="card">
  {#if cardFocused}
    <div class="corner cor-tl">{cardFocused.corners[0]}</div>
    <div class="corner cor-tr">{cardFocused.corners[1]}</div>
    <div class="corner cor-br">{cardFocused.corners[2]}</div>
    <div class="corner cor-bl">{cardFocused.corners[3]}</div>
    <div class="moves">
      {#each squares as square}
        <div
          class="square"
          class:origin={square.x === 0 && square.y === 0}
          class:move={cardFocused.moves.flat().some(([x, y]) => x === square.x && y === square.y)}
        />
      {/each}
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {#each movesToTransitions(cardFocused.moves, squares.length) as [src, dst]}
          <line
            x1={src.x + 50}
            y1={src.y + 51}
            x2={dst.x + 50}
            y2={dst.y + 51}
            stroke="black"
            stroke-width="2"
          />
        {/each}
      </svg>
    </div>
    <img src={`/assets/types/${cardFocused.type}.webp`} alt={cardFocused.type} class="type" />
    <div class="value">{cardFocused.value}</div>
    <img src={`/assets/tribes/${cardFocused.image}`} alt={cardFocused.slug} class="picture" />
    <div class="name">{cardFocused.name}</div>
    {#if cardFocused.power}
      <div class="power">{`Special: ${cardFocused.power}`}</div>
    {/if}
  {/if}
</div>

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
      border: 1px dashed violet;
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
    display: flex;
    flex-flow: row wrap;
    gap: 1px;
    aspect-ratio: 1;
    align-self: center;
    position: relative;
    width: 10rem; //TODO valeur magique -_-

    .square {
      width: calc(20% - 1px);
      aspect-ratio: 1;
      border: 1px solid lightgray;
      box-sizing: border-box;
      position: relative;

      &::after {
        content: '●';
        width: 100%;
        aspect-ratio: 1;
        position: absolute;
        color: black;
        display: grid;
        place-items: center;
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
