import cron from "node-cron";
import dotenv from "dotenv";
import { scrapeAll } from "./scrape-all.js";
dotenv.config();

const { CRON_EXPRESSION } = process.env;

export function schedule() {
  if (!!CRON_EXPRESSION) {
    if (!cron.validate(CRON_EXPRESSION)) {
      console.log(
        `Invalid chron expression "${CRON_EXPRESSION}": running without scheduler.`
      );
    } else {
      console.log(`Scheduler active "${CRON_EXPRESSION}"`);
      cron.schedule(
        CRON_EXPRESSION,
        () => {
          try {
            scrapeAll();
          } catch (e) {
            console.error("Error during scheduled scraping task: ", e.message);
          }
        },
        {
          timezone: "Europe/Rome",
        }
      );
    }
  } else {
    console.log("No chron expression provided: running without scheduler.");
  }
}
