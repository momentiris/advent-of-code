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

  antinodes.forEach((v) => {
    if (input[v.x][v.y] === ".") {
      input[v.x][v.y] = "#";
    }
  });

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
      .flatMap((c) => {
        const antinodes = [];
        const dx = c.x - coord.x;
        const dy = c.y - coord.y;

        let x = coord.x + dx;
        let y = coord.y + dy;
        while (map[x]?.[y]) {
          antinodes.push({ x, y });
          x += dx;
          y += dy;
        }

        x = coord.x - dx;
        y = coord.y - dy;
        while (map[x]?.[y]) {
          antinodes.push({ x, y });
          x -= dx;
          y -= dy;
        }

        return antinodes;
      })
      .filter(({ x, y }) => Boolean(map[x]?.[y]));

    antinodes.push(...an);
  }

  return antinodes;
}
