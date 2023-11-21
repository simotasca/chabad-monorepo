export interface WithSlug {
  slug: string;
}

const routes = {
  home: "/",
  articles: "/articles",
  article: ({ slug }: WithSlug) => `/articles/${slug}`,
  news: "/news",
  new: ({ slug }: WithSlug) => `/news/${slug}`,
  organizations: (qs?: OrganizationsQueryParams) =>
    "/organizations" + organizationsQueryString(qs),
  organization: ({ slug }: WithSlug) => `/organizations/${slug}`,
  events: "/events",
  event: ({ slug }: WithSlug) => `/events/${slug}`,
  lessons: "/lessons",
  live: "/live",
  chabad: "/chabad",
  resources: "resources",
  contribute: "/contribute",
  contacts: "/contacts",
} as const;

export default routes;

interface OrganizationsQueryParams {
  city?: string;
}

function organizationsQueryString(props?: OrganizationsQueryParams) {
  if (!props) return "";
  let stringParams: string[] = [];
  stringParams = Object.keys(props).reduce((p, k) => {
    return !props[k] ? p : [p, props[k]];
  }, stringParams);
  return stringParams ? "?" + stringParams.join("=") : "";
}
