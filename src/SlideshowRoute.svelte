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

  const nextSlide = () => {
    console.log('nextSlide');
    currentSlide = slideshow.getNextSlide();
  };

  const prevSlide = () => {
    console.log('prevSlide');
    currentSlide = slideshow.getPrevSlide();
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  });
</script>

<div>
  <div class="absolute top-0 left-0">
    Subreddit: {$slideshowStore.subreddit} - {currentSlide &&
      currentSlide.title}
  </div>

  <button
    type="button"
    class="absolute left-0 ml-1 p-3 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-lg z-40"
    style="margin-top: 50vh;
  margin-bottom: 50vh;"
    on:click={prevSlide}
  >
    <svg
      class="w-12 h-12"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        fill-rule="evenodd"
        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
        clip-rule="evenodd"
      /></svg
    >
  </button>

  <button
    type="button"
    class="absolute right-0 mr-1 p-3 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-lg z-40"
    style="margin-top: 50vh;
  margin-bottom: 50vh;"
    on:click={nextSlide}
  >
    <svg
      class="w-12 h-12"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        fill-rule="evenodd"
        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
        clip-rule="evenodd"
      /></svg
    >
  </button>

  {#if renderSlide}
    {#if currentSlide}
      <Slide
        mediaUrl={currentSlide.mediaUrl}
        mediaExtension={currentSlide.mediaExtension}
        {nextSlide}
      />
    {:else}
      <div>No slide</div>
    {/if}
  {:else}
    <div>Loading...</div>
  {/if}
</div>
