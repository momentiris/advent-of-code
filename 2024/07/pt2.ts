type Input = Array<[number, Array<number>]>;

export default function main(input: Input) {
  return input.reduce((acc, curr) => {
    const [expected, numbers] = curr;
    const perms = generatePermutations(numbers, ["*", "+", "||"]);
    const evaluated = perms.map(eval);

    if (evaluated.includes(expected)) {
      return acc + expected;
    }

    return acc;
  }, 0);
}

function evaluate(expression: string[]) {
  const expr = expression.join("");
  if (expr.includes("||")) {
    const foo = expr.replace(/\|\|/g, "");
    return foo.slice(1, foo.length - 1).split("");
  }
  return String(eval(expr)).split("");
}

function generatePermutations(
  numbers: Array<number>,
  operators: Array<string>
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

      const evaluated = evaluate(expr);
      results.push(...generateRecursive(currentIndex + 1, evaluated));
    }

    return results;
  }

  return generateRecursive(0, [numbers[0].toString()]);
}
