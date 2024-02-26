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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        theme: {
          yellow: {
            '50': "hsl(var(--theme-yellow-50))",
            '100': "hsl(var(--theme-yellow-100))",
            '200': "hsl(var(--theme-yellow-200))",
            '300': "hsl(var(--theme-yellow-300))",
            '400': "hsl(var(--theme-yellow-400))",
            '500': "hsl(var(--theme-yellow-500))",
            '600': "hsl(var(--theme-yellow-600))",
            '700': "hsl(var(--theme-yellow-700))",
            '800': "hsl(var(--theme-yellow-800))",
            '900': "hsl(var(--theme-yellow-900))",
          },
          gray: {
            '50': "hsl(var(--theme-gray-50))",
            '100': "hsl(var(--theme-gray-100))",
            '200': "hsl(var(--theme-gray-200))",
            '300': "hsl(var(--theme-gray-300))",
            '400': "hsl(var(--theme-gray-400))",
            '500': "hsl(var(--theme-gray-500))",
            '600': "hsl(var(--theme-gray-600))",
            '700': "hsl(var(--theme-gray-700))",
            '800': "hsl(var(--theme-gray-800))",
            '900': "hsl(var(--theme-gray-900))",
          }
        },
        radix: {
          'yellow': {
            '2': "hsl(var(--radix-yellow-2))",
            '3': "hsl(var(--radix-yellow-3))",
            '4': "hsl(var(--radix-yellow-4))",
            '5': "hsl(var(--radix-yellow-5))",
            '6': "hsl(var(--radix-yellow-6))",
            '7': "hsl(var(--radix-yellow-7))",
            '8': "hsl(var(--radix-yellow-8))",
            '9': "hsl(var(--radix-yellow-9))",
            '10': "hsl(var(--radix-yellow-10))",
            '11': "hsl(var(--radix-yellow-11))",
            '12': "hsl(var(--radix-yellow-12))",
          },
          'yellow-dark': {
            '1': "hsl(var(--radix-yellow-dark-1))",
            '2': "hsl(var(--radix-yellow-dark-2))",
            '3': "hsl(var(--radix-yellow-dark-3))",
            '4': "hsl(var(--radix-yellow-dark-4))",
            '5': "hsl(var(--radix-yellow-dark-5))",
            '6': "hsl(var(--radix-yellow-dark-6))",
            '7': "hsl(var(--radix-yellow-dark-7))",
            '8': "hsl(var(--radix-yellow-dark-8))",
            '9': "hsl(var(--radix-yellow-dark-9))",
            '10': "hsl(var(--radix-yellow-dark-10))",
            '11': "hsl(var(--radix-yellow-dark-11))",
            '12': "hsl(var(--radix-yellow-dark-12))",
          },
          'sand': {
            '1': "hsl(var(--radix-sand-1))",
            '2': "hsl(var(--radix-sand-2))",
            '3': "hsl(var(--radix-sand-3))",
            '4': "hsl(var(--radix-sand-4))",
            '5': "hsl(var(--radix-sand-5))",
            '6': "hsl(var(--radix-sand-6))",
            '7': "hsl(var(--radix-sand-7))",
            '8': "hsl(var(--radix-sand-8))",
            '9': "hsl(var(--radix-sand-9))",
            '10': "hsl(var(--radix-sand-10))",
            '11': "hsl(var(--radix-sand-11))",
            '12': "hsl(var(--radix-sand-12))",
          },
          'sand-dark': {
            '1': "hsl(var(--radix-sand-dark-1))",
            '2': "hsl(var(--radix-sand-dark-2))",
            '3': "hsl(var(--radix-sand-dark-3))",
            '4': "hsl(var(--radix-sand-dark-4))",
            '5': "hsl(var(--radix-sand-dark-5))",
            '6': "hsl(var(--radix-sand-dark-6))",
            '7': "hsl(var(--radix-sand-dark-7))",
            '8': "hsl(var(--radix-sand-dark-8))",
            '9': "hsl(var(--radix-sand-dark-9))",
            '10': "hsl(var(--radix-sand-dark-10))",
            '11': "hsl(var(--radix-sand-dark-11))",
            '12': "hsl(var(--radix-sand-dark-12))",
          },
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