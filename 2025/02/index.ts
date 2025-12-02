import fs from "fs";

const input = fs
  .readFileSync("02/input.txt", "utf-8")
  .split(",")
  .map((line) => {
    const [start, end] = line.split("-").map(Number);
    return { start, end };
  });

function isMirroredSequence(sequence: string) {
  if (sequence.length % 2 !== 0) return false;

  const first_half = sequence.slice(0, sequence.length / 2);
  const second_half = sequence.slice(sequence.length / 2);

  return first_half === second_half;
}

function findRepeatingSequences(
  sequence: string,
  i: number = 1,
  result: string[] = []
) {
  if (i > sequence.length / 2) return result;

  const substring = sequence.substring(0, i);
  if (sequence.length % i === 0) {
    const candidate = substring.repeat(sequence.length / i);
    if (candidate === sequence) {
      result.push(substring);
    }
  }

  return findRepeatingSequences(sequence, i + 1, result);
}

function solve_1(
  [id, ...ids]: Array<{ start: number; end: number }>,
  result: number[] = []
) {
  if (!id) return result;

  const matches = range(id.start, id.end).filter((sequence) =>
    isMirroredSequence(sequence.toString())
  );

  return solve_1(ids, result.concat(matches));
}

function solve_2(ids: Array<{ start: number; end: number }>) {
  return ids.reduce((result: number[], id) => {
    for (const sequence of range(id.start, id.end)) {
      if (findRepeatingSequences(sequence.toString()).length > 0) {
        result.push(sequence);
      }
    }
    return result;
  }, []);
}

console.log(solve_1(input).reduce((acc, v) => acc + v, 0));
console.log(solve_2(input).reduce((acc, v) => acc + v, 0));

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
