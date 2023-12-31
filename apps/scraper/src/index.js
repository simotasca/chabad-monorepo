import dotenv from "dotenv";
import { server } from "./server.js";
import { schedule } from "./cron.js";
dotenv.config();

const EXTERNAL_PORT = process.env.SCRAPER_PORT || 3000;

server().listen(3000, () =>
  console.log("Server listening on http://localhost:" + EXTERNAL_PORT)
);

schedule();
