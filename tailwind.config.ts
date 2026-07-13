import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0A0A0F",
          secondary: "#111118",
          card: "#16161F",
        },
        accent: {
          purple: "#7C3AED",
          cyan: "#06B6D4",
          "purple-light": "#A78BFA",
          "cyan-light": "#67E8F9",
        },
        text: {
          primary: "#F8FAFC",
          secondary: "#94A3B8",
          muted: "#475569",
        },
        border: {
          DEFAULT: "#1E2030",
          accent: "#2D2F50",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Fira Code'", "monospace"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
        blink: "blink 1s step-end infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern":
          "linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "50px 50px",
      },
    },
  },
  plugins: [],
};

export default config;
