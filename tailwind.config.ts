import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        poiretOne: ["var(--font-poiretOne)"],
      },
      colors: {
        background: "#EBEBEB",
        primary: "#10B981",
        ...defaultTheme.colors
      },
      screens: {
        'xsm': '475px',
        ...defaultTheme.screens,
      }
      
    },
  },
  plugins: [],
};
export default config;
