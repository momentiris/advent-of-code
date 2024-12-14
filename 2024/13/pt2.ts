import { diophantine } from "./util";

type Input = {
  a: number[];
  b: number[];
  prize: number[];
}[];

export default function main(input: Input) {
  const incremented_input = input.map((game) => {
    game.prize[0] = game.prize[0] + 10000000000000;
    game.prize[1] = game.prize[1] + 10000000000000;
    return game;
  });

  const solutions = [];

  for (const game of incremented_input) {
    const { a, b, prize } = game;

    const solution = diophantine(a[0], b[0], prize[0], a[1], b[1], prize[1]);

    if (solution) {
      solutions.push(...solution);
    }
  }

  return solutions.reduce((acc, { a, b }) => acc + a * 3 + b * 1, 0);
}
