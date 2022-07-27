/** @type {import('tailwindcss').Config} */

// https://unpkg.com/browse/tailwindcss@3.1.6/stubs/defaultConfig.stub.js
//
// defaultTheme @'tailwindcss/defaultTheme'
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/hooks/use-body-overflow.js",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4682b3"
      },
      // https://tailwindcss.com/docs/screens
      screens: {
        // overide small screen 1st; sort..
        //   https://tailwindcss.com/docs/screens
        // 'sm': '640px',
        // => @media (min-width: 640px) { ... }

        // 'md': '768px',
        // => @media (min-width: 768px) { ... }

        lg: "968px",
        // 'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        // 'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        // '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
        //
        // custom mQuery
        // https://tailwindcss.com/docs/screens#custom-media-queries
        tall: { raw: "(min-height: 792px)" },
        // => @media (min-height: 800px) { ... }
      },
    },
  },
  // https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
  darkMode: "class",
  //
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};
