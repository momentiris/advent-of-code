import { find_rules_for_update_row, is_ok } from "./util";

export default function main(
  page_order_rules: Array<Array<string>>,
  updates: Array<Array<string>>
) {
  return scan(page_order_rules, updates).reduce((acc, update) => {
    const middle = Math.round((update.length - 1) / 2);
    return acc + Number(update[middle]);
  }, 0);
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

    const ok_row = is_ok(rules_for_row, updates[row]);
    if (ok_row) result.push(ok_row);
  }

  return result;
}
