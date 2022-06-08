<script>
  export let mediaUrl;
  export let mediaExtension;

  console.log({ mediaUrl, mediaExtension });

  if (mediaExtension === 'iframe') {
    console.log('loading iframe');
  }

  const muted = false;

  const endedHandler = () => {
    console.log('endedHandler');
  };
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
