import { launchBrowser, getProperty } from "../puppeteer.js";

const COLLIVE_HOMEPAGE_URL = "https://collive.com/";

const AISH_HOMEPAGE_URL = "https://aish.com/";

const ARTICLES_SELECTOR = ".oxy-posts .oxy-post";
const ARTICLE_TITLE_SELECTOR = ".oxy-post-title";
const ARTICLE_IMG_SELECTOR = "img.oxy-post-image, .lead-graphic-desktop > a > img";

import dotenv from "dotenv";
dotenv.config();

export async function scrape() {
  const scrapedArticles = [];

  const browser = await launchBrowser();

  try {
    console.log("Scraping aish.com");

    const page = await browser.newPage();
    await page.goto(AISH_HOMEPAGE_URL, {
      waitUntil: "domcontentloaded",
    });

    console.log(" - Aish homepage opened");

    await page.waitForSelector(ARTICLES_SELECTOR);
    const oxyItems = await page.$$(ARTICLES_SELECTOR);

    for (const item of oxyItems) {
      const itemTitle = await item.$(ARTICLE_TITLE_SELECTOR);
      const itemImage = await item.$(ARTICLE_IMG_SELECTOR);
      const article = {
        title: await getProperty(itemTitle, "textContent"),
        href: await getProperty(itemTitle, "href"),
        img: itemImage ? await getProperty(itemImage, "src") : null,
      };
      const alreadyScrapedIdx = scrapedArticles.findIndex((a) => a.title === article.title);
      if (alreadyScrapedIdx != -1) {
        if (article.img !== null) {
          scrapedArticles[alreadyScrapedIdx].img = article.img;
        }
        continue;
      }
      scrapedArticles.push(article);
    }
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }

  console.log(" - Scraped", scrapedArticles.length, "articles");

  return scrapedArticles;
}
