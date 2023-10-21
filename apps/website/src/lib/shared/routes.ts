const routes = {
  home: "/",
  articles: "/articles",
  article: (slug: string) => `/articles/${slug}`,
  news: "/news",
  organizations: "/organizations",
  events: "/events",
  lessons: "/lessons",
  live: "/live",
  chabad: "/chabad",
  resources: "resources",
  contribute: "/contribute",
  contacts: "/contacts",
} as const;

export default routes;
