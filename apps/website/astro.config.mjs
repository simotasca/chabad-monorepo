import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  server: {
    host: process.env.HOST || "0.0.0.0",
    port: Number(process.env.PORT) || 3000,
  },
  site: "https://www.chabad.it",
  output: "server",
  adapter: node({
    mode: "middleware",
  }),
  integrations: [
    tailwind(),
    react(),
    {
      name: "reload-lang-config",
      hooks: {
        "astro:config:setup": ({addWatchFile}) =>{
          addWatchFile("./lang.config.json")
        }
      }
    }
    // {
    //   name: "demo-intl-production",
    //   hooks: {
    //     "astro:config:setup": ({ injectRoute }) => {
    //       injectRoute({
    //         entryPoint: "src/pages/[...lang]/index.astro",
    //         prerender: false,
    //         pattern: "/hr/",
    //       });
    //     },
    //   },
    // },
  ],
});
