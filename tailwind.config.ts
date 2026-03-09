import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#faf6ee",
        ink: "#172033",
        gold: "#b5852b"
      },
      boxShadow: {
        soft: "0 12px 30px rgba(23, 32, 51, 0.08)"
      }
    }
  },
  plugins: []
} satisfies Config;
