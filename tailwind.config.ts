import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "light-piece": "#ffffff",
        "dark-piece": "#000000",
        "light-square": "#e9f5db",
        "dark-square": "#718355",
      },
    },
  },
  safelist: [
    {
      pattern: /fill-(light|dark)-piece/,
    },
    {
      pattern: /bg-(light|dark)-square/,
    }
  ],
  plugins: [],
} satisfies Config;
