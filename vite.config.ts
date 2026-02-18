import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ["taqvimim.uz"],
    proxy: {
      '/api-namoz': {
        target: 'https://namoz-vaqti.uz',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-namoz/, ''),
      },
    },
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
