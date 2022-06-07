<script>
  export let slide;

  console.log('slide', slide);

  const { mediaInfo } = slide;
  const { url, extension } = mediaInfo;

  const muted = false;

  const endedHandler = () => {
    console.log('endedHandler');
  };
</script>

<div>
  {#if extension === '.gifv'}
    <video id="slide" autoPlay loop {muted} onPlaying={endedHandler}>
      <source src={url.replace('.gifv', '.mp4')} type="video/mp4" />
    </video>
  {:else if ['.mp4', '.webm'].includes(extension)}
    <video id="slide" autoPlay loop {muted} onPlaying={endedHandler}>
      <source src={url.replace('.mp4', '.webm')} type="video/webm" />
      <source src={url} type="video/mp4" />
    </video>
  {:else}
    <div
      id="slide"
      class="image-frame"
      style="background-image: url('{url}')"
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
</style>
