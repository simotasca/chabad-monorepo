export interface WithSlug {
  slug: string;
}

export interface WithUrl {
  url: string;
}

const routes = {
  home: "/",
  articles: "/articles",
  article: ({ slug }: WithSlug) => `/articles/${slug}`,
  news: "/news",
  worldnews: "/world-news",
  new: ({ slug }: WithSlug) => `/news/${slug}`,
  organizations: (qs?: OrganizationsQueryParams) =>
    "/organizations" + organizationsQueryString(qs),
  organization: ({ slug }: WithSlug) => `/organizations/${slug}`,
  events: "/events",
  event: ({ slug }: WithSlug) => `/events/${slug}`,

  live: "/live",
  chabad: "/chabad",
  resources: "/resources",
  contribute: "/contribute",
  contacts: "/contacts",
  about: "/about",
  terms: "/terms-and-conditions",
  privacy: "/privacy-policy"
} as const;

export default routes;

interface OrganizationsQueryParams {
  city?: string;
}

function organizationsQueryString(props?: OrganizationsQueryParams) {
  if (!props) return "";
  const stringParams: string[] = [];
  for (const key in props) {
    stringParams.push(key + "=" + props[key]);
  }
  return stringParams.length > 0 ? "?" + stringParams.join("&") : "";
}
