<script lang="ts">
	import {currentToasts} from "$lib/stores/toast"
</script>

<ul>
	{#each $currentToasts as item}
		<li class={item.type}>{item.msg}</li>
	{/each}
</ul>

<style lang="scss">
  ul {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    margin-top: 1rem;
    justify-content: center;
    flex-direction: column;
    z-index: 1;

	li {
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 0.2rem;
		display: flex;
		align-items: center;
		margin: 0 auto 0.5rem auto;
		width: 20rem;

		&.error {
			background: IndianRed;
		}
		&.success {
			background: MediumSeaGreen;
		}
		&.notice {
			background: SkyBlue;
		}
  }
}
</style>
