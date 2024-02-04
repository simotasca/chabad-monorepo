const userConfig = {
  canonical: "it",
  languages: ["it", "en"],
  "full-names": ["Italiano", "English"],
};

function parseConfig(userConfig: any): {
  lang: {
    canonical: string;
    locales: string[];
    fullNames: Map<string, string>;
  };
} {
  const fullNames = userConfig["full-names"] || userConfig.languages;
  return {
    lang: {
      canonical: userConfig.canonical,
      locales: userConfig.languages,
      fullNames: new Map(fullNames.map((f, i) => [userConfig.languages[i], f])),
    },
  };
}

export const config = parseConfig(userConfig);
