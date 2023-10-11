import type { AstroGlobal } from "astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export type Astro = Readonly<
  AstroGlobal<
    Record<string, any>,
    AstroComponentFactory,
    Record<string, string | undefined>
  >
>;
