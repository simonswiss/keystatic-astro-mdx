import { defineConfig } from "astro/config"

import react from "@astrojs/react"
import mdx from "@astrojs/mdx"
import keystatic from "@keystatic/astro"

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx(), keystatic()],
  output: "hybrid",
})
