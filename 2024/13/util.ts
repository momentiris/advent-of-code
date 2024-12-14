export function diophantine(
  a1: number,
  b1: number,
  c1: number,
  a2: number,
  b2: number,
  c2: number
) {
  // https://en.wikipedia.org/wiki/Cramer%27s_rule
  // If the determinant is 0, there are no (or infinite) solutions
  const d = a1 * b2 - a2 * b1;

  if (d === 0) {
    return undefined;
  }

  // https://en.wikipedia.org/wiki/Cramer%27s_rule
  // https://stackoverflow.com/questions/75829206/solving-a-system-of-linear-equations-with-cramers-rule
  const a_numerator = c1 * b2 - c2 * b1;
  const b_numerator = a1 * c2 - a2 * c1;

  // Solution must be integers
  if (a_numerator % d !== 0 || b_numerator % d !== 0) {
    return undefined;
  }

  const a = a_numerator / d;
  const b = b_numerator / d;

  if (a >= 0 && b >= 0) {
    return [{ a, b }];
  } else {
    return undefined;
  }
}
