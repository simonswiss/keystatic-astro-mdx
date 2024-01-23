import type { Config } from "tailwindcss"
import typogrpahyPlugin from "@tailwindcss/typography"

export default {
  content: ["./src/{pages,layouts,components}/**/*.{js,ts,jsx,tsx,astro}"],
  theme: {
    extend: {},
  },
  plugins: [typogrpahyPlugin],
} satisfies Config
