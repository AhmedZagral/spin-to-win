/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
      colors: {
        roseGold: "#b76e79",
        lightRose: "#d4a5a5",
        cream1: "#f8f3f0",
        cream2: "#ede4df",
        textDark: "#4a4a4a",
        textMid: "#6b6b6b",
        borderRose: "#f0d9dd",
        gray999: "#999999",
        successGreen: "#2e7d32",
        successLight: "#e8f5e9",
        fairLight: "#fff5f5",
        alertRed: "#ff4757",
      },
      boxShadow: {
        roseCard: "0 20px 60px rgba(0,0,0,0.1)",
        roseGlow: "0 10px 30px rgba(183,110,121,0.3)",
        roseGlowLg: "0 15px 40px rgba(183,110,121,0.4)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        pulseDot: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.3)", opacity: "0.7" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.8s ease-in both",
        twinkle: "twinkle 2s infinite",
        pulseDot: "pulseDot 2s infinite",
      },
      letterSpacing: {
        wide1: "1px",
        wide2: "2px",
        wide3: "3px",
      },
      borderRadius: {
        12: "12px",
        16: "16px",
        24: "24px",
        50: "50px",
      },
    },
  },
  plugins: [],
};
