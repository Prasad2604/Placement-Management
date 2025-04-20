// PICT brand colors and theme configuration
export const theme = {
  colors: {
    primary: {
      50: "#e6f0ff",
      100: "#b3d1ff",
      200: "#80b3ff",
      300: "#4d94ff",
      400: "#1a75ff",
      500: "#0052cc", // PICT Blue
      600: "#003d99",
      700: "#002966",
      800: "#001433",
      900: "#000000",
    },
    secondary: {
      50: "#f5f5f5",
      100: "#e8e8e8",
      200: "#d1d1d1",
      300: "#bababa",
      400: "#a3a3a3",
      500: "#8c8c8c",
      600: "#757575",
      700: "#5e5e5e",
      800: "#474747",
      900: "#303030",
    },
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },
  typography: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      heading: ["Poppins", "sans-serif"],
    },
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
  },
  spacing: {
    container: {
      padding: "2rem",
      maxWidth: "1280px",
    },
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
  },
};

// Reusable component styles
export const componentStyles = {
  button: {
    base: "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
    primary:
      "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500",
    secondary:
      "bg-secondary-100 text-secondary-900 hover:bg-secondary-200 focus:ring-secondary-500",
    sizes: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    },
  },
  card: {
    base: "bg-white rounded-lg shadow-md overflow-hidden",
    hover: "transition-transform duration-300 hover:transform hover:scale-105",
  },
  input: {
    base: "block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500",
    sizes: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    },
  },
  container: {
    base: "mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl",
  },
};
