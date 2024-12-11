type Input = Array<Array<number>>;

export default function main(input: Input) {
  const starting_points: Array<[number, number]> = [];

  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[x].length; y++) {
      if (input[x][y] === 0) {
        starting_points.push([x, y]);
      }
    }
  }

  const result = starting_points.map((point) => findPaths(input, point));
  return result.reduce((a, b) => a + b, 0);
}

function findPaths(map: Input, [x, y]: [x: number, y: number]): number {
  const current = map[x]?.[y];
  if (current === undefined) {
    return 0;
  }

  if (current === 9) {
    return 1;
  }

  const adjacent = [
    [x - 1, y],
    [x, y + 1],
    [x + 1, y],
    [x, y - 1],
  ].filter(([x, y]) => map[x]?.[y] === current + 1) as Array<[number, number]>;

  // Sum up paths from adjacent cells
  let totalPaths = 0;
  for (const coord of adjacent) {
    totalPaths += findPaths(map, coord);
  }

  return totalPaths;
}
