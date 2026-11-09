import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Vero Residence: a one-page static site.
//   npm run dev     live preview while editing
//   npm run build   builds the finished site into site/ (plain files, no server needed)
export default defineConfig({
  base: "./", // relative asset URLs: works from any address or folder
  plugins: [react()],
  build: { outDir: "site", emptyOutDir: true }, // site/ is committed, so hosts can serve it without building
});
