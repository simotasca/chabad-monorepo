import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const { SUPABASE_HOST, SUPABASE_SERVICE_ROLE_KEY } = process.env;

if (!SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing required environment variable SUPABASE_SERVICE_ROLE_KEY");
}

if (!SUPABASE_HOST) {
  throw new Error("Missing required environment variable SUPABASE_HOST");
}

const supabase = createClient(SUPABASE_HOST, SUPABASE_SERVICE_ROLE_KEY);

export default supabase;

/**
 * @param { string } source
 * @param { string | undefined } websiteName
 */
export function persist(source, websiteName) {
  websiteName = websiteName || source;

  /** @param { {title:string; href:string; img:string;}[] } articles */
  return async function (articles) {
    console.log("Persisting articles from " + websiteName);

    let { data: alreadyScraped, error: selectOldError } = await supabase
      .from("scraped")
      .select()
      .eq("category", source)
      .in(
        "url",
        articles.map((a) => a.href)
      );

    if (selectOldError) {
      console.error(`ERROR fetching old scraped articles from ${websiteName}:`, selectOldError.message);
      return false;
    }

    if (!alreadyScraped) alreadyScraped = [];

    const onlyNew = articles
      .filter((a) => !alreadyScraped.find((old) => old.url === a.href))
      .map((a) => ({
        title: a.title,
        url: a.href,
        image: a.img,
        category: source,
      }));

    if (onlyNew.length == 0) {
      console.log(" - all articles were already persisted");
      return true;
    }

    const { error: insertError } = await supabase.from("scraped").insert(onlyNew, { defaultToNull: true });

    if (insertError) {
      console.error(`ERROR inserting scraped articles from ${websiteName}:` + insertError.message);
      return false;
    }

    console.log(` - successfully persisted ${onlyNew.length}`);

    return true;
  };
}
