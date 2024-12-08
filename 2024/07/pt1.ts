type Input = Array<[number, Array<number>]>;
type Operator = "*" | "+";

export default function main(input: Input) {
  return input.reduce((acc, curr) => {
    const [expected, numbers] = curr;
    const perms = generatePermutations(numbers, ["*", "+"]);
    const evaluated = perms.map(eval);
    if (evaluated.includes(expected)) {
      return acc + expected;
    }
    return acc;
  }, 0);
}

function generatePermutations(
  numbers: Array<number>,
  operators: Array<Operator>
) {
  function generateRecursive(
    currentIndex: number,
    expression: string[]
  ): string[] {
    if (currentIndex === numbers.length - 1) {
      return [expression.join("")];
    }

    const results: string[] = [];
    for (const operator of operators) {
      const expr = [
        "(",
        ...expression,
        operator,
        numbers[currentIndex + 1].toString(),
        ")",
      ];

      results.push(...generateRecursive(currentIndex + 1, expr));
    }

    return results;
  }

  return generateRecursive(0, [numbers[0].toString()]);
}

/*
 *
 * 3267 [ 81, 40, 27 ]
 * 81 + 40 + 27
 * 81 * 40 * 27
 * 81 + 40 * 27
 * 81 * 40 + 27
 *
 *
 *
 */
