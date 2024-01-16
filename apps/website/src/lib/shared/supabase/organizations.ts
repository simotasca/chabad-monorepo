import type { Tables } from "@/db-types";
import type { WithSlug, WithUrl } from "../routes";
import routes from "../routes";
import { splitContacts } from "./contacts";

export type OrganizationWithContacts = Tables<"organizations"> & { contacts: Tables<"contacts">[] };
export type OrganizationWithSplitContacts = Tables<"organizations"> & ReturnType<typeof splitContacts>;

/**
 * Maps the organization's **slug** to the corresponding **Astro url**
 */
export function organizationsMapper<T extends WithSlug>(o: T): T & WithUrl {
  return { ...o, url: routes.organization(o) };
}

/**
 * Split the organizations contacts in: contacts, social and iban
 */
export function organizationContactsMapper<T extends OrganizationWithContacts>(o: T): T & OrganizationWithSplitContacts {
  const { contacts, ...organization } = o;
  return { ...organization, ...splitContacts(contacts) };
}
