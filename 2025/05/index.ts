import fs from "fs";

const example = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32`.trim();

const input = fs.readFileSync("05/input.txt", "utf-8").trim();

const [chunk1, chunk2] = input.split("\n\n");

function get_fresh(ingredient: number, fresh: number[][]) {
  for (const [start, end] of fresh) {
    if (ingredient >= start && ingredient <= end) {
      return true;
    }
  }

  return false;
}

function get_max_fresh(fresh_range: number[][]) {
  const fresh_ranges: [number, number][] = [];

  for (const [start, end] of fresh_range) {
    // Is there any existing range that includes part of current range
    const existing_start = fresh_ranges.findIndex(
      ([s, e]) => start <= e && s <= start
    );
    const existing_end = fresh_ranges.findIndex(
      ([s, e]) => s <= end && e >= end
    );

    if (existing_start === -1 && existing_end === -1) {
      fresh_ranges.push([start, end]);
      continue;
    } else if (existing_start !== -1 && existing_end !== -1) {
      fresh_ranges[existing_start] = [
        fresh_ranges[existing_start][0],
        fresh_ranges[existing_end][1],
      ];
    } else if (existing_start !== -1) {
      fresh_ranges[existing_start] = [fresh_ranges[existing_start][0], end];
    } else if (existing_end !== -1) {
      fresh_ranges[existing_end] = [start, fresh_ranges[existing_end][1]];
    }
  }

  return fresh_ranges;
}

function solve_1(chunk1: string, chunk2: string) {
  const fresh = chunk1.split("\n").map((v) => v.split("-").map(Number));
  const available = chunk2.split("\n").map(Number);

  return available.filter((ingredient) => get_fresh(ingredient, fresh)).length;
}

function solve_2(chunk1: string) {
  const fresh = chunk1
    .split("\n")
    .map((v) => v.split("-").map(Number))
    .sort((a, b) => a[0] - b[0]);

  return get_max_fresh(fresh).reduce(
    (acc, [start, end]) => acc + end - start + 1,
    0
  );
}

console.log(solve_1(chunk1, chunk2));
console.log(solve_2(chunk1));
