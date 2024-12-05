export function is_before(a: string, b: string, update_row: Array<string>) {
  return update_row.indexOf(a) < update_row.indexOf(b);
}

export function is_ok(conditions: Array<Array<string>>, update: Array<string>) {
  for (const [a, b] of conditions) {
    const ok = is_before(a, b, update);
    if (!ok) return undefined;
  }

  return update;
}

export function is_not_ok(
  conditions: Array<Array<string>>,
  update: Array<string>
) {
  for (const [a, b] of conditions) {
    const ok = is_before(a, b, update);
    if (!ok) return update;
  }

  return undefined;
}

export function find_rules_for_update_row(
  page_order_rules: Array<Array<string>>,
  update: Array<string>
) {
  return page_order_rules.filter(
    ([a, b]) => update.includes(a) && update.includes(b)
  );
}
