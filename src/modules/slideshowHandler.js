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
  constructor(subreddit, feed = 'hot') {
    console.log('SlideshowHandler', subreddit, feed);
    this.subreddit = subreddit;
    this.feed = feed;
    this.slides = [];
    this.after = null;
    this.currentIndex = null;
  }

  getRedditUrl() {
    return `https://www.reddit.com/r/${this.subreddit}/${this.feed}.json${
      this.after ? `?after=${this.after}` : ''
    }`;
  }

  async initData() {
    const url = this.getRedditUrl();
    const response = await fetchApi(url);

    const { data } = response;

    this.after = data.after;
    this.slides = await this.processPosts(data.children);
    this.currentIndex = -1;
  }

  async processPosts(posts) {
    const processed = [];

    console.groupCollapsed('Dismissed Posts');
    for (let i = 0; i < posts.length; i += 1) {
      const p = posts[i];
      // selfposts are only with text -> skip
      if (p.is_self) {
        console.log('Skipping selfpost', p);
        continue;
      }

      const mediaInfo = await this.getMediaInfo(
        p.data.url,
        p.data.secure_media_embed
      );
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

  async getMediaInfo(postUrl, embed) {
    // stolen from https://github.com/ismaelpadilla/reddit-slideshow
    const mediaUrl = postUrl.replace('http://', 'https://');
    const domain = mediaUrl.match(/:\/\/(.+)\//)[1];

    const match = mediaUrl.match(extPattern);
    const fileExt = match ? match[0] : null;

    if (supportedExtensions.includes(fileExt)) {
      return { url: mediaUrl, extension: fileExt };
    } else if (domain === 'imgur.com') {
      return { url: mediaUrl + '.jpg', extension: fileExt };
    } else if (domain === 'gfycat.com') {
      console.log('Found gfycat', mediaUrl);
      const gfyId = postUrl.match(/([.0-9a-zA-Z]+)(-|$)/)[1];
      const response = await fetchApi(
        `https://api.gfycat.com/v1/gfycats/${gfyId}`
      );
      console.log('ersp', response.gfyItem);
      return { url: response.gfyItem.mp4Url, extension: '.mp4' };
    } else if (embed.content) {
      const url = embed.content.match(/src="([^"]+)"/)[1];
      if (!url) return null;
      console.log('Found embed', url, 'from', embed.content);
      return { url, extension: 'iframe' };
    }

    return null;
  }

  async fetchMore() {
    console.log(
      `Fetching more... current: ${this.currentIndex} - loaded ${this.slides.length}`
    );
    const url = this.getRedditUrl();
    const response = await fetchApi(url);

    const { data } = response;

    this.after = data.after;
    const newSlides = await this.processPosts(data.children);
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
