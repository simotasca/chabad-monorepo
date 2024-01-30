import { launchBrowser, getProperty } from "../puppeteer.js";

import dotenv from "dotenv";
dotenv.config();

const COLLIVE_HOMEPAGE_URL = "https://collive.com/";

const ARTICLES_SELECTOR = ".grid-container.article_custom"
const ARTICLE_TITLE_SELECTOR = ".post-title > a";
const ARTICLE_IMG_SELECTOR = "img.wp-post-image";

export async function scrape() {
  let scrapedArticles = [];

  const browser = await launchBrowser();

  try {
    console.log("Scraping collive.com");

    const page = await browser.newPage();
    await page.goto(COLLIVE_HOMEPAGE_URL, {
      waitUntil: "domcontentloaded",
    });

    console.log(" - Collive homepage opened");

    await page.waitForSelector(ARTICLES_SELECTOR);
    const items = await page.$$(ARTICLES_SELECTOR);
    scrapedArticles = await scrapeItems(items);

  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }

  console.log(" - Scraped", scrapedArticles.length, "articles");

  return scrapedArticles;
}

async function scrapeItems(items) {
  const scraped = [];
  for (const item of items) {
    const itemTitle = await item.$(ARTICLE_TITLE_SELECTOR);
    const itemImage = await item.$(ARTICLE_IMG_SELECTOR);
    const article = {
      title: (await getProperty(itemTitle, "textContent")).trim(),
      href: await getProperty(itemTitle, "href"),
      img: itemImage ? await getProperty(itemImage, "src") : null,
    };
    const alreadyScrapedIdx = scraped.findIndex((a) => a.title === article.title);
    if (alreadyScrapedIdx != -1) {
      if (article.img !== null) {
        scraped[alreadyScrapedIdx].img = article.img;
      }
      continue;
    }
    scraped.push(article);
  }
  return scraped;
}
