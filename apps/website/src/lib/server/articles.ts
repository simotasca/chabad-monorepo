interface WithSlug {
  slug: string;
}

export function articleUrl({ slug }: WithSlug) {
  return `/articles/${slug}`;
}

export function articleLinkTarget({ url }: { url: string }) {
  return url.startsWith("http") ? "_blank" : "_self";
}

/**
 * maps the article's **slug** to the corresponding **Astro url**
 */
export function articlesMapper<T extends WithSlug>(a: T) {
  return { ...a, url: articleUrl(a) };
}
