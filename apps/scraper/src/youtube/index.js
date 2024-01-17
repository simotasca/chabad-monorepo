import { google } from "googleapis";

export const channels = Object.freeze({
  "rambam-project": "UCNVUZRyBy4XDG6561I18jxA",
  "sky": "UCoMdktPbSTixAyNGwb-UYkQ"
});

const youtube = new google.youtube({
  version: "v3",
  auth: "AIzaSyCePOA6VYlMJ6xuNvpMtrhSvylBl6yI9no",
});

export async function getYoutubeVideos(channelId, maxResults) {
  return getYouTubeContents("video", channelId, maxResults);
}

export async function getYoutubeLives(channelId, maxResults) {
  return getYouTubeContents("live", channelId, maxResults);
}

async function getYouTubeContents(type, channelId, maxResults) {
  return youtube.search
    .list({
      part: "id, snippet",
      maxResults,
      channelId,
      type,
      order: "date",
    })
    .then(({ data }) => {
      return { videos: data.items, error: null };
    })
    .catch((e) => {
      let { error } = e;
      if (!error) {
        const errObj = e.response.data.error;
        error = errObj.message;
        if (!!errObj.errors?.length) {
          error = errObj.errors[0].reason + " " + errObj.errors[0].message;
        }
      }
      return { videos: null, error };
    });
}

















// let { videos, error } = await getChannelVideos(channelId, 40);

// if (error) throw new Error("ERROR fetching videos: " + error);

// videos.forEach((i) => {
//   console.log(`https://www.youtube.com/watch?v=${i.id.videoId}`);
// });
