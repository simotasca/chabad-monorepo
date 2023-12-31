import type { Tables } from "@/db-types";
import type { WithSlug } from "../routes";
import routes from "../routes";

export function articleLinkTarget({ url }: { url: string }) {
  return url.startsWith("http") ? "_blank" : "_self";
}

/**
 * maps the article's **slug** to the corresponding **Astro url**
 */
export function articlesMapper<T extends WithSlug>(a: T) {
  return { ...a, url: routes.article(a) };
}
