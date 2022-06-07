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

class SlideshowHandler {
  constructor(subreddit) {
    this.subreddit = subreddit;
    this.slides = [];
    this.after = null;
    this.currentIndex = null;
  }

  async initData() {
    const url = `https://www.reddit.com/r/${this.subreddit}.json`;
    const response = await fetch(url, options);
    const jsonResponse = await response.json();
    console.log('jsonResponse', jsonResponse);

    const { data } = jsonResponse;

    this.after = data.after;
    this.slides = this.processPosts(data.children);
    this.currentIndex = -1;
  }

  processPosts(posts) {
    let processed = [];

    for (let i = 0; i < posts.length; i += 1) {
      const p = posts[i];
      // selfposts are only with text -> skip
      if (p.is_self) continue;

      const postInfo = {
        title: p.title,
        url: p.url,
        permalink: p.permalink,
        score: p.score,
        createdUtc: p.created_utc,
        nsfw: p.over_18,
        pinned: p.pinned,
        mediaInfo: getMediaInfo(p.url),
      };

      processed.push(postInfo);
    }

    processed = processed.filter((p) => p.mediaInfo !== null);

    return processed;
  }

  getMediaInfo(postUrl) {
    // stolen from https://github.com/ismaelpadilla/reddit-slideshow
    const mediaUrl = postUrl.replace('http://', 'https://');
    const domain = mediaUrl.match(/:\/\/(.+)\//)[1];

    const match = url.match(extPattern);
    const fileExt = match ? match[0] : null;

    if (domain === 'gfycat.com' || supportedExtensions.includes(fileExt)) {
      return { url, extension: fileExt };
    } else if (domain === 'imgur.com') {
      return { url: url + '.jpg', extension: fileExt };
    }

    return null;
  }

  getNextSlide() {
    if (this.currentIndex >= this.slides.length) {
      this.currentIndex += 1;
      return this.slides[this.currentIndex];
    } else {
      console.warn('Todo: load more');
    }
  }
}

export default SlideshowHandler;
