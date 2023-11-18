import type { Tables } from "@chabad/types/src/database";

type WithSlug = Pick<Tables<"news">, "slug">;

export function newsUrl({ slug }: WithSlug) {
  return `/news/${slug}`;
}

/**
 * maps the new's **slug** to the corresponding **Astro url**
 */
export function newsMapper<T extends WithSlug>(n: T) {
  return { ...n, url: newsUrl(n) };
}
