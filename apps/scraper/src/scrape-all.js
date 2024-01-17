import { persistScraped, persistYoutube } from "./supabase.js";
import { scrape as scrapeAish } from "./scraping/aish.js";
import { scrape as scrapeChabad } from "./scraping/chabad.js";
import { scrape as scrapeCollive } from "./scraping/collive.js";
import { channels, getYoutubeLives } from "./youtube/index.js";

export async function scrapeAll() {
  await scrapeChabad().then(persistScraped("chabad", "it.chabad.org")).catch(nothing);
  await scrapeAish().then(persistScraped("aish", "aish.com")).catch(nothing);
  await scrapeCollive().then(persistScraped("collive", "collive.com")).catch(nothing);
  await getYoutubeLives(channels.sky, 40).then(persistYoutube);

  console.log("Completed all scraping strategies!");
}

const nothing = () => {};
