import { join } from "node:path";
import { readFileSync } from "node:fs";

const userConfig = JSON.parse(
  readFileSync(join(process.cwd(), "lang.config.json")).toString() || "{}"
);

function parseConfig(userConfig: any): {
  canonical: string;
  languages: string[];
  fullNames: Map<string, string>;
} {
  const canonical = userConfig.canonical || "en";
  const languages = userConfig.languages || ["en"];
  const fullNames = userConfig["full-names"] || userConfig.languages;
  return {
    canonical,
    languages,
    fullNames: new Map(fullNames.map((f, i) => [languages[i], f]))
  };
}

export const config = parseConfig(userConfig);
