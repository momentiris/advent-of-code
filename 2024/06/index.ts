import { readFile } from "../util";

import pt1 from "./pt1";
import pt2 from "./pt2";

export function run() {
  const input = readFile("06/example.txt")
    .split("\n")
    .map((line) => line.split(""));

  return [pt1(input.map((s) => s.slice())), pt2(input.map((s) => s.slice()))];
}
