import { config } from "./config";

export type HrefSpec = { href?: string; lang?: string };

/**
 * Se c'è solo href senza lingua gli aggiunge la lingua corrente
 * Se la lingua è nell'href lascio quella (a meno che non sia specificato anche il campo lingua)
 * se c'è solo lingua senza href ritorna la location corrente con lingua specificata
 * se ci sono entrambi li combina
 */
export function translateRoute({ href, lang }: HrefSpec, currentUrl: URL): string {
  if (href && (href.startsWith("#") || !href.startsWith("/"))) {
    return href;
  }

  let hrefOk: string = href || currentUrl.pathname;
  let langOk: string | undefined = undefined;
  let chunks = hrefOk.split("/");
  let isLangInHref = config.lang.locales.includes(chunks[1]);

  if (lang) {
    langOk = lang;
  } else {
    let langChunk = chunks[1];
    langOk = isLangInHref ? langChunk : currLang(currentUrl);
  }

  if (langOk == config.lang.canonical) {
    langOk = undefined;
  }

  if (isLangInHref) {
    if (lang)
      return langHref({ lang: langOk, href: chunks.slice(2).join("/") });
    else {
      return langHref({ href: hrefOk });
    }
  } else {
    return langHref({ href: hrefOk, lang: langOk });
  }
}

function langHref({ href, lang }: { href?: string; lang?: string }) {
  let hrefOk = href || "";
  let langOk = lang ? "/" + lang : "";
  // trim left href
  while (hrefOk.startsWith("/")) hrefOk = hrefOk.slice(1);
  return `${langOk}/${hrefOk}`;
}

export function currLang(currentUrl: URL) {
  let chunks = currentUrl.pathname.split("/");
  if (isLang(chunks[1])) return chunks[1];
  else return config.lang.canonical;
}

function isLang(lan: string) {
  return config.lang.locales.includes(lan);
}