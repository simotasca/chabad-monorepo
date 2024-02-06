import * as runtime from "react/jsx-runtime"; // Production.
import { compile, run } from "@mdx-js/mdx";
import { visit } from "unist-util-visit";
import { bucketSrc } from "../shared/supabase/image";

export async function parseMdx(mdxContent?: string | null) {
  if (!mdxContent) return "div";

  const code = String(
    await compile(mdxContent, {
      outputFormat: "function-body",
      development: false,
      rehypePlugins: [
        () => {
          return (tree, file) => {
            visit(tree, "element", (node) => {
              if (node.tagName !== "img") return;
              if (node.properties?.src) {
                node.properties.src = bucketSrc(node.properties?.src);
              }
            });
          };
        },
      ],
      // ^-- Generate code for production.
      // `false` if you use `/jsx-runtime` on client, `true` if you use
      // `/jsx-dev-runtime`.
      /* …otherOptions */
    })
  );

  return (await run(code, runtime)).default || "div";
}
