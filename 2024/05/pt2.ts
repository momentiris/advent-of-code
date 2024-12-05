import { find_rules_for_update_row, is_not_ok } from "./util";

export default function main(
  page_order_rules: Array<Array<string>>,
  updates: Array<Array<string>>
) {
  const not_ok = scan(page_order_rules, updates).reduce((acc, update) => {
    const middle = Math.round((update.length - 1) / 2);
    return acc + Number(update[middle]);
  }, 0);

  return not_ok;
}

function scan(
  page_order_rules: Array<Array<string>>,
  updates: Array<Array<string>>
): Array<Array<string>> {
  const result: any = [];
  for (let row = 0; row < updates.length; row++) {
    const rules_for_row = find_rules_for_update_row(
      page_order_rules,
      updates[row]
    );

    const not_ok_row = is_not_ok(rules_for_row, updates[row]);
    if (not_ok_row) {
      let fixed = sort(rules_for_row, not_ok_row);
      while (is_not_ok(rules_for_row, fixed)) {
        fixed = sort(rules_for_row, fixed);
      }
      result.push(fixed);
    }
  }

  return result;
}

function sort([rule, ...rules]: Array<Array<string>>, row: Array<string>) {
  if (!rule) {
    return row;
  }

  const [a, b] = rule;
  const row_a = row.indexOf(a);
  const row_b = row.indexOf(b);

  if (row_a >= row_b) {
    row[row_a] = b;
    row[row_b] = a;
  }

  return sort(rules, row);
}
