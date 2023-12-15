<script lang="ts">
	export let messages: Chat.Message[];
	const userId = 1;

	function formatTime(time: number) {
		return new Date(time * 1000).toLocaleTimeString(undefined, {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		});
	}
</script>

<div class="wrapper">
	<ul>
		{#each messages as message}
			<li class={userId === message.userId ? 'message me' : 'message him'}>
				<p>{message.content}</p>
				<span class="time">{formatTime(message.time)}</span>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	ul {
		display: flex;
		flex-flow: column nowrap;
	}
	.message {
		width: 60%;
		color: black;
		margin: 0.5rem;
		padding: 0.5rem;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		position: relative;
		margin-bottom: 1rem;

		&.me {
			align-self: end;
			background-color: lightgreen;
		}

		&.him {
			background-color: lightblue;
		}

		.time {
			position: absolute;
			right: 0;
			top: 100%;
			color: #f2f2f2;
			font-size: small;
		}
	}
</style>
