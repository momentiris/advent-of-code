import fs from "fs";

const input = fs.readFileSync("07/input.txt", "utf-8");
const example = `
.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

type Coord = { row: number; col: number };
type Path = Coord & { id: number };

function solve_1(input: string) {
  const grid = input
    .trim()
    .split("\n")
    .map((row) => row.split(""));

  const start_pos = { row: 0, col: grid[0].findIndex((cell) => cell === "S") };
  let path_id = 0;

  const height = grid.length;

  let paths: Path[] = [{ ...start_pos, id: path_id++ }];
  const visited = new Set<string>();

  let splits = 0;

  while (paths.length > 0) {
    const next_paths: Path[] = [];
    for (const path of paths) {
      const key = `${path.row},${path.col}`;

      if (visited.has(key)) {
        continue;
      }

      visited.add(key);
      const cell = grid[path.row][path.col];

      if (cell === "^") {
        splits++;

        const left = moveDownLeft(path);
        const right = moveDownRight(path);

        next_paths.push(
          { ...left, id: path_id++ },
          { ...right, id: path_id++ }
        );
      } else {
        const down = moveDown(path);
        if (down.row < height) {
          next_paths.push(down);
        }
      }
    }

    paths = next_paths;
  }

  return splits;
}

function countTimelines(
  row: number,
  col: number,
  grid: string[][],
  memo: Map<string, number>
): number {
  const height = grid.length;

  if (row === height) return 1;

  const key = `${row},${col}`;
  const value = memo.get(key);
  if (value) return value;

  if (grid[row][col] !== "^") {
    const result = countTimelines(row + 1, col, grid, memo);
    memo.set(key, result);
    return result;
  }

  const left = countTimelines(row + 1, col - 1, grid, memo);
  const right = countTimelines(row + 1, col + 1, grid, memo);

  const total = left + right;
  return total;
}

function solve_2(input: string) {
  const grid = input
    .trim()
    .split("\n")
    .map((row) => row.split(""));

  const start_pos = { row: 0, col: grid[0].findIndex((cell) => cell === "S") };

  return countTimelines(start_pos.row, start_pos.col, grid, new Map());
}

console.log(solve_1(example));
console.log(solve_2(example));

function moveDown(p: Path) {
  return { ...p, row: p.row + 1 };
}

function moveDownLeft(p: Path) {
  return {
    ...p,
    row: p.row + 1,
    col: p.col - 1,
  };
}

function moveDownRight(p: Path) {
  return {
    ...p,
    row: p.row + 1,
    col: p.col + 1,
  };
}
