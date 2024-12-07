import { match } from "ts-pattern";

import { Direction, generatePermutations, getNext } from "./util";

export default function main(map: Array<Array<string>>) {
  const perms = generatePermutations(map);
  return perms.filter((perm) => solve(perm)).length;
}

export function solve(map: Array<Array<string>>) {
  const [x, y] = map.reduce<[number, number]>(
    (acc, row, x) => {
      const y = row.findIndex((cell) => ["^", "v", "<", ">"].includes(cell));
      if (y > -1) {
        return [x, y];
      }
      return acc;
    },
    [0, 0]
  );

  const dir = match(map[x][y])
    .returnType<Direction>()
    .with(">", () => "R")
    .with("<", () => "L")
    .with("^", () => "U")
    .otherwise(() => "D");

  return step(map, x, y, dir);
}

function step(
  map: Array<Array<string>>,
  start_x: number,
  start_y: number,
  start_dir: Direction
): Array<Array<string>> | undefined {
  let x = start_x;
  let y = start_y;
  let dir = start_dir;

  const steps = new Map<string, boolean>();
  let duplicate = false;
  while (!duplicate) {
    if (!map[x]?.[y]) break;
    if (steps.has(`${x},${y},${dir}`)) {
      duplicate = true;
      break;
    }
    const [next_x, next_y] = getNext(x, y, dir);

    if (map[next_x]?.[next_y] === "#") {
      dir = match(dir)
        .returnType<Direction>()
        .with("U", () => "R")
        .with("R", () => "D")
        .with("D", () => "L")
        .otherwise(() => "U");

      continue;
    }

    steps.set(`${x},${y},${dir}`, true);
    x = next_x;
    y = next_y;
  }

  return duplicate ? map : undefined;
}
