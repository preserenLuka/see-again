/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: "var(--bg-primary)",
          text: "var(--text-primary)",
        },
        secondary: {
          bg: "var(--bg-secondary)",
          text: "var(--text-secondary)",
        },
        border: "var(--border-color)",
      },
    },
  },
  plugins: [],
};
