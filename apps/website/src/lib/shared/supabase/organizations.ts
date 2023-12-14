import type { WithSlug } from "../routes";
import routes from "../routes";

/**
 * maps the new's **slug** to the corresponding **Astro url**
 */
export function organizationsMapper<T extends WithSlug>(o: T) {
  return { ...o, url: routes.organization(o) };
}
