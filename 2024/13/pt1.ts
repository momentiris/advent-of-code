import { diophantine } from "./util";

type Input = {
  a: number[];
  b: number[];
  prize: number[];
}[];

export default function main(input: Input) {
  const solutions = [];
  for (const game of input) {
    const { a, b, prize } = game;

    const solution = diophantine(a[0], b[0], prize[0], a[1], b[1], prize[1]);

    if (solution) {
      solutions.push(...solution);
    }
  }

  return solutions.reduce((acc, { a, b }) => acc + a * 3 + b * 1, 0);
}
