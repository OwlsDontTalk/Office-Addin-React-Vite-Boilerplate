import { defineConfig, ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const developmentURL = "https://localhost:3000";
const productionURL = "https://www.contoso.com"; // CHANGE THIS TO YOUR PRODUCTION DEPLOYMENT LOCATION

const devCerts = require("office-addin-dev-certs");

async function getViteConfig({ mode } : ConfigEnv) {
  const dev = mode === "development";

  const httpsOptions = dev ? await devCerts.getHttpsServerOptions() : false;

  return defineConfig({
    base: "",
    assetsInclude: ["src/assets/*"],
    plugins: [
      react(),
      {
        name: "generate-manifest",
        writeBundle() {
          const dirPath = "dist/";
          const manifest = fs.readFileSync("manifest.xml", "utf-8");
          const updatedManifest = dev ? manifest : manifest.replace(new RegExp(developmentURL, "g"), productionURL);
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
          }
          fs.writeFileSync(dirPath + "manifest.xml", updatedManifest);
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".ts", ".tsx", ".js", ".json", ".html"],
    },
    root: "src",
    build: {
      outDir: "../dist",
      rollupOptions: {
        input: {
          taskpane: "src/taskpane/taskpane.html",
        },
        output: {
          entryFileNames: "taskpane/[name].js",
          assetFileNames: "taskpane/[name].[ext]",
          chunkFileNames: "taskpane/[name].[ext]",
        },
      },
      sourcemap: true,
    },
    server: {
      https: httpsOptions,
      port: 3000,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
    define: {
      "process.env": {
        ...process.env,
      },
    },
  });
}

export default getViteConfig;
