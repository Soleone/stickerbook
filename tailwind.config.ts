import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        'theme-yellow-100': "var(--theme-yellow-100)",
        'theme-yellow-600': "var(--theme-yellow-600)",
        theme: {
          yellow: {
            '50': "var(--theme-yellow-50)",
            '100': "var(--theme-yellow-100)",
            '200': "var(--theme-yellow-200)",
            '300': "var(--theme-yellow-300)",
            '400': "var(--theme-yellow-400)",
            '500': "var(--theme-yellow-500)",
            '600': "var(--theme-yellow-600)",
            '700': "var(--theme-yellow-700)",
            '800': "var(--theme-yellow-800)",
            '900': "var(--theme-yellow-900)",
          },
          gray: {
            '50': "var(--theme-gray-50)",
            '100': "var(--theme-gray-100)",
            '200': "var(--theme-gray-200)",
            '300': "var(--theme-gray-300)",
            '400': "var(--theme-gray-400)",
            '500': "var(--theme-gray-500)",
            '600': "var(--theme-gray-600)",
            '700': "var(--theme-gray-700)",
            '800': "var(--theme-gray-800)",
            '900': "var(--theme-gray-900)",
          }
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config