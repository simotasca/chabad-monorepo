import type { Tables } from "@chabad/types/src/database";

type WithSlug = Pick<Tables<"organizations">, "slug">;

export function organizationsUrl({ slug }: WithSlug) {
  return `/organizations/${slug}`;
}

/**
 * maps the new's **slug** to the corresponding **Astro url**
 */
export function organizationsMapper<T extends WithSlug>(o: T) {
  return { ...o, url: organizationsUrl(o) };
}
