import fs from "fs";
import { match } from "ts-pattern";

const input = fs.readFileSync("06/input.txt", "utf-8");

function solve_1(input: string) {
  const lines = input.trim().split("\n");
  const operators = lines.pop()!.trim().split(/\s+/);
  const numbers = lines.map((line) => line.trim().split(/\s+/).map(Number));
  const problems = numbers[0].map((_, i) => numbers.map((row) => row[i]));

  const results = problems.map((problem, i) =>
    applyOperator(operators[i], problem)
  );

  return results.reduce((sum, result) => sum + result, 0);
}

function solve_2(input: string) {
  const lines = input.trim().split("\n");
  const operators = lines.pop()!.trim().split(/\s+/);

  const columns = transposeToColumns(lines);
  const groups = groupColumns(columns);
  const problems = columnsToNumbers(groups);

  const results = problems.map((problem, i) =>
    applyOperator(operators[i], problem)
  );

  return results.reduce((sum, result) => sum + result, 0);
}

console.log(solve_1(input));
console.log(solve_2(input));

function transposeToColumns(lines: string[]) {
  const chars = lines.map((line) => line.split(""));
  const max_length = Math.max(...chars.map((row) => row.length));
  return Array.from({ length: max_length }, (_, i) =>
    chars.map((row) => row[i] || "")
  );
}

function groupColumns(columns: string[][]) {
  const groups: string[][][] = [];
  let current_group: string[][] = [];

  for (const column of columns) {
    const group_separator = column.every((char) => char === "" || char === " ");

    if (group_separator) {
      if (current_group.length > 0) {
        groups.push(current_group);
        current_group = [];
      }
    } else {
      current_group.push(column);
    }
  }

  if (current_group.length > 0) {
    groups.push(current_group);
  }

  return groups;
}

function columnsToNumbers(groups: string[][][]) {
  return groups.map((group) =>
    group
      .map((column) => column.filter((char) => Boolean(char.trim())))
      .map((digits) => Number(digits.join("")))
  );
}

function applyOperator(operator: string, numbers: number[]) {
  return numbers.reduce(
    (acc, num) =>
      match(operator)
        .with("*", () => (acc || 1) * num)
        .with("+", () => acc + num)
        .otherwise(() => acc),
    0
  );
}
