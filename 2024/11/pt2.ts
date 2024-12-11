type Input = Array<number>;

export default function main(input: Input) {
  let stones = new Map<number, number>();
  input.forEach((v) => stones.set(v, 1));

  for (let i = 0; i < 75; i++) {
    stones = blink(stones);
  }

  return [...stones].reduce((acc, [, count]) => acc + count, 0);
}

function collect(stones: Map<number, number>, stone: number, count: number) {
  stones.set(stone, (stones.get(stone) ?? 0) + count);
}

function blink(stones: Map<number, number>) {
  const next = new Map<number, number>();
  for (const [stone, count] of stones) {
    if (stone === 0) {
      collect(next, 1, count);
      continue;
    }

    const as_str = stone.toString();
    if (as_str.length % 2 === 0) {
      const fst = as_str.slice(0, Math.floor(as_str.length / 2));
      const snd = as_str.slice(Math.floor(as_str.length / 2), as_str.length);

      collect(next, Number(fst), count);
      collect(next, Number(snd), count);
      continue;
    } else {
      collect(next, stone * 2024, count);
    }
  }

  return next;
}
