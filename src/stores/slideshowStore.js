import { writable } from 'svelte/store';

const slideshowStore = writable({
  subreddit: null,
  feed: null,
});

export default slideshowStore;
