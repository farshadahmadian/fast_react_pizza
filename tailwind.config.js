/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // anything in "theme", overwrites the default tailwind values for that property. for example, tailwind default values for fontFamily will be overwritten:
    fontFamily: {
      sans: "Roboto Mono, monospace",
      serif: [
        "ui-serif",
        "Georgia",
        "Cambria",
        "Times New Roman",
        "Times",
        "serif",
      ],
    },

    extend: {
      // any property in extend, extends the tailwind default values of that property
      colors: {
        test: "#ff3456",
      },
      fontSize: {
        test: ["10rem"],
      },
      height: {
        dynamicScreen: "100dvh",
      },
    },
  },
  plugins: [],
};
