export default function main(input: Array<Array<string>>) {
  const horizontal = scan_line(input);
  const vertical = scan_line(collect_vertical(input));
  const diagonal = collect_diagonal(input);
  const diagonal_horiz_flip = collect_diagonal(
    input.map((row) => Array.from(row).reverse())
  );

  const summed = Object.values(diagonal).concat(
    Object.values(diagonal_horiz_flip)
  );

  const diag = summed
    .map((arr) => [...arr.join("").matchAll(/(?=(XMAS|SAMX))/g)].length)
    .reduce((acc, val) => acc + val, 0);

  return diag + horizontal + vertical;
}

function scan_line(lines: Array<Array<string>>) {
  return lines.reduce((acc, col) => {
    const matches = [...col.join("").matchAll(/(?=(XMAS|SAMX))/g)];
    return acc + matches.length;
  }, 0);
}

function collect_vertical(map: Array<Array<string>>) {
  const foo: Array<Array<string>> = [];
  for (let i = 0; i < map.length; i++) {
    const row = map[i];
    for (let j = 0; j < row.length; j++) {
      if (!foo[j]) {
        foo[j] = [];
      }

      foo[j][i] = map[i][j];
    }
  }

  return foo;
}

function collect_diagonal(map: Array<Array<string>>) {
  const collection: any = {};
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (map[x][y]) {
        if (!collection[x + y]) {
          collection[x + y] = [map[x][y]];
        } else {
          collection[x + y].push(map[x][y]);
        }
      }
    }
  }

  return collection;
}
