import { executablePath } from "puppeteer";
import puppeteer from "puppeteer-extra";

// add stealth plugin and use defaults (all evasion techniques)
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

import dotenv from "dotenv";
dotenv.config();

export async function launchBrowser() {
  const dockerized = !!process.env.PUPPETEER_EXECUTABLE_PATH ? { 
    // executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    executablePath: executablePath(),
    headless: true
  } : {};
  return await puppeteer.launch({
    args: ["--disable-setuid-sandbox", "--no-sandbox", "--single-process", "--no-zygote"],
    headless: false,
    ...dockerized,
  });
}

export async function getProperty(el, prop) {
  return await (await el.getProperty(prop)).jsonValue();
}
