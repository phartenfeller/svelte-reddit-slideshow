<script>
  import routeStore from './stores/routeStore';
  import slideshowStore from './stores/slideshowStore';
  import ROUTES from './constants/routes';

  let subreddit;
  let feed = 'hot';

  const clickHandler = (e) => {
    console.log({ subreddit, feed });
    location.search = `?subreddit=${subreddit}`;
    slideshowStore.set({ subreddit, feed });
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
          <div class="flex items-center">
            <input
              id="rf-hot"
              name="reddit-feed-option"
              type="radio"
              group={feed}
              checked
              class="focus:ring-amber-200 ring-offset-slate-900 h-4 w-4 text-amber-300 border-slate-800 bg-slate-700"
            />
            <label
              for="rf-hot"
              class="ml-3 block text-sm font-medium text-gray-400"
            >
              Hot
            </label>
          </div>

          <div class="flex items-center">
            <input
              id="rf-top"
              name="reddit-feed-option"
              type="radio"
              group={feed}
              class="focus:ring-amber-200 ring-offset-slate-900 h-4 w-4 text-amber-300 border-slate-800 bg-slate-700"
            />
            <label
              for="rf-top"
              class="ml-3 block text-sm font-medium text-gray-400"
            >
              Top
            </label>
          </div>

          <div class="flex items-center">
            <input
              id="rf-new"
              name="reddit-feed-option"
              type="radio"
              group={feed}
              class="focus:ring-amber-200 ring-offset-slate-900 h-4 w-4 text-amber-300 border-slate-800 bg-slate-700"
            />
            <label
              for="rf-new"
              class="ml-3 block text-sm font-medium text-gray-400"
            >
              New
            </label>
          </div>

          <div class="flex items-center">
            <input
              id="rf-rising"
              name="reddit-feed-option"
              type="radio"
              group={feed}
              class="focus:ring-amber-200 ring-offset-slate-900 h-4 w-4 text-amber-300 border-slate-800 bg-slate-700"
            />
            <label
              for="rf-rising"
              class="ml-3 block text-sm font-medium text-gray-400"
            >
              Rising
            </label>
          </div>
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
