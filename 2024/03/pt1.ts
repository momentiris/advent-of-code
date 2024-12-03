import { match, P } from "ts-pattern";
import { validInstruction } from "./util";

export default function main(input: string) {
  const instructions = [...input.matchAll(validInstruction)].map(
    ([match]) => match
  );

  return solve(instructions, true, 0);
}

export function solve(
  [instruction, ...instructions]: Array<string>,
  doo: boolean,
  result: number
): number {
  if (!instruction) return result;

  return match(instruction)
    .with(P.string.startsWith("mul"), (v) => {
      const [a, b] = v.split("(")[1].split(")")[0].split(",").map(Number);

      if (!doo) return solve(instructions, false, result);
      return solve(instructions, true, result + a * b);
    })
    .otherwise(() => solve(instructions, true, result));
}
