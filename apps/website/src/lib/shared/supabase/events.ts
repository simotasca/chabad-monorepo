import type { Database, Functions, Tables } from "@/db-types";
import type { WithSlug } from "../routes";
import routes from "../routes";
import type { Prettify } from "../types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { throwError } from "../error";
import { dateFormatter } from ".";

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

export async function latestEvents(
  supabase: SupabaseClient<Database>,
  filters?: { limit?: number; dateFrom?: Date }
) {
  const query = supabase
    .from("events")
    .select("*, events_organizations(*, organizations(*))")
    .order("date", { ascending: true });

  if (filters?.limit) query.limit(filters?.limit);
  if (filters?.dateFrom) query.gte("date", dateFormatter.format(filters?.dateFrom));

  return query.then(({ error, data }) => {
    if (error) {
      throwError("Latest Events function", "Error fetching events:" + error.message);
    }
    return data?.map(eventsWithOrganizationsMapper).map(eventsMapper) || [];
  });
}

export async function nextEvents(supabase: SupabaseClient, limit?: number) {
  const dateFrom = new Date();
  dateFrom.setHours(0);
  dateFrom.setMinutes(0);
  return latestEvents(supabase, { limit, dateFrom })
}
