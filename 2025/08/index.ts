import fs from "fs";

const file = fs.readFileSync("08/input.txt", "utf-8");
const example = `
162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;

const input = file
  .trim()
  .split("\n")
  .map((line) => line.split(",").map(Number) as Coord);

type Coord = [x: number, y: number, z: number];
type Pair = { a: Coord; b: Coord; dist: number };

const isInSameCircuit = (a: Coord, b: Coord, circuits: Coord[][]) => {
  return circuits.some(
    (circuit) =>
      circuit.some((coord) => coord.join(",") === a.join(",")) &&
      circuit.some((coord) => coord.join(",") === b.join(","))
  );
};

function sortByDistance(input: Coord[]): Pair[] {
  return input
    .flatMap((a, i) =>
      input.slice(i + 1).map((b) => ({
        a,
        b,
        dist: distance(a, b),
      }))
    )
    .sort((x, y) => x.dist - y.dist);
}

function solve_1(input: Coord[]) {
  let circuits: Coord[][] = input.map((coord) => [coord]);

  const pairs = sortByDistance(input);

  for (let i = 0; i < 1000; i++) {
    const closest_pair = pairs[i];

    if (isInSameCircuit(closest_pair.a, closest_pair.b, circuits)) {
      continue;
    }

    const circuit_contains_a = circuits.findIndex((circuit) =>
      circuit.some((coord) => {
        const coord_string = coord.join(",");
        const closest_pair_a_string = closest_pair.a.join(",");
        return coord_string === closest_pair_a_string;
      })
    );

    const circuit_contains_b = circuits.findIndex((circuit) =>
      circuit.some((coord) => {
        const coord_string = coord.join(",");
        const closest_pair_b_string = closest_pair.b.join(",");
        return coord_string === closest_pair_b_string;
      })
    );

    if (circuit_contains_a !== -1 && circuit_contains_b !== -1) {
      circuits[circuit_contains_a].push(...circuits[circuit_contains_b]);
      circuits.splice(circuit_contains_b, 1);

      continue;
    }

    if (circuit_contains_a !== -1) {
      circuits[circuit_contains_a].push(closest_pair.b);
      continue;
    }

    if (circuit_contains_b !== -1) {
      circuits[circuit_contains_b].push(closest_pair.a);
      continue;
    }

    circuits.push([closest_pair.a, closest_pair.b]);
  }

  const [a, b, c] = circuits.sort((a, b) => b.length - a.length);
  return a.length * b.length * c.length;
}

function solve_2(input: Coord[]) {
  let circuits: Coord[][] = input.map((coord) => [coord]);

  const pairs = sortByDistance(input);

  let last_pair: Pair | null = null;

  let i = 0;
  while (circuits.length !== 1) {
    const closest_pair = pairs[i];
    i++;

    if (isInSameCircuit(closest_pair.a, closest_pair.b, circuits)) {
      continue;
    }

    const circuit_contains_a = circuits.findIndex((circuit) =>
      circuit.some((coord) => {
        const coord_string = coord.join(",");
        const closest_pair_a_string = closest_pair.a.join(",");
        return coord_string === closest_pair_a_string;
      })
    );

    const circuit_contains_b = circuits.findIndex((circuit) =>
      circuit.some((coord) => {
        const coord_string = coord.join(",");
        const closest_pair_b_string = closest_pair.b.join(",");
        return coord_string === closest_pair_b_string;
      })
    );

    if (circuit_contains_a !== -1 && circuit_contains_b !== -1) {
      if (circuits.length === 2) {
        last_pair = closest_pair;
      }
      circuits[circuit_contains_a].push(...circuits[circuit_contains_b]);
      circuits.splice(circuit_contains_b, 1);

      continue;
    }

    if (circuit_contains_a !== -1) {
      circuits[circuit_contains_a].push(closest_pair.b);
      continue;
    }

    if (circuit_contains_b !== -1) {
      circuits[circuit_contains_b].push(closest_pair.a);
      continue;
    }

    circuits.push([closest_pair.a, closest_pair.b]);
  }

  if (last_pair) {
    return last_pair.a[0] * last_pair.b[0];
  }
}

console.dir(solve_1(input), { depth: null });
console.dir(solve_2(input), { depth: null });

function distance([x0, y0, z0]: Coord, [x1, y1, z1]: Coord) {
  return Math.hypot(x1 - x0, y1 - y0, z1 - z0);
}
