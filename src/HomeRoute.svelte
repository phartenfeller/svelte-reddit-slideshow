<script>
  import routeStore from './stores/routeStore';
  import slideshowStore from './stores/slideshowStore';
  import ROUTES from './constants/routes';

  let subreddit;

  const clickHandler = (e) => {
    console.log({ subreddit });
    location.search = `?subreddit=${subreddit}`;
    slideshowStore.set({ subreddit });
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
    <button
      on:click={clickHandler}
      type="button"
      class="inline-flex items-center mt-6 px-6 py-3 border border-transparent text-base font-medium ring-offset-slate-900 rounded-md shadow-sm text-black bg-amber-400 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-200"
      >Button text</button
    >
  </form>
</main>
