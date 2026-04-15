import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
        sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        charcoal: {
          "50": "#f4f5f6",
          "100": "#e4e6e9",
          "200": "#c9ced4",
          "300": "#a4adb8",
          "400": "#7a8696",
          "500": "#5c6674",
          "600": "#4a525e",
          "700": "#3e454f",
          "800": "#2a2f38",
          "900": "#161a20",
          "950": "#0e1015",
        },
        navy: {
          "50": "#eef6ff",
          "100": "#d9e9ff",
          "200": "#bcd8ff",
          "300": "#8eb9ff",
          "400": "#5d91f8",
          "500": "#3a6ee6",
          "600": "#2454d3",
          "700": "#1f44ab",
          "800": "#1a3777",
          "900": "#152a55",
          "950": "#0c1629",
        },
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          muted: "rgb(var(--surface-muted) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
