import { match } from "ts-pattern";

type Input = Array<number>;
type Program = Array<string>;

export default function main(input: Input) {
  const program = getProgram(input);
  const moved = move(program);

  const check = checksum(moved);
  return check;
}

function getProgram(input: Input): Program {
  return input.flatMap((_, i) =>
    Array.from({ length: Number(input[i]) }, (_) =>
      match(i % 2)
        .with(0, () => String(i / 2))
        .otherwise(() => ".")
    )
  );
}

function checksum(program: Program) {
  return program.reduce(
    (acc, curr, i) =>
      match(curr)
        .with(".", () => acc)
        .otherwise((v) => acc + i * Number(v)),
    0
  );
}

function move(program: Program): Program {
  const result = Array.from(program);

  let num_dots = result.filter((v) => v === ".").length;
  let count = 0;

  while (count < num_dots) {
    const next_to_move = Array.from(result.join("").matchAll(/(\d)\1+/g)).at(
      -1
    );

    const reg = new RegExp(
      `\(${Array.from({ length: next_to_move[0].length }).fill(".").join("")})`
    );
    console.log("..".match(reg));

    const space_of_matching_size = result.join("").match(reg);

    // console.log({ space_of_matching_size });

    const first_dot = result.findIndex((v) => v === ".");

    result[first_dot] = result[next_to_move];
    result[next_to_move] = ".";
    count++;
    console.log(result.join(""));
  }

  return result;
}
