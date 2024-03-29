import supabase from "@/lib/server/supabase";
import { throwError } from "@/lib/shared/error";
import { articlesMapper } from "@/lib/shared/supabase/articles";
import {
  eventsMapper,
  eventsWithOrganizationsMapper,
} from "@/lib/shared/supabase/events";
import { organizationsMapper } from "@/lib/shared/supabase/organizations";
import { newsMapper } from "@/lib/shared/supabase/news";
import { shuffle } from "@/lib/shared/array";

const formatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

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
      return data ? data.map(organizationsMapper) : [];
    });
  const halforganizations = Math.round(organizations.length / 2);

  let date = new Date();
  date.setHours(0);
  date.setMinutes(0);

  return {
    events: await supabase
      .from("events")
      .select("*, events_organizations(*, organizations(*))")
      .order("date", { ascending: true })
      .gte("date", formatter.format(date))
      .limit(10)
      .then(({ error, data }) => {
        if (error) {
          throwError("PAGE Events", "Error fetching events:" + error.message);
        }
        return data?.map(eventsWithOrganizationsMapper).map(eventsMapper) || [];
      }),

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

    news: await supabase
      .from("news")
      .select("title, date, content, category, image, preview, slug")
      .order("date", { ascending: false })
      .then(({ data, error }) => {
        if (error)
          throwError("Page Index", "Error fetching articles:" + error.message);
        return data?.map(newsMapper) || [];
      }),

    // scraped: await supabase
    //   .from("scraped")
    //   .select("title, url, image, created_at, category")
    //   .order("created_at", {ascending: false})
    //   .limit(7)

    //   .then(({ data, error }) => {
    //     if (error)
    //       throwError(
    //         "Page Index",
    //         "Error fetching scraped articles:" + error.message
    //       );
    //     return (
    //       data?.map((s) => ({
    //         ...s,
    //         image: s.image || "/images/world-nes.jpg",
    //         date: s.created_at,

    //       })) || []
    //     );
    //   }),

    scraped: await supabase
      .rpc("recent_scraped", { num: 5 })
      .select()
      .then(({ data, error }) => {
        if (error)
          throwError("Page Index", "Error fetching articles:" + error.message);
        let result = shuffle(
          data?.map((s) => ({
            ...s,
            image: s.image || "/images/world-nes.jpg",
            date: s.created_at,
          })) || []
        );
        const withImageIdx = result.findIndex(s => s.image != null); 
        const withImage = result.splice(withImageIdx == -1 ? 0 : withImageIdx, 1)[0];
        result.unshift(withImage);
        return result;
      }),
  };
}
