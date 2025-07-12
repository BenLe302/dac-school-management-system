import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dacSky: "#C3EBFA",
        dacSkyLight: "#EDF9FD",
        dacPurple: "#CFCEFF",
        dacPurpleLight: "#F1F0FF",
        dacYellow: "#FAE27C",
        dacYellowLight: "#FEFCE8",
      },
    },
  },
  plugins: [],
};
export default config;