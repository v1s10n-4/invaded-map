/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/styles.ts",
  ],
  theme: {
    screens: {
      // Phones (portrait)
      initial: "0px",
      // Phones (landscape)
      xs: "520px",
      // Tablets (portrait)
      sm: "768px",
      // Tablets (landscape)
      md: "1024px",
      // Laptops
      lg: "1280px",
      // Desktops
      xl: "1640px",
      // Notched devices
      pwa: { raw: "(display-mode: standalone)" },
    },
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
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
