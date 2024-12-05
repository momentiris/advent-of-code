import { readFile } from "../util";

import pt1 from "./pt1";
import pt2 from "./pt2";

export function run() {
  const [a, b] = readFile("05/input.txt").split("\n\n");

  const page_order_rules = a.split(/\n/g).map((v) => v.split("|"));

  const updates = b
    .trim()
    .split(/\n/g)
    .map((v) => v.split(","));

  return [pt1(page_order_rules, updates), pt2(page_order_rules, updates)];
}
