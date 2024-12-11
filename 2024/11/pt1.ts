type Input = Array<number>;

export default function main(input: Input) {
  return Array.from({ length: 25 }).reduce((acc: Input, curr) => {
    acc = blink(acc);
    return acc;
  }, input).length;
}

function blink(input: Input) {
  const result = [];

  for (let i = 0; i < input.length; i++) {
    const current = input[i];
    const as_str = current.toString();
    if (current === 0) {
      result.push(1);
    } else if (as_str.length % 2 === 0) {
      const fst = as_str.slice(0, Math.floor(as_str.length / 2));
      const snd = as_str.slice(Math.floor(as_str.length / 2), as_str.length);
      result.push(Number(fst), Number(snd));
    } else {
      result.push(input[i] * 2024);
    }
  }

  return result;
}
