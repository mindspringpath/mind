import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // ------------------------------------
      // BRAND COLOR SYSTEM (PROFESSIONAL)
      // ------------------------------------
      colors: {
        // shadcn core variables (keep)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // PRIMARY BRAND — Deep Crimson
        primary: {
          DEFAULT: "#7A0000", // main brand red
          hover: "#8B0000",   // brighter hover
          active: "#5C0000",  // darker active
          foreground: "#FFFFFF",
        },

        // SECONDARY — Charcoal
        secondary: {
          DEFAULT: "#1A1A1A",
          foreground: "#FFFFFF",
        },

        // MUTED — Professional Gray
        muted: {
          DEFAULT: "#B3B3B3",
          foreground: "#FFFFFF",
        },

        // ACCENT — Slate / Graphite
        accent: {
          DEFAULT: "#2A2A2A",
          foreground: "#FFFFFF",
        },

        // DESTRUCTIVE — Material Danger Red
        destructive: {
          DEFAULT: "#B00020",
          foreground: "#FFFFFF",
        },

        // CARD — Dark Surfaces
        card: {
          DEFAULT: "#1A1A1A",
          foreground: "#FFFFFF",
        },

        // EXTRA NEUTRALS
        charcoal: "#111111",
        slate: "#1A1A1A",
        graphite: "#2A2A2A",
        softwhite: "#E5E5E5",
      },

      // ------------------------------------
      // RADII
      // ------------------------------------
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // ------------------------------------
      // ANIMATIONS
      // ------------------------------------
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },

      // ------------------------------------
      // BACKGROUND IMAGES (SUBTLE, PROFESSIONAL)
      // ------------------------------------
      backgroundImage: {
        "gradient-mindspring":
          "linear-gradient(135deg, #7A0000 0%, #2A2A2A 50%, #1A1A1A 100%)",

        "gradient-hero":
          "linear-gradient(135deg, rgba(122,0,0,0.15) 0%, rgba(42,42,42,0.15) 50%, rgba(26,26,26,0.15) 100%)",

        "gradient-soft":
          "linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config