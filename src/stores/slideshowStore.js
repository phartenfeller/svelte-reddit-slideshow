import { writable } from 'svelte/store';

const slideshowStore = writable({
  subreddit: null,
  feed: null,
  time: null,
});

export default slideshowStore;
