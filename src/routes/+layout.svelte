<script lang="ts">
	import '../styles/core/reset.scss';
	import '../styles/core/base.scss';

	import Hotlinks from './Hotlinks.svelte';
</script>

<div class="wrapper">
	<header>
		<Hotlinks />
	</header>
	<slot />
</div>

<style lang="scss">
	.wrapper {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		background-color: hsla(0deg, 0%, 0%, 80%);
		box-shadow: 0px -10px 10px 8px #f2f2f2;

		height: 40px;
		padding-inline: 1rem;
	}
</style>
