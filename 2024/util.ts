import fs from "fs";
export function readFile(path: string) {
  return fs.readFileSync(path, "utf-8");
}
