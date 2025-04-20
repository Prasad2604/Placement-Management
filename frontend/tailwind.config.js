const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f7ff",
          100: "#e0f0ff",
          200: "#b9ddff",
          300: "#7cc3ff",
          400: "#36a5ff",
          500: "#0087ff",
          600: "#0066ff",
          700: "#0055d4",
          800: "#0044ab",
          900: "#003c8f",
          950: "#00254d",
        },
        secondary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        brand: {
          blue: "#003c8f",
          darkBlue: "#00254d",
          lightBlue: "#0087ff",
        },
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, var(--brand-blue) 0%, var(--brand-darkBlue) 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, var(--brand-lightBlue) 0%, var(--brand-blue) 100%)",
      },
      boxShadow: {
        "inner-light": "inset 0 2px 4px 0 rgba(255, 255, 255, 0.05)",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("flowbite/plugin"), addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
