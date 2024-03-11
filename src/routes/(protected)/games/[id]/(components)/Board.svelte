<script lang="ts">
  import CardTokenOpponent from './CardTokenOpponent.svelte';
  import CardTokenPlayer from './CardTokenPlayer.svelte';
  import { subscribeSocket } from '$lib/methods/subscribeSocket';
  import { page } from '$app/stores';
  import { currentBoard, currentFocus } from '$lib/stores/game';
  import { onMount } from 'svelte';
  import { cn } from '$lib/methods/cn';

  export let board: Game.Board;
  export let userId: string;
  export let isFirstPlayer: boolean | undefined; // TODO refacto
  export let room = 'waiting';
  let dropTargets: Game.Move[] = [];

  $: {
    if ($currentFocus?.card) {
      const { x, y } = $currentFocus;
      const token = $currentFocus.card;
      // if(!isFirstPlayer) {
      dropTargets = token.moves.flat().map((move) => [move[0] + x, move[1] + y]);
      // } else {
      // 	dropTargets =token.moves.flat().map(move=>[-move[0]+x, -move[1]+y])
      // }
    }
  }

  onMount(() => {
    if (!isFirstPlayer) {
      currentBoard.set(board);
    } else {
      currentBoard.set(board.reverse());
    }
  });

  const { socket } = subscribeSocket(room);

  function hDragDrop(evt: DragEvent & { currentTarget: HTMLElement }) {
    if (!evt.dataTransfer) return;

    if (!evt.currentTarget.dataset.targettable) {
      return;
    }

    const coordsDst = `${evt.currentTarget.dataset.x};${evt.currentTarget.dataset.y}`;

    if ($currentFocus && 'instanceid' in $currentFocus) {
      const newAction: DB.Action = {
        action_id: '',
        cardinstance_id: $currentFocus?.instanceid,
        destination: coordsDst,
        game_id: $page.params.id,
        player_id: userId
      };
      socket.emit('pushAction', newAction);
    }
  }
</script>

<div class="flex h-full w-full flex-row flex-wrap bg-[url('/assets/board.webp')] bg-cover">
  {#each $currentBoard as square}
    {@const targettable = dropTargets.some(
      (target) => target[0] === square.x && target[1] === square.y
    )}
    <div
      class={cn(
        'relative box-border flex aspect-square w-[calc(100%/6)] items-center justify-center border border-solid border-slate-900',
        targettable && 'bg-yellow-500/50'
      )}
      on:drop|preventDefault={hDragDrop}
      on:dragover|preventDefault
      data-x={square.x}
      data-y={square.y}
      data-targettable={targettable}
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
      <span class="pointer-events-none absolute inset-0 grid place-items-center">
        {square.x}-{square.y}
      </span>
    </div>
  {/each}
</div>
