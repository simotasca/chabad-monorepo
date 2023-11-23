import type { Tables } from "@/db-types";

type WithSlug = Pick<Tables<"live_video">, "slug">;

export function liveUrl({ slug }: WithSlug) {
  return `/video-live/${slug}`;
}

/**
 * maps the new's **slug** to the corresponding **Astro url**
 */
export function livesMapper<T extends WithSlug>(l: T) {
  return { ...l, url: liveUrl(l) };
}
