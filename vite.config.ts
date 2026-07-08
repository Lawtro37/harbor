import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import pkg from "./package.json" with { type: "json" };

export default defineConfig(({ mode }) => {
  const isAndroid = mode === "android";

  return {
    plugins: [
      react(),
      tailwindcss(),

      // Custom plugin to rename index.android.html to index.html for Tauri
      {
        name: "android-html-rename",
        enforce: "post",
        generateBundle(_, bundle) {
          if (isAndroid && bundle["index.android.html"]) {
            // Rename the file key in Vite's internal bundle map
            bundle["index.html"] = bundle["index.android.html"];
            bundle["index.html"].fileName = "index.html";
            delete bundle["index.android.html"];
          }
        },
      },
    ],

    build: {
      rollupOptions: {
        input: isAndroid
          ? resolve(__dirname, "index.android.html")
          : resolve(__dirname, "index.html"),

        output: {
          entryFileNames: "assets/[name]-[hash].js",
        },
      },
    },

    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
    },

    resolve: {
      alias: {
        "@": isAndroid ? resolve(__dirname, "src-android") : resolve(__dirname, "src"),
      },
    },
  };
});