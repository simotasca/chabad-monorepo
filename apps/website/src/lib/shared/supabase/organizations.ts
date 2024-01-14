import type { Tables } from "@/db-types";
import type { WithSlug } from "../routes";
import routes from "../routes";
import { splitContacts } from "./contacts";

/**
 * maps the new's **slug** to the corresponding **Astro url**
 */
export function organizationsMapper<T extends WithSlug>(o: T) {
  return { ...o, url: routes.organization(o) };
}

export function organizationContactsMapper<T extends { contacts: Tables<"contacts">[] }>(o: T) {
  const { contacts, ...organization } = o;
  return { ...organization, ...splitContacts(contacts) };
}
