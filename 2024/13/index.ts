import { readFile } from "../util";

import pt1 from "./pt1";
import pt2 from "./pt2";

export function run() {
  const input = readFile("13/input.txt")
    .trim()
    .split("\n\n")
    .map((line) => line.split("\n"))
    .map((game) => {
      const [a, b, p] = game;
      const btn_a = a
        .split(": ")[1]
        .split(", ")
        .map((v) => v.split("+")[1])
        .map(Number);

      const btn_b = b
        .split(": ")[1]
        .split(", ")
        .map((v) => v.split("+")[1])
        .map(Number);

      const prize = p
        .split(": ")[1]
        .split(", ")
        .map((v) => v.split("=")[1])
        .map(Number);

      return { a: btn_a, b: btn_b, prize };
    });

  return [pt1(input), pt2(input)];
}
