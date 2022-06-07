<script>
  export let slide;

  const muted = false;

  const endedHandler = () => {
    console.log('endedHandler');
  };
</script>

<div>
  {#if slide.mediaUrl.fileExt === '.gifv'}
    <video autoPlay loop {muted} onPlaying={endedHandler}>
      <source
        src={slide.mediaUrl.url.replace('.gifv', '.mp4')}
        type="video/mp4"
      />
    </video>
  {:else if ['.mp4', '.webm'].includes(slide.mediaUrl.fileExt)}
    <video autoPlay loop {muted} onPlaying={endedHandler}>
      <source
        src={slide.mediaUrl.url.replace('.mp4', '.webm')}
        type="video/webm"
      />
      <source src={slide.mediaUrl.url} type="video/mp4" />
    </video>
  {:else}
    <div style={{ backgroundImage: `url(${slide.mediaUrl.url})` }} />
  {/if}
</div>
