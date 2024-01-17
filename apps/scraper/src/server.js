import bodyParser from "body-parser";
import express from "express";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { scrapeAll } from "./scrape-all.js";
import { scrape as scrapeAish } from "./scraping/aish.js";
import { scrape as scrapeChabad } from "./scraping/chabad.js";

import dotenv from "dotenv";
dotenv.config();

const { API_TOKEN } = process.env;

if (!API_TOKEN) {
  throw new Error("Missing required environment variable API_TOKEN");
}

const __dirname = dirname(fileURLToPath(import.meta.url));

export function server() {
  const app = express();
  app.use(bodyParser.json());

  app.get("/", (_, res) => {
    res.sendFile(resolve(__dirname, "../index.html"));
  });

  app.all("/chabad", (_, res) => {
    scrapeChabad().then((data) => res.json(data));
  });

  app.all("/aish", (_, res) => {
    scrapeAish().then((data) => res.json(data));
  });

  app.all("/seed", authMiddleware, (_, res) => {
    scrapeAll()
      .then(() => res.send("Ok"))
      .catch((e) => {
        console.error(e.message)
        res.send("Error scraping articles");
      });
  });

  return app;
}

function authMiddleware(req, res, next) {
  if (![req.query.token, req.body?.token].includes(API_TOKEN)) {
    return res.status(401).send("Unauthorized api access!");
  }
  return next();
}
