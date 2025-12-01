import fs from "fs";
import { match } from "ts-pattern";

const input = fs
  .readFileSync("01/input.txt", "utf-8")
  .split("\n")
  .map((line) => {
    const [dir, num] = line.match(/([LR])(\d+)/)!.slice(1);
    return { direction: dir, steps: Number(num) } as State;
  });

type Direction = "L" | "R";
type State = { direction: Direction; steps: number };

function tick(state: number, direction: Direction) {
  return match(direction)
    .with("L", () => (state - 1 < 0 ? 100 - Math.abs(state - 1) : state - 1))
    .with("R", () => (state + 1 > 99 ? state + 1 - 100 : state + 1))
    .exhaustive();
}

function turn(state: number, instruction: State) {
  let result = state;
  let zeros = 0;
  for (let i = 0; i < instruction.steps; i++) {
    result = tick(result, instruction.direction);
    if (result === 0) {
      zeros += 1;
    }
  }

  return { result, zeros };
}

const part_1 = input.reduce<{ result: number; zeros: number }>(
  (acc, instruction) => {
    const { result } = turn(acc.result, instruction);
    return { result, zeros: result === 0 ? acc.zeros + 1 : acc.zeros };
  },
  { result: 50, zeros: 0 }
);

const part_2 = input.reduce<{ result: number; zeros: number }>(
  (acc, instruction) => {
    const { result, zeros } = turn(acc.result, instruction);
    return { result, zeros: acc.zeros + zeros };
  },
  { result: 50, zeros: 0 }
);

console.log(part_1.zeros);
console.log(part_2.zeros);
