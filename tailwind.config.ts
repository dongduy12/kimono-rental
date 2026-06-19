import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        sakura: {
          50: "#fdf6f9",
          100: "#f9e5ec",
          200: "#f4ccd8",
          400: "#ee9bb8",
          500: "#e47da3",
          700: "#c04b76"
        },
        mizu: {
          50: "#f3f7fb",
          100: "#e3eef6",
          200: "#c7ddef",
          500: "#6a9bc7",
          700: "#3c6b94"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        soft: "0 15px 60px rgba(39, 62, 84, 0.08)",
      },
    },
  },
} satisfies Config;
