<script>
  import routeStore from './stores/routeStore';
  import slideshowStore from './stores/slideshowStore';
  import ROUTES from './constants/routes';

  let subreddit;
  let feed = 'hot';
  let time = 'day';

  const feedOptions = ['hot', 'best', 'top', 'new'];
  const timeOptions = ['hour', 'day', 'week', 'month', 'year', 'all'];

  const clickHandler = (e) => {
    console.log({ subreddit, feed, time });
    let sTime = null;

    const searchParams = new URLSearchParams();
    searchParams.set('subreddit', subreddit);
    searchParams.set('feed', feed);
    if (feed === 'top' && time) {
      sTime = time;
      searchParams.set('time', time);
    }
    location.search = searchParams.toString();
    slideshowStore.set({ subreddit, feed, time: sTime });
    routeStore.set(ROUTES.slideshow);
  };
</script>

<header class="bg-slate-800 px-4 py-2">
  <h1 class="text-3xl font-semibold text-amber-400">Reddit Slideshow</h1>
</header>
<main class="mt-8">
  <form class="max-w-3xl mx-auto text-center" action="#">
    <div class="">
      <div class="">
        <label
          for="company-website"
          class="block text-3xl font-medium text-gray-300"
        >
          Subreddit
        </label>
        <div class="mt-1 flex rounded-md shadow-sm">
          <span
            class="select-none inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-500 bg-slate-700 text-slate-400 text-lg"
          >
            reddit.com/r/
          </span>
          <input
            bind:value={subreddit}
            type="text"
            name="company-website"
            id="company-website"
            class="focus:ring-amber-300 textl-lg focus:border-amber-300 placeholder:text-slate-200/50 text-gray-100 flex-1 block w-full rounded-none rounded-r-md border-slate-500 bg-slate-600"
            placeholder="CatsBeingCats"
          />
        </div>
      </div>
    </div>
    <div class="mt-6">
      <label for="reddit-feed" class="text-xl font-medium text-gray-200"
        >Feed</label
      >

      <fieldset id="reddit-feed" class="mt-4">
        <legend class="sr-only">Reddit Feed</legend>
        <div
          class="space-y-4 sm:flex items-center sm:space-y-0 sm:space-x-10 mx-auto"
        >
          {#each feedOptions as fo}
            <div class="flex items-center">
              <input
                value={fo}
                id="rf-{fo}"
                name="reddit-feed-option"
                type="radio"
                bind:group={feed}
                checked={fo === feed}
                class="focus:ring-amber-200 ring-offset-slate-900 h-4 w-4 text-amber-300 border-slate-800 bg-slate-700"
              />
              <label
                for="rf-{fo}"
                class="ml-3 block text-sm font-medium text-gray-400 capitalize"
              >
                {fo}
              </label>
            </div>
          {/each}
        </div>
      </fieldset>
    </div>

    <div class="mt-6 {feed === 'top' ? 'visible' : 'hidden'}">
      <label for="reddit-time" class="text-xl font-medium text-gray-200"
        >Time</label
      >

      <fieldset id="reddit-time" class="mt-4">
        <legend class="sr-only">Reddit Feed</legend>
        <div
          class="space-y-4 sm:flex items-center sm:space-y-0 sm:space-x-10 mx-auto"
        >
          {#each timeOptions as to}
            <div class="flex items-center">
              <input
                value={to}
                id="rt-{to}"
                name="reddit-time-option"
                type="radio"
                bind:group={time}
                checked={to === time}
                class="focus:ring-amber-200 ring-offset-slate-900 h-4 w-4 text-amber-300 border-slate-800 bg-slate-700"
              />
              <label
                for="rf-{to}"
                class="ml-3 block text-sm font-medium text-gray-400 capitalize"
              >
                {to}
              </label>
            </div>
          {/each}
        </div>
      </fieldset>
    </div>

    <button
      on:click={clickHandler}
      type="button"
      class="inline-flex items-center mt-6 px-6 py-3 border border-transparent text-base font-medium ring-offset-slate-900 rounded-md shadow-sm text-black bg-amber-400 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-200"
      >Button text</button
    >
  </form>
</main>
