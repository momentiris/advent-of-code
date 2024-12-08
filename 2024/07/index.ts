import { readFile } from "../util";

import pt1 from "./pt1";
import pt2 from "./pt2";

export function run() {
  const input = readFile("07/example.txt")
    .trim()
    .split("\n")
    .map((line) => {
      const [a, b] = line.split(": ");
      return [Number(a), b.split(" ").map(Number)] as [number, number[]];
    });

  return [pt1(input), pt2(input)];
}
