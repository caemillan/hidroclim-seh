import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/hidroclim-seh/",
  // base: "/usr/dgh/hidroclim-seh/",
  plugins: [react()],
});