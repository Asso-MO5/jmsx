import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mo: {
          // Couleurs de base
          bg: "#F2F2F2",
          primary: "#4088cf",
          secondary: "#5bc0de",
          tertiary: "#70cbe6",
          text: "#000",
          accent: "#d9534f",
          valid: "#4CAF50",
          brain: "#d433a9",
          // Couleurs d'état
          "status-error": "#ad2626", // Rouge pour les erreurs
          "status-success": "#00FF00", // Vert pour le succès
          "status-info": "#17A2B8", // Bleu pour l'information
          "status-warning": "#FFC107", // Jaune pour les avertissements
        },

        msx: {
          black: "#000000",
          white: "#FFFFFF",
          mediumGreen: "#3eb849",
          lightGreen: "#74d07d",
          darkBlue: "#5955e0",
          lightBlue: "#8076f1",
          darkRed: "#b95e51",
          cyan: "#65dbef",
          mediumRed: "#db6559",
          lightRed: "#ff897d",
          darkYellow: "#ccc35e",
          lightYellow: "#ded087",
          darkGreen: "#3aa241",
          magenta: "#b766b5",
          gray: "#cccccc",
        }
      },
      fontFamily: {
        openSans: ["OpenSans-Regular", "sans-serif"],
        FjallaOne: ["FjallaOne", "serif"],
      },
    },
    },
  plugins: [],
};
export default config;
