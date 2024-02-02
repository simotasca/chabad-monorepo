import * as runtime from "react/jsx-runtime"; // Production.
import { compile, run } from "@mdx-js/mdx";

export async function parseMdx(mdxContent?: string | null) {
  if (!mdxContent) return "div";

  const code = String(
    await compile(mdxContent, {
      outputFormat: "function-body",
      development: false,
      // ^-- Generate code for production.
      // `false` if you use `/jsx-runtime` on client, `true` if you use
      // `/jsx-dev-runtime`.
      /* …otherOptions */
    })
  );

  return (await run(code, runtime)).default || "div";  
}