type Input = Array<Array<string>>;
type Coordinate = { x: number; y: number };

export default function main(input: Input) {
  const nodes = new Map<string, { coordinates: Array<Coordinate> }>();
  input.forEach((row, x) =>
    row.forEach((_, y) => {
      const node = input[x][y];
      if (node !== ".") {
        nodes.set(node, {
          coordinates: nodes.get(node)?.coordinates.concat({ x, y }) ?? [
            { x, y },
          ],
        });
      }
    })
  );

  const with_antinodes = Array.from(nodes.entries()).map(
    ([node, { coordinates }]) => ({
      node,
      coordinates,
      antinodes: getAntinodes(coordinates, input),
    })
  );

  const antinodes = Array.from(
    new Set(
      with_antinodes
        .flatMap(({ antinodes }) => antinodes)
        .map((v) => JSON.stringify(v))
    )
  ).map((x) => JSON.parse(x));

  return antinodes.length;
}

function getAntinodes(
  coordinates: Array<Coordinate>,
  map: Input
): Array<Coordinate> {
  const antinodes = [];
  for (const coord of coordinates) {
    const other = coordinates.filter(
      (c) => JSON.stringify(c) !== JSON.stringify(coord)
    );

    const an = other
      .map((c) => ({
        x: coord.x + 2 * (c.x - coord.x),
        y: coord.y + 2 * (c.y - coord.y),
      }))
      .filter(({ x, y }) => Boolean(map[x]?.[y]));

    antinodes.push(...an);
  }

  return antinodes;
}
