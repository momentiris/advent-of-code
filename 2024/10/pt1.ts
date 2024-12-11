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

  const result = starting_points
    .map((point) => findPaths(input, point))
    .map((set) => set.size)
    .reduce((a, b) => a + b, 0);

  return result;
}

function findPaths(map: Input, [x, y]: [number, number]) {
  const current = map[x]?.[y];
  if (current === undefined) {
    return new Set();
  }

  if (current === 9) {
    return new Set([`${x},${y}`]);
  }

  const adjacent = [
    [x - 1, y],
    [x, y + 1],
    [x + 1, y],
    [x, y - 1],
  ].filter(([x, y]) => map[x]?.[y] === current + 1) as [number, number][];

  let allReachable = new Set();
  for (const point of adjacent) {
    const reachableFromHere = findPaths(map, point);
    for (const nineCell of reachableFromHere) {
      allReachable.add(nineCell);
    }
  }

  return allReachable;
}
