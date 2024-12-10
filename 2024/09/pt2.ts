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
  const number_groups = Array.from(program.join("").matchAll(/(\d)\1*/g)).map(
    (v) => ({ value: v[0], index: v.index })
  );
  const moves = number_groups.sort((a, b) => {
    // Extract the file IDs as numbers
    const fileIdA = Number(a.value[0]);
    const fileIdB = Number(b.value[0]);
    return fileIdB - fileIdA; // descending order
  });
  return m(moves, Array.from(program));
}

function m(moves: Array<{ value: string; index: number }>, result: Program) {
  let i = 0;

  while (i < moves.length) {
    const move = moves[i];

    const space_of_matching_size = Array.from(
      result.join("").matchAll(new RegExp(`\\.{${move.value.length},}`, "g"))
    ).find((v) => v.index < move.index);

    if (space_of_matching_size) {
      for (let j = 0; j < move.value.length; j++) {
        result[move.index + j] = ".";
        result[space_of_matching_size.index! + j] = move.value[0];
      }
    }

    i++;
  }

  return result;
}
