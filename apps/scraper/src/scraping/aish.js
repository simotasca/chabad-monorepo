import { launchBrowser, getProperty } from "../puppeteer.js";

import dotenv from "dotenv";
dotenv.config();

const AISH_HOMEPAGE_URL = "https://aish.com/";

const ARTICLES_SELECTOR = ".oxy-posts .oxy-post";
const ARTICLE_TITLE_SELECTOR = ".oxy-post-title";
const ARTICLE_IMG_SELECTOR = "img.oxy-post-image, .lead-graphic-desktop > a > img";

export async function scrape() {
  let scrapedArticles = [];

  const browser = await launchBrowser();

  try {
    console.log("Scraping aish.com");

    const page = await browser.newPage();
    await page.goto(AISH_HOMEPAGE_URL, {
      waitUntil: "domcontentloaded",
    });

    console.log(" - Aish homepage opened");

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
      title: await getProperty(itemTitle, "textContent"),
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
