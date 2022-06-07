import { writable } from 'svelte/store';

const slideshowStore = writable({
  subreddit: null,
});

export default slideshowStore;
