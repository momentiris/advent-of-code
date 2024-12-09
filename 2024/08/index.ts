import { readFile } from "../util";

import pt1 from "./pt1";
import pt2 from "./pt2";

export function run() {
  const input = readFile("08/input.txt")
    .trim()
    .split(/\n/)
    .map((v) => v.split(""));

  return [pt1(input), pt2(input)];
}
