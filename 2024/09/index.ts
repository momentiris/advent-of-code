import { readFile } from "../util";

import pt1 from "./pt1";
import pt2 from "./pt2";

export function run() {
  const input = readFile("09/input.txt").trim().split("").map(Number);

  return [pt2(input)];
}