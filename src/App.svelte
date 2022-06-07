<script>
  import routeStore from './stores/routeStore';
  import ROUTES from './constants/routes';
  import HomeRoute from './HomeRoute.svelte';
  import SlideshowRoute from './SlideshowRoute.svelte';

  let route;
  routeStore.subscribe((value) => {
    route = value;
  });
</script>

<div>
  {#if route === ROUTES.home}
    <HomeRoute />
  {:else if route === ROUTES.slideshow}
    <SlideshowRoute />
  {:else}
    <div>Unknown route {route}</div>
  {/if}
</div>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
    @apply bg-slate-900 text-gray-300 subpixel-antialiased;
  }
</style>
