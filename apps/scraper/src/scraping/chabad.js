import puppeteer from "puppeteer-extra";
import { launchBrowser, getProperty } from "../puppeteer.js";
import supabase, { persist } from "../supabase.js";

import dotenv from "dotenv";
dotenv.config();

// add stealth plugin and use defaults (all evasion techniques)
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

const CHABAD_HOMEPAGE_URL = "https://it.chabad.org/";

const MAIN_ARTICLES_SELECTOR = "#promo_scroller_container .item";
const REMAINING_ARTICLES_SELECTOR = ".home_remaining_promo_container .item";

export async function scrape() {
  const scrapedArticles = [];

  const browser = await launchBrowser();

  try {
    console.log("Scraping it.chabad.org");

    const page = await browser.newPage();
    await page.goto(CHABAD_HOMEPAGE_URL, {
      waitUntil: "load",
    });

    console.log(" - Chabad homepage opened");

    await page.waitForSelector(MAIN_ARTICLES_SELECTOR);
    const mainItems = await page.$$(MAIN_ARTICLES_SELECTOR);

    console.log(" - Scraping main articles");
    scrapedArticles.push(...(await scrapeItems(mainItems, true)));

    // so called remaining articles
    await page.waitForSelector(REMAINING_ARTICLES_SELECTOR);
    const remainingItems = await page.$$(REMAINING_ARTICLES_SELECTOR);

    console.log(" - Scraping remaining articles");
    scrapedArticles.push(...(await scrapeItems(remainingItems)));
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }

  console.log(" - Scraped", scrapedArticles.length, "articles");

  return scrapedArticles;
}

async function scrapeItems(items, main = false) {
  const scrapedArticles = [];
  for (const item of items) {
    const itemTitle = await item.$(".title a");
    const itemImage = await item.$("img");
    scrapedArticles.push({
      title: await getProperty(itemTitle, "textContent"),
      href: await getProperty(itemTitle, "href"),
      img: itemImage ? await getProperty(itemImage, "src") : null,
      main,
    });
  }
  return scrapedArticles;
}
