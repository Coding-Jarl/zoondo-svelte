<script lang="ts">
  import { cn } from '$lib/methods/cn';
  import { subscribeSocket } from '$lib/methods/subscribeSocket';
  import { afterUpdate } from 'svelte';

  export let room: Room = 'waiting';
  export let userId: DB.User['id'];

  const { socket, messages } = subscribeSocket(room);

  let ul: HTMLUListElement;

  afterUpdate(() => {
    ul.scrollTo({
      top: ul.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  });

  let currMsg = '';
  const hClickSend = () => {
    socket.emit('message', currMsg, userId);
    currMsg = '';
  };
</script>

<div class="wrapper">
  <ul
    bind:this={ul}
    class="height-[calc(45vh-1rem)] flex flex-col flex-nowrap overflow-y-scroll text-black"
  >
    {#each $messages as msg}
      <li
        class={cn(
          'm-2 w-3/5 rounded bg-sky-300 p-2',
          msg.author_id === userId && 'self-end bg-indigo-300'
        )}
      >
        {msg.content}
      </li>
    {/each}
  </ul>
  <form on:submit|preventDefault={hClickSend}>
    <label>
      <span class="sr-only">Message</span>
      <input type="text" bind:value={currMsg} />
    </label>
    <button>Send a message!</button>
  </form>
</div>
