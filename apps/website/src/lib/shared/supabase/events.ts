import type { Functions, Tables } from "@/db-types";
import type { WithSlug } from "../routes";
import routes from "../routes";
import type { Prettify } from "../types";

/**
 * maps the event's **slug** to the corresponding **Astro url**
 */
export function eventsMapper<T extends WithSlug>(a: T) {
  return { ...a, url: routes.event(a) };
}

export type EventWithOrganizations = {
  events_organizations: {
    organizations: Tables<"organizations"> | null;
  }[];
};

export type EventsMapperResult<T> = Prettify<
  Omit<T, "events_organizations"> & {
    organizations: Tables<"organizations">[];
  }
>;

export function eventsWithOrganizationsMapper<T extends EventWithOrganizations>(
  a: T
): EventsMapperResult<T> {
  const { events_organizations, ...withoutEO } = a;
  // @ts-ignore
  return {
    ...withoutEO,
    organizations: events_organizations
      .map((eo) => eo.organizations)
      .filter((o) => o != null),
  };
}

// type EventWithOrganizations = Tables<"events"> & { url: string } & {
//   organizations: Pick<Tables<"organizations">, "id" | "name">[];
// };

// type ArrayType<T> = T extends (infer U)[] ? U : T;

// export function eventsWithOrganizationsReducer(
//   prev: EventWithOrganizations[],
//   curr: ArrayType<Functions<"events_with_organizations">>
// ) {
//   let idx = prev.findIndex((p) => p.id === curr.e_id);
//   const organization = { id: curr.o_id, name: curr.o_name };
//   if (idx === -1) {
//     return [
//       ...prev,
//       {
//         id: curr.e_id,
//         created_at: curr.e_created_at,
//         main_image: curr.e_main_image,
//         markdown: curr.e_markdown,
//         name: curr.e_name,
//         slug: curr.e_slug,
//         url: eventsMapper({ slug: curr.e_slug }),
//         organizations: [organization],
//       },
//     ];
//   }
//   prev[idx].organizations.push(organization);
//   return prev;
// }
