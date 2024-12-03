import { match, P } from "ts-pattern";
import { parseSafeReport } from "./parse-safe-report";

export default function main(input: Array<Array<number>>) {
  return input.reduce((acc, curr) => {
    return match(parseSafeReport(curr))
      .with(P.array(P.number), () => acc + 1)
      .otherwise(() => acc);
  }, 0);
}
