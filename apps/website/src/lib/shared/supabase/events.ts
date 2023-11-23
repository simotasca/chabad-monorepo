import type { Functions, Tables } from "@/db-types";
import type { WithSlug } from "../routes";
import routes from "../routes";

/**
 * maps the event's **slug** to the corresponding **Astro url**
 */
export function eventsMapper<T extends WithSlug>(a: T) {
  return { ...a, url: routes.event(a) };
}

type EventWithOrganizations = {
  events_organizations: {
    organizations: Tables<"organizations"> | null;
  }[];
};

export function eventsWithOrganizationsMapper<T extends EventWithOrganizations>(
  a: T
): Omit<T, "events_organizations"> & {
  organizations: Tables<"organizations">[];
} {
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
