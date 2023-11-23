import { cwd } from "node:process";
import type { Astro } from "../astro";
import { config } from "./config";

export function checkLangParam(Astro: {
  params: Record<string, string | undefined>;
}) {
  const { lang } = Astro.params;
  return config.languages
    .map((l) => (l === config.canonical ? undefined : l))
    .includes(lang);
}

const translationCache = new Map<string, Map<string, Object>>();

export async function getTranslations(id: string, lang: string | URL) {
  let translations: Map<string, Object>;

  // if (translationCache.has(id)) {
  //   translations = translationCache.get(id)!;
  // } else {
    translations = await loadTranslationsFromFiles(id);
    // translationCache.set(id, translations);
  // } 

  const translationLang = typeof lang === "string" ? lang : getUrlLang(lang);

  return function t(key: string) {
    return (
      walk(translations.get(translationLang), key) ||
      walk(translations.get(config.canonical), key) ||
      ""
    );
  };
}

async function loadTranslationsFromFiles(id: string) {
  const translations = new Map<string, Object>();

  // trim
  while (id.startsWith("/")) id = id.slice(1);
  while (id.endsWith("/")) id = id.slice(0, -1);

  for (const lang of config.languages) {
    const langJson = (
      await import(
        `${cwd()}/src/lang/${id}/${lang}.json` /* @vite-ignore */
      ).catch((e) => {
        if (e.code != "ERR_LOAD_URL") {
          console.log(e.code);
          console.log("Error with translation file:", id);
          console.log(" -", e.message);
        } else if (lang == config.canonical) {
          console.log("Alert: Canonical translation for", id, "not found");
        }
        return { default: undefined };
      })
    ).default;
    langJson && translations.set(lang, langJson);
  }

  return translations;
}

function walk(obj: any, key: string) {
  if (!obj) return undefined;

  const keys = key.split(".");
  let level = { ...obj };

  for (const levelKey of keys) {
    if (!levelKey) continue;
    level = level[levelKey];
    if (!level) return null;
  }

  return level;
}

/**
 * ritorna il pathname generico e la lingua di un url
 */
export function getUrlInfo(url: URL): { lang: string; pathname: string } {
  const lang = getUrlLang(url);

  let pathname = url.pathname;
  if (lang !== config.canonical) {
    pathname = url.pathname.replace(`/${lang}`, "") || "/";
  }
  if (pathname != "/" && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  return { lang, pathname };
}

/**
 * ritorna la lingua di un url
 */
export function getUrlLang(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (config.languages.includes(lang)) {
    return lang;
  } else {
    return config.canonical;
  }
}
