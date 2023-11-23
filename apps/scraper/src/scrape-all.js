import supabase from "./supabase.js";
import { scrape as scrapeChabad } from "./strategies/chabad.js";

export function scrapeAll(callback) {
  scrapeChabad().then((newArticles) => {
    supabase
      .from("scraped")
      .select()
      .eq("source", "it-chabad")
      .in(
        "url",
        newArticles.map(({ href }) => href)
      )
      .then(({ data: pastScrapees, error }) => {
        if (error) {
          throw new Error(error);
        }
        const insert = [];
        for (const newArticle of newArticles) {
          if (pastScrapees.find((ps) => ps.url == newArticle.href)) {
            console.log("Skip insert already scraped:", newArticle.title);
          } else {
            insert.push({
              title: newArticle.title,
              url: newArticle.href,
              image: newArticle.img,
              source: "it-chabad",
            });
          }
        }

        if (insert.length == 0) {
          console.log("No new article found");
          callback && callback(false);
          return;
        }

        console.log("INSERTING", JSON.stringify(insert, null, 2));

        supabase
          .from("scraped")
          .insert(insert, { defaultToNull: true })
          .then(({ error }) => {
            if (error) {
              throw new Error(
                "error inserting scraped articles " + error.message
              );
            }
            console.log(
              insert.length,
              "articles for it.chabad.org successfully persisted"
            );
            callback && callback(true);
          });
      });
  });
}
