import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs/promises";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "~", replacement: "/src"
      }
    ]
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad(
              { filter: /src\\.*\.js$/ },
              async (args) => ({
                loader: "jsx",
                contents: await fs.readFile(args.path, "utf8")
              })
            );
          }
        }
      ]
    }
  },
  plugins: [react()]
});