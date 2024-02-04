const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        messiri: '"ElMessiri", sans-serif',
        montserrat: '"Montserrat", sans-serif',
        raleway: '"Raleway", sans-serif',
        display: '"DMSerifDisplay", serif',
        arimo: '"Arimo", sans-serif',
      },
      screens: {
        xs: "480px",
        xl: "1280px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ addComponents, addVariant, addBase, theme }) => {
      addBase({
        select: {
          fontSize: "unset",
        },
      });
      addComponents({
        ".stack": {
          display: "grid",
          "& > *": {
            gridColumn: "1 / -1",
            gridRow: "1 / -1",
          },
        },
        ".full-bleed": {
          width: "calc(100vw + 2px)",
          position: "relative",
          left: "50%",
          transform: "translateX(calc(-50vw - 1px))",
        },

        ".blue-line": {
          background: theme("colors.blue-500"),
          boxshadow: `0px 0px 10px ` + theme("colors.blue-500"),
        },
      });
      addVariant("children", "& > *");
    }),
  ],
};
