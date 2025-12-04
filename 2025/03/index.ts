import fs from "fs";

const input = fs.readFileSync("03/input.txt", "utf-8").split("\n");

function scan(bank: string, max: number) {
  let stack = "";
  let to_remove = bank.length - max;
  for (const char of bank) {
    while (to_remove > 0 && stack[stack.length - 1] < char) {
      stack = stack.slice(0, -1);
      to_remove = to_remove - 1;
    }
    stack = stack + char;
  }
  return stack.slice(0, max);
}

function solve_1(banks: string[]) {
  return banks.map((bank) => scan(bank, 2));
}

function solve_2(banks: string[]) {
  return banks.map((bank) => scan(bank, 12));
}

console.log(solve_1(input).reduce((acc, curr) => acc + Number(curr), 0));
console.log(solve_2(input).reduce((acc, curr) => acc + Number(curr), 0));
