import { scrape as scrapeAish } from "./strategies/aish.js";
import { scrape as scrapeChabad } from "./strategies/chabad.js";
import { persist } from "./supabase.js";

export async function scrapeAll() {
  await scrapeChabad().then(persist("chabad", "it.chabad.org"));
  await scrapeAish().then(persist("aish", "aish.com"));
  console.log("Completed all scraping strategies!");
}
