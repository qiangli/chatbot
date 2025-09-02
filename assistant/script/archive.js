import fs from "fs";
import archiver from "archiver";

if (!process.env.BASE_DIR) {
  throw new Error("BASE_DIR environment variable is not set");
}
const assetDir = process.env.BASE_DIR;

const output = fs.createWriteStream(assetDir + "/web/release/chatbot.zip");
const archive = archiver("zip", { zlib: { level: 9 } });
output.on("close", () => console.log(archive.pointer() + " total bytes"));
archive.pipe(output);

archive.directory(assetDir + "/web/dist/chatbot/", false);
archive.finalize();
