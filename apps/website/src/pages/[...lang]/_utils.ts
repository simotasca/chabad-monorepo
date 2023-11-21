import { articlesMapper } from "@/lib/shared/supabase/articles";
import { throwError } from "@/lib/shared/error";
import supabase from "@/lib/shared/supabase";
import { eventsMapper } from "@/lib/shared/supabase/events";

export async function getData() {
  const organizations = await supabase
    .from("organizations")
    .select("*, contacts(*)")
    .limit(20)
    .then(({ data, error }) => {
      if (error)
        throwError(
          "Page Index",
          "Error fetching organizations:" + error.message
        );
      return data || [];
    });
  const halforganizations = Math.round(organizations.length / 2);

  return {
    organizations1: organizations.slice(0, halforganizations),
    organizations2: organizations.slice(halforganizations),
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
            "Error fetching scraped articles:" + error.message
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
    events: await supabase
      .from("events")
      .select("name, date, main_image, slug")
      .limit(10)
      .then(({ data, error }) => {
        if (error)
          throwError("Page Index", "Error fetching events:" + error.message);
        return data || [];
      }),
  };
}
