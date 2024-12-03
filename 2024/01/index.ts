import { readFile } from "../util";

import pt1 from "./pt1";
import pt2 from "./pt2";

type Input = [Array<number>, Array<number>];

export function run() {
  const input = readFile("01/input.txt")
    .trim()
    .split("\n")
    .map((line) => line.trim().split(/\s+/).map(Number))
    .reduce<Input>(
      ([col1, col2], [num1, num2]) => [col1.concat(num1), col2.concat(num2)],
      [[], []]
    );

  return [pt1(input, 0), pt2(input, 0)];
}
