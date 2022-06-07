<script>
  import { onMount } from 'svelte';
  import slideshowStore from './stores/slideshowStore';
  import SlideshowHandler from './modules/slideshowHandler';
  import Slide from './components/Slide.svelte';

  const slideshow = new SlideshowHandler($slideshowStore.subreddit);

  let renderSlide = false;
  let currentSlide = null;

  onMount(async () => {
    await slideshow.initData();
    currentSlide = slideshow.getNextSlide();
    renderSlide = true;
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      console.log('nextSlide');
      currentSlide = slideshow.getNextSlide();
    } else if (e.key === 'ArrowLeft') {
      console.log('prevSlide');
      currentSlide = slideshow.getPrevSlide();
    }
  });
</script>

<div>
  <div class="absolute top-0 left-0">
    Subreddit: {$slideshowStore.subreddit} - {currentSlide &&
      currentSlide.title}
  </div>
  {#if renderSlide}
    {#if currentSlide}
      <Slide
        mediaUrl={currentSlide.mediaUrl}
        mediaExtension={currentSlide.mediaExtension}
      />
    {:else}
      <div>No slide</div>
    {/if}
  {:else}
    <div>Loading...</div>
  {/if}
</div>
