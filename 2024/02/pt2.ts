import { parseSafeReport } from "./parse-safe-report";

export default function main(input: Array<Array<number>>) {
  return input.reduce((acc, curr) => {
    const safe = parseSafeReport(curr);

    if (safe) return acc + 1;

    const dampened = curr.some((_v, i, arr) => {
      const withoutCurrent = arr.filter((_v, y) => i !== y);
      return Boolean(parseSafeReport(withoutCurrent));
    });

    if (dampened) return acc + 1;

    return acc;
  }, 0);
}
