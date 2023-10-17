import { throwError } from "@/lib/shared/error";
import supabase from "@/lib/shared/supabase";
import { articleUrl, articlesMapper } from "@/lib/server/articles";

export async function getData() {
  return {
    articles: await supabase
      .from("articles")
      .select("title, date, content, category, image, preview, slug")
      .order("date", { ascending: false })
      .then(({ data, error }) => {
        if (error)
          throwError("Page Index", "Error fetching articles:" + error.message);
        return data?.map(articlesMapper) || [];
      }),
    scraped: await supabase
      .from("scraped")
      .select("title, url, image, created_at")
      .limit(7)
      .then(({ data, error }) => {
        if (error)
          throwError(
            "Page Index",
            "Error fetching scraped articles:" + error.message,
          );
        return (
          data?.map((s) => ({
            ...s,
            preview:
              "La preview dovrebbe essere opzionale perchè gli articoli esterni non ce l'hanno...",
            category: "chabad",
            image: s.image || "https://picsum.photos/1200/800?c=12",
            date: s.created_at,
          })) || []
        );
      }),
  };
}
