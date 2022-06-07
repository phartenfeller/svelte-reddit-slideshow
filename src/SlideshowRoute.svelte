<script async>
  import slideshowStore from './stores/slideshowStore';
  import SlideshowHandler from './modules/slideshowHandler';
  import Slide from './components/Slide.svelte';

  let renderSlide = false;
  let currentSlide = null;

  const slideshow = new SlideshowHandler($slideshowStore.subreddit);
  (async () => {
    await slideshow.initData();
    currentSlide = slideshow.getNextSlide();
    renderSlide = true;
  })();
</script>

<div>
  Subreddit: {$slideshowStore.subreddit}
  {#if renderSlide}
    <Slide slide={$currentSlide} />
  {:else}
    <div>Loading...</div>
  {/if}
</div>
