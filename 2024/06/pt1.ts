import { match } from "ts-pattern";
import { getNext } from "./util";

type Direction = "U" | "D" | "L" | "R";

export default function main(map: Array<Array<string>>) {
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

  return step(map, x, y, dir).reduce(
    (acc, row) => acc + row.filter((x) => x === "X").length,
    0
  );
}

function step(
  map: Array<Array<string>>,
  start_x: number,
  start_y: number,
  start_dir: Direction
): Array<Array<string>> {
  let x = start_x;
  let y = start_y;
  let dir = start_dir;

  while (true) {
    if (!map[x]?.[y]) break;

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

    map[x][y] = "X";
    x = next_x;
    y = next_y;
  }

  return map;
}
