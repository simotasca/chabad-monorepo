// import { server } from "./server.js";
// import { schedule } from "./cron.js";

// import dotenv from "dotenv";
// dotenv.config();

// const EXTERNAL_PORT = process.env.SCRAPER_PORT || 3000;

// server().listen(3000, () =>
//   console.log("Server listening on http://localhost:" + EXTERNAL_PORT)
// );

// schedule();

import { persistYoutube } from "./supabase.js";
import { channels, getYoutubeLives } from "./youtube/index.js";

let { videos, error } = await getYoutubeLives(channels.sky, 40);

if (error) throw new Error("ERROR fetching videos: " + error);

// videos.forEach((i) => {
//   console.log(i);
// });

console.log("MASJASJD")
await getYoutubeLives(channels.sky, 10).then(persistYoutube("video"));
console.log("FINNNEEEEEH")
