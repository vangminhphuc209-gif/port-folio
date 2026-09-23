import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#0B0E14",
          subtle: "#0F131D",
          elevated: "#141926",
        },
        surface: {
          DEFAULT: "#161B26",
          hover: "#1D2332",
          card: "rgba(22, 27, 38, 0.75)",
        },
        panel: {
          DEFAULT: "#1B2130",
          border: "rgba(255, 255, 255, 0.1)",
        },
        ink: {
          DEFAULT: "#F8FAFC",
          muted: "#94A3B8",
          subtle: "#64748B",
        },
        accent: {
          cyan: "#38BDF8",
          emerald: "#34D399",
          violet: "#818CF8",
          amber: "#FBBF24",
        },
      },
      boxShadow: {
        soft: "0 18px 60px -15px rgba(0, 0, 0, 0.5)",
        glow: "0 0 35px -5px rgba(56, 189, 248, 0.2)",
        "glow-emerald": "0 0 35px -5px rgba(52, 211, 153, 0.2)",
        "glow-violet": "0 0 35px -5px rgba(129, 140, 248, 0.2)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
