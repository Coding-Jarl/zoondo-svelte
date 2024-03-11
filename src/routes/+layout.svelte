<script lang="ts">
  import '$styles/core/reset.scss';
  import '../app.css';

  import Hotlinks from './(components)/Hotlinks.svelte';
  import Toasts from './(components)/Toasts.svelte';
</script>

<div class="wrapper">
  <header class="flex justify-between">
    <Hotlinks />
  </header>
  <slot />
  <Toasts />
</div>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.slate.950);
    color: theme(colors.slate.50);
  }
</style>
