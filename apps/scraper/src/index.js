import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import cron from "node-cron";
import { dirname, join, resolve } from "path";
import { scrapeAll } from "./scrape-all.js";
import { scrape as scrapeChabad } from "./strategies/chabad.js";
import { fileURLToPath } from "url";
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3002;

const app = express();
app.use(bodyParser.json());

function authMiddleware(req, res, next) {
  if (![req.query.token, req.body?.token].includes(process.env.API_TOKEN)) {
    return res.status(401).send("Unauthorized api access!");
  }
  return next();
}

app.all("/chabad", authMiddleware, (_, res) => {
  scrapeChabad().then((data) => res.json(data));
});

app.get("/", (_, res) => {
  res.sendFile(resolve(__dirname, "..", "index.html"));
});

app.all("/seed", authMiddleware, (_, res) => {
  scrapeAll((result) => res.send(result ? "ok" : "No new article found"));
});

cron.schedule(
  "* 3,15 * * 0-5",
  () => {
    try {
      scrapeAll();
    } catch (e) {
      console.error(e);
    }
  },
  {
    timezone: "Europe/Rome",
  },
);

app.listen(PORT, () =>
  console.log("scraping server listening on on port", PORT),
);
