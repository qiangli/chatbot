import type { NextConfig } from "next";

let outDir: string;
const target = process.env.CHATBOT_TARGET;

switch (target) {
  case "web":
    outDir = "../../web/dist/chatbot/";
    break;
  case "vscode-sidebar":
    outDir = "../extension/vscode/sidebar/dist/";
    break;
  case "chrome-toolbar":
    outDir = "../extension/chrome/toolbar/dist";
    break;
  case "chrome-sidepanel":
    outDir = "../extension/chrome/sidepanel/dist";
    break;
  case "electron-tray":
    outDir = "../electron/hub/dist";
    break;
  default:
    // throw new Error(`invalid target: ${target}`);
    outDir = "dist/";
}

console.log("outDir", outDir);

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.PAGES_BASE_PATH,
  reactStrictMode: true,
  distDir: outDir,
};

export const dynamic = "force-static";
export default nextConfig;
