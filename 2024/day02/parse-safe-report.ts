const getDirection = (a: number, b: number) =>
  a > b ? "dec" : a < b ? "inc" : undefined;

export function parseSafeReport(
  report: Array<number>
): Array<number> | undefined {
  const [a, b] = report;
  const direction = getDirection(a, b);

  if (!direction) return undefined;

  for (let i = 0; i < report.length; i++) {
    const current = report[i];
    const next = report[i + 1];

    if (!next) return report;

    const d = getDirection(current, next);
    if (d !== direction) return undefined;

    const diff = Math.abs(current - next);
    if (diff < 1 || diff > 3) return undefined;
  }

  return report;
}
