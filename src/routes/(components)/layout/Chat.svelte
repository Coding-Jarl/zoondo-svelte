<script lang="ts">
	import { afterUpdate } from 'svelte';
	export let messages: Array<Chat.Message>;

	const userId = 1;

	let ul: HTMLUListElement;

	afterUpdate(() => {
		ul.scrollTo({
			top: ul.scrollHeight,
			left: 0,
			behavior: 'smooth'
		});
	});
</script>

<div class="wrapper">
	<ul bind:this={ul}>
		{#each messages as msg}
			<li class={msg.userId === userId ? 'me' : 'him'}>{msg.content}</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	ul {
		display: flex;
		flex-flow: column nowrap;
		color: black;
		height: calc(45vh - 1rem);
		overflow-y: scroll;
	}
	li {
		width: 60%;
		background-color: rgba(144, 238, 144, 0.445);
		margin: 0.5rem;
		padding: 0.5rem;
		border-radius: 5px;

		&.me {
			align-self: end;
			background-color: rgba(173, 216, 230, 0.452);
		}
	}
</style>
