/** @type {import('tailwindcss').Config} */
const {nextui, image} = require("@nextui-org/react");

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'regal-green': '#00A264',
    },
  },
  
  plugins: [
    nextui({
      themes: {
        "blue-dark": {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#121212", // Dark blue background color
            foreground: "#ffffff", // Light text color
            primary: {
              50: "#001F3F",
              100: "#003366",
              200: "#00509E",
              300: "#0073E6",
              400: "#0088FF",
              500: "#0099FF",
              600: "#33A1FD",
              700: "#66ACFF",
              800: "#99BAFF",
              900: "#CCE2FF",
              DEFAULT: "#0099FF", // Default primary color
              foreground: "#ffffff",
            },
            focus: "#33A1FD", // Focus color
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
}

