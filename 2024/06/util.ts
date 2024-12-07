import { match } from "ts-pattern";

export type Direction = "U" | "D" | "L" | "R";

export function getNext(x: number, y: number, dir: Direction) {
  return match(dir)
    .returnType<[x: number, y: number]>()
    .with("U", () => [x - 1, y])
    .with("R", () => [x, y + 1])
    .with("D", () => [x + 1, y])
    .otherwise(() => [x, y - 1]);
}

export function generatePermutations(map: Array<Array<string>>) {
  const perms: Array<Array<Array<string>>> = [];

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === ".") {
        const new_map = map.map((row) => row.slice());
        new_map[i][j] = "#";

        perms.push(new_map);
      }
    }
  }

  return perms;
}
