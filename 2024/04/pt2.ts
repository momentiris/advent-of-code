function count_MAS(input: Array<Array<string>>) {
  let count = 0;
  const rows = input.length;
  const cols = input[0].length;
  const patterns = ["MAS", "SAM"];

  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      const center = input[i + 1]?.[j + 1];
      if (center !== "A") continue;

      const tl = input[i]?.[j];
      const tr = input[i]?.[j + 2];
      const bl = input[i + 2]?.[j];
      const br = input[i + 2]?.[j + 2];

      const diag1 = `${tl}${center}${br}`;
      const diag2 = `${bl}${center}${tr}`;

      if (patterns.includes(diag1) && patterns.includes(diag2)) {
        count++;
      }
    }
  }

  return count;
}

export default function main(input: Array<Array<string>>) {
  return count_MAS(input);
}
