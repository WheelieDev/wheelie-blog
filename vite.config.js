import { defineConfig } from "vite";

// Multi-page static site. `base: "./"` emits relative asset URLs so the build
// works whether it's served from a domain root or a subpath (e.g. GitHub Pages).
export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        article: "article.html",
      },
    },
  },
});
