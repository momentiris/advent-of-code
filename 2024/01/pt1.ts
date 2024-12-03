type Input = [Array<number>, Array<number>];

export default function main([left, right]: Input, result: number) {
  const [[a, ...arest], [b, ...brest]] = [
    Array.from(left).sort(),
    Array.from(right).sort(),
  ];

  if (!a) return result;

  const diff = Math.abs(a - b);
  return main([arest, brest], result + diff);
}
