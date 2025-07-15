import type { NextConfig } from "next";

let outDir;
const target = process.env.NEXT_TARGET;
switch (target) {
  case "web":
    outDir = "dist/";
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
  default:
    outDir = "dist/";
  // throw new Error(`invalid target: ${target}`);
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
