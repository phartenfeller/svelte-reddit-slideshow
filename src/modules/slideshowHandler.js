const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
};

const extPattern = /\.[0-9a-z]+$/i;
const supportedExtensions = [
  '.jpg',
  '.jpeg',
  '.png',
  '.bmp',
  '.gif',
  '.gifv',
  '.webm',
];

async function fetchApi(url) {
  const response = await fetch(url, options);
  const jsonResponse = await response.json();
  return jsonResponse;
}

class SlideshowHandler {
  constructor(subreddit) {
    this.subreddit = subreddit;
    this.slides = [];
    this.after = null;
    this.currentIndex = null;
  }

  async initData() {
    const url = `https://www.reddit.com/r/${this.subreddit}.json`;
    const response = await fetchApi(url);

    const { data } = response;

    this.after = data.after;
    this.slides = this.processPosts(data.children);
    this.currentIndex = -1;
  }

  processPosts(posts) {
    const processed = [];

    console.groupCollapsed('Dismissed Posts');
    for (let i = 0; i < posts.length; i += 1) {
      const p = posts[i];
      // selfposts are only with text -> skip
      if (p.is_self) {
        console.log('Skipping selfpost', p);
        continue;
      }

      const mediaInfo = this.getMediaInfo(p.data.url);
      if (!mediaInfo) {
        console.log('Skipping no matching media info', p);
        continue;
      }

      const postInfo = {
        title: p.data.title,
        url: p.data.url,
        permalink: p.data.permalink,
        score: p.data.score,
        createdUtc: p.data.created_utc,
        nsfw: p.data.over_18,
        pinned: p.data.pinned,
        mediaUrl: mediaInfo.url,
        mediaExtension: mediaInfo.extension,
      };

      processed.push(postInfo);
    }
    console.groupEnd();

    return processed;
  }

  getMediaInfo(postUrl) {
    // stolen from https://github.com/ismaelpadilla/reddit-slideshow
    const mediaUrl = postUrl.replace('http://', 'https://');
    const domain = mediaUrl.match(/:\/\/(.+)\//)[1];

    const match = mediaUrl.match(extPattern);
    const fileExt = match ? match[0] : null;

    if (domain === 'gfycat.com' || supportedExtensions.includes(fileExt)) {
      return { url: mediaUrl, extension: fileExt };
    } else if (domain === 'imgur.com') {
      return { url: mediaUrl + '.jpg', extension: fileExt };
    }

    return null;
  }

  async fetchMore() {
    console.log(
      `Fetching more... current: ${this.currentIndex} - loaded ${this.slides.length}`
    );
    const url = `https://www.reddit.com/r/${this.subreddit}.json?after=${this.after}`;
    const response = await fetchApi(url);

    const { data } = response;

    this.after = data.after;
    const newSlides = this.processPosts(data.children);
    this.slides.push(...newSlides);
  }

  getNextSlide() {
    if (this.currentIndex >= this.slides.length - 4) {
      this.fetchMore();
    }

    if (this.currentIndex <= this.slides.length) {
      this.currentIndex += 1;

      if (!this.slides[this.currentIndex]) {
        console.warn('No more slides', this.currentIndex, this.slides);
      }

      return this.slides[this.currentIndex];
    } else {
      console.warn('Todo: load more');
    }
  }

  getPrevSlide() {
    if (this.currentIndex == 0) {
      return this.slides[this.currentIndex];
    } else {
      this.currentIndex -= 1;
      return this.slides[this.currentIndex];
    }
  }
}

export default SlideshowHandler;
