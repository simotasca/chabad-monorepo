import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from 'astro/config';

export default defineConfig({
  server: {
    host: process.env.HOST || "0.0.0.0",
    port: Number(process.env.PORT) || 3000
  },
  site: "https://www.chabad.it",
  output: "server",
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [tailwind(), react()],
  vite: {
    build: {
      rollupOptions: {
        input: {
          // Add the path to your entry file here
          main: 'node_modules/@mdxeditor/editor',
        },
        // Add this option to transpile CommonJS modules
        external: ['library'],
      }
    }
  }
});