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
        'theme': {
          'yellow': {
            '100': '#FFFBEA',
            '200': '#FFF3C4',
            '300': '#FCE588',
            '400': '#FADB5F',
            '500': '#F7C948',
            '600': '#F0B429',
            '700': '#DE911D',
            '800': '#CB6E17',
            '900': '#B44D12',
            '950': '#8D2B0B'
          },
          'gray': {
            '100': '#F7F7F7',
            '200': '#E1E1E1',
            '300': '#CFCFCF',
            '400': '#B1B1B1',
            '500': '#9E9E9E',
            '600': '#7E7E7E',
            '700': '#626262',
            '800': '#515151',
            '900': '#3B3B3B',
            '950': '#222222'
          },
          'red': {
            '100': '#FFE3E3',
            '200': '#FFBDBD',
            '300': '#FF9B9B',
            '400': '#F86A6A',
            '500': '#EF4E4E',
            '600': '#E12D39',
            '700': '#CF1124',
            '800': '#AB091E',
            '900': '#8A041A',
            '950': '#610316'
          },
          'teal': {
            '100': '#EFFCF6',
            '200': '#C6F7E2',
            '300': '#8EEDC7',
            '400': '#65D6AD',
            '500': '#3EBD93',
            '600': '#27AB83',
            '700': '#199473',
            '800': '#147D64',
            '900': '#0C6B58',
            '950': '#014D40'
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