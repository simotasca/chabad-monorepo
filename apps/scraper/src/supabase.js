import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const { SUPABASE_HOST, SUPABASE_SERVICE_ROLE_KEY } = process.env;

if (!SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing required environment variable SUPABASE_SERVICE_ROLE_KEY");
}

if (!SUPABASE_HOST) {
  throw new Error("Missing required environment variable SUPABASE_HOST");
}

const supabase = createClient(SUPABASE_HOST, SUPABASE_SERVICE_ROLE_KEY);

export default supabase;

/**
 * @param { string } source
 * @param { string | undefined } websiteName
 */
export function persistScraped(source, websiteName) {
  websiteName = websiteName || source;

  /** @param { {title:string; href:string; img:string;}[] } articles */
  return async function (articles) {
    console.log("Persisting articles from " + websiteName);

    let { data: alreadyScraped, error: selectOldError } = await supabase
      .from("scraped")
      .select("url")
      .eq("category", source)
      .in(
        "url",
        articles.map((a) => a.href)
      );

    if (selectOldError) {
      console.error(`ERROR fetching old scraped articles from ${websiteName}:`, selectOldError.message);
      return false;
    }

    if (!alreadyScraped) alreadyScraped = [];

    const onlyNew = articles
      .filter((a) => !alreadyScraped.find((old) => old.url === a.href))
      .map((a) => ({
        title: a.title,
        url: a.href,
        image: a.img,
        category: source,
      }));

    if (onlyNew.length == 0) {
      console.log(" - all articles were already persisted");
      return true;
    }

    const { error: insertError } = await supabase.from("scraped").insert(onlyNew, { defaultToNull: true });

    if (insertError) {
      console.error(`ERROR inserting scraped articles from ${websiteName}:` + insertError.message);
      return false;
    }

    console.log(` - successfully persisted ${onlyNew.length} articles`);

    return true;
  };
}

export async function persistYoutube(type) {
  return async function (ytApiVideos) {
    let videos = ytApiVideos.map((v) => ({ ...v, url: youtubeIdToEmbed(v.id.videoId) }));

    let { data: alreadySaved, error: selectOldError } = await supabase
      .from("live_video")
      .select()
      .in(
        "url",
        videos.map((a) => a.urls)
      );

    if (selectOldError) {
      console.error(`ERROR fetching old youtube ${type}:`, selectOldError.message);
      return false;
    }

    if (!alreadySaved) alreadySaved = [];

    const onlyNew = articles
      .filter((a) => !alreadySaved.find((old) => old.url === youtubeIdToEmbed(v.id.videoId)))
      .map((a) => ({
        title: v.snippet.title,
        date: v.snippet.publishedAt,
        youtube_link: youtubeIdToEmbed(v.id.videoId),
        category: type,
      }));

    if (onlyNew.length == 0) {
      console.log(" - all videos were already persisted");
      return true;
    }

    const { error: insertError } = await supabase.from("live_video").insert(onlyNew, { defaultToNull: true });

    if (insertError) {
      console.error(`ERROR inserting youtube ${type}: ${insertError.message}`);
      return false;
    }

    console.log(` - successfully persisted ${onlyNew.length} ${type}`);

    return true;
  };
}

function youtubeIdToEmbed(videoId) {
  return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  // return `https://www.youtube.com/watch?v=${videoId}`;
}

// let vid = {
//   kind: "youtube#searchResult",
//   etag: "7iH8L09ITLjXOObOlsyPr7d-Ykc",
//   id: { kind: "youtube#video", videoId: "CdvyKFk1BHg" },
//   snippet: {
//     publishedAt: "2024-01-17T14:07:08Z",
//     channelId: "UCoMdktPbSTixAyNGwb-UYkQ",
//     title: "Bodycam footage of &#39;mistaken police raid&#39;",
//     description:
//       "Police raided an address in Ohio, believing a suspect was there - but he wasn't - and are now being accused of injuring a baby.",
//     thumbnails: { default: {}, medium: {}, high: {} },
//     channelTitle: "Sky News",
//     liveBroadcastContent: "none",
//     publishTime: "2024-01-17T14:07:08Z",
//   },
// };