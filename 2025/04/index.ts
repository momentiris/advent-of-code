import fs from "fs";

// const input = `..@@.@@@@.
// @@@.@.@.@@
// @@@@@.@.@@
// @.@@@@..@.
// @@.@@@@.@@
// .@@@@@@@.@
// .@.@.@.@@@
// @.@@@.@@@@
// .@@@@@@@@.
// @.@.@@@.@.`
const input = fs
  .readFileSync("04/input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((row) => row.split(""));

function get_neighbors(
  grid: string[][],
  x: number,
  y: number
): [number, number, string][] {
  const neighbors: [number, number, string][] = [
    [x - 1, y - 1, grid[x - 1]?.[y - 1]],
    [x - 1, y, grid[x - 1]?.[y]],
    [x - 1, y + 1, grid[x - 1]?.[y + 1]],
    [x, y - 1, grid[x]?.[y - 1]],
    [x, y + 1, grid[x]?.[y + 1]],
    [x + 1, y - 1, grid[x + 1]?.[y - 1]],
    [x + 1, y, grid[x + 1]?.[y]],
    [x + 1, y + 1, grid[x + 1]?.[y + 1]],
  ];

  return neighbors;
}

function solve_1(grid: string[][]) {
  const rolls = grid.flatMap((row, x) =>
    row
      .map((cell, y) => ({ cell, x, y }))
      .filter(({ cell }) => cell === "@")
      .map(({ x, y }) => [x, y])
  );

  return rolls.filter(
    ([x, y]) =>
      get_neighbors(grid, x, y).filter(([_, __, v]) => v === "@").length < 4
  ).length;
}

function collect(grid: string[][], collected: number) {
  const after_collection = grid.map((row) => [...row]);

  let num_collected = 0;

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] === "@") {
        const neighbors = get_neighbors(grid, x, y).filter(
          ([_, __, v]) => v === "@"
        ).length;

        if (neighbors < 4) {
          after_collection[x][y] = ".";
          num_collected = num_collected + 1;
        }
      }
    }
  }

  if (num_collected === 0) {
    return collected;
  }

  return collect(after_collection, collected + num_collected);
}

function solve_2(grid: string[][]) {
  return collect(grid, 0);
}

console.log(solve_1(input));
console.log(solve_2(input));
