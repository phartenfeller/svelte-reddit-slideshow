<script>
  import { beforeUpdate, afterUpdate } from 'svelte';

  export let mediaUrl;
  export let mediaExtension;
  export let nextSlide;

  if (mediaExtension === 'iframe') {
    console.log('loading iframe');
  }

  const muted = false;

  const endedHandler = () => {
    console.log('endedHandler');
  };

  let timeout;

  beforeUpdate(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });

  afterUpdate(() => {
    console.log({ mediaUrl, mediaExtension });
    let timeoutMs;

    if (['.mp4', '.webm', '.gifv', '.gif', 'iframe'].includes(mediaExtension)) {
      timeoutMs = 15 * 1000;
    } else {
      timeoutMs = 5 * 1000;
    }

    console.log('setting timeout');
    timeout = setTimeout(() => {
      nextSlide();
    }, timeoutMs);
  });
</script>

<div>
  {#if mediaExtension === '.gifv'}
    <video
      id="slide"
      class="video-frame"
      autoPlay
      loop
      {muted}
      onPlaying={endedHandler}
    >
      <source src={mediaUrl.replace('.gifv', '.mp4')} type="video/mp4" />
    </video>
  {:else if ['.mp4', '.webm'].includes(mediaExtension)}
    <video
      id="slide"
      class="video-frame"
      autoPlay
      loop
      {muted}
      onPlaying={endedHandler}
    >
      <source src={mediaUrl.replace('.mp4', '.webm')} type="video/webm" />
      <source src={mediaUrl} type="video/mp4" />
    </video>
  {:else if mediaExtension === 'iframe'}
    <iframe class="video-frame" src={mediaUrl} title="iframe" />
  {:else}
    <div
      id="slide"
      class="image-frame"
      style="background-image: url('{mediaUrl}')"
    />
  {/if}
</div>

<style>
  .image-frame {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .video-frame {
    width: 100vw;
    height: 100vh;
  }
</style>
