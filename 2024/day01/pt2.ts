type Input = [Array<number>, Array<number>];

export default function main([left, right]: Input, result: number) {
  const [next, ...rest] = left;
  if (!next) return result;

  const occurrences = right.filter((v) => v === next).length;
  return main([rest, right], result + next * occurrences);
}
