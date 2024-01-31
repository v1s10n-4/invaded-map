/** @type {import('tailwindcss').Config} */
const { Colors } = require("./utils");
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/styles.ts",
  ],
  daisyui: {
    themes: [
      {
        dark: {
          "color-scheme": "dark",
          "primary": Colors.primary,
          "secondary": Colors.secondary,
          "accent": Colors.accent,
          "base-100": "#000000",
          "base-200": "#0D0D0D",
          "base-300": "#1A1919",
          "neutral": "#272626",
          "neutral-focus": "#343232",
          "info": "#0000ff",
          "success": "#008000",
          "warning": "#ffff00",
          "error": "#ff0000",
          "--rounded-box": "0",
          "--rounded-btn": "0",
          "--rounded-badge": "0",
          "--animation-btn": "0",
          "--animation-input": "0",
          "--btn-text-case": "lowercase",
          "--btn-focus-scale": "1",
          "--tab-radius": "0",
          ".scrollbar::-webkit-scrollbar": {
            width: 4,
            height: 4,
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      height: {
        screen: ["100vh", "100dvh"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    require("daisyui"),
    require("daisyui-tailwind-scrollbar"),
  ],
};
