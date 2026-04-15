import type { MockTransaction, TransactionCategory } from "@/lib/mockData";

export type AiRecommendation = {
  body: string;
  id: string;
  title: string;
};

export type SpendingAnomaly = {
  categoryLabel: string;
  description: string;
  id: string;
  metric: string;
  severity: "notice" | "warning";
  title: string;
};

export type SpendingInsightsReport = {
  anomalies: SpendingAnomaly[];
  generatedAt: string;
  recommendations: AiRecommendation[];
};

const ANOMALY_RATIO = 1.2;
const WARNING_RATIO = 1.3;

const SPEND_CATEGORIES: TransactionCategory[] = [
  "Dining",
  "Entertainment",
  "Groceries",
  "Healthcare",
  "Investment",
  "Rent",
  "Shopping",
  "Transport",
  "Utilities",
];

function monthKeyFromIsoDate(isoDate: string): string {
  return isoDate.slice(0, 7);
}

function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(cents / 100);
}

function roundPct(value: number): number {
  return Math.round(value * 10) / 10;
}

type MonthlyTotals = ReadonlyMap<string, ReadonlyMap<TransactionCategory, number>>;

function accumulateMonthlySpends(
  transactions: MockTransaction[],
): MonthlyTotals {
  const outer = new Map<string, Map<TransactionCategory, number>>();

  for (const row of transactions) {
    if (row.amountCents >= 0) {
      continue;
    }
    if (row.category === "Income") {
      continue;
    }

    const month = monthKeyFromIsoDate(row.date);
    const spend = Math.abs(row.amountCents);
    let inner = outer.get(month);
    if (inner === undefined) {
      inner = new Map();
      outer.set(month, inner);
    }
    const prev = inner.get(row.category) ?? 0;
    inner.set(row.category, prev + spend);
  }

  return outer;
}

function sortedMonthKeys(monthly: MonthlyTotals): string[] {
  return [...monthly.keys()].sort((a, b) => a.localeCompare(b));
}

function getFoodMonthlyTotals(monthly: MonthlyTotals): Map<string, number> {
  const result = new Map<string, number>();
  for (const [month, cats] of monthly) {
    const dining = cats.get("Dining") ?? 0;
    const groceries = cats.get("Groceries") ?? 0;
    result.set(month, dining + groceries);
  }
  return result;
}

function mean(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }
  const sum = values.reduce((acc, v) => acc + v, 0);
  return sum / values.length;
}

function pushCategoryAnomaly(
  anomalies: SpendingAnomaly[],
  categoryLabel: string,
  recentCents: number,
  baselineAvgCents: number,
  idPrefix: string,
): void {
  if (baselineAvgCents <= 0 || recentCents <= 0) {
    return;
  }
  if (recentCents <= baselineAvgCents * ANOMALY_RATIO) {
    return;
  }

  const pctAbove = ((recentCents - baselineAvgCents) / baselineAvgCents) * 100;
  const severity =
    recentCents > baselineAvgCents * WARNING_RATIO ? "warning" : "notice";

  anomalies.push({
    categoryLabel,
    description: `You spent ${formatUsd(recentCents)} in the review month vs a ${formatUsd(Math.round(baselineAvgCents))} average in prior months.`,
    id: `${idPrefix}_${categoryLabel.replace(/\s+/g, "_").toLowerCase()}`,
    metric: `+${roundPct(pctAbove)}% vs baseline`,
    severity,
    title: `${categoryLabel} above typical`,
  });
}

function detectInvestmentSpike(
  monthly: MonthlyTotals,
  anomalies: SpendingAnomaly[],
): void {
  const months = sortedMonthKeys(monthly);
  const amounts = months
    .map((m) => monthly.get(m)?.get("Investment") ?? 0)
    .filter((v) => v > 0)
    .sort((a, b) => a - b);
  if (amounts.length < 2) {
    return;
  }
  const median = amounts[Math.floor((amounts.length - 1) / 2)] ?? 0;
  const max = amounts[amounts.length - 1] ?? 0;
  if (median <= 0 || max <= median * 1.45) {
    return;
  }

  anomalies.push({
    categoryLabel: "Investment",
    description: `A one-time or elevated transfer (${formatUsd(max)}) stands out from your usual monthly investment rhythm (${formatUsd(median)} median).`,
    id: "anomaly_investment_spike",
    metric: `${formatUsd(max)} peak`,
    severity: "notice",
    title: "Irregular investment transfer",
  });
}

function buildRecommendations(
  anomalies: SpendingAnomaly[],
): AiRecommendation[] {
  const out: AiRecommendation[] = [];
  let seq = 0;
  const nextId = (): string => {
    seq += 1;
    return `rec_${String(seq).padStart(3, "0")}`;
  };

  if (anomalies.length === 0) {
    return [
      {
        body: "Connect every spending account so dining, groceries, and delivery map to one food view—anomalies need at least three months of coverage.",
        id: nextId(),
        title: "Enrich your ledger",
      },
      {
        body: "Set soft caps at 90% of your trailing 3-month average per category; we will surface pacing alerts before you cross the 20% anomaly band.",
        id: nextId(),
        title: "Proactive caps",
      },
    ];
  }

  for (const a of anomalies) {
    if (a.categoryLabel === "Food (Dining + Groceries)") {
      out.push({
        body: "Batch cook twice weekly and cap delivery to weekends; pilot users cut food spend ~12% without changing restaurants entirely.",
        id: nextId(),
        title: "Stabilize food spend",
      });
      continue;
    }
    if (a.categoryLabel === "Utilities") {
      out.push({
        body: "Pull 13-month usage from your electric portal and compare time-of-use plans; winter heating spikes often hide rate drift.",
        id: nextId(),
        title: "Audit utility rates",
      });
      continue;
    }
    if (a.categoryLabel === "Dining") {
      out.push({
        body: "Set a weekly dining budget in-app alerts at 80% of your baseline average so you get a nudge before crossing the 20% anomaly band.",
        id: nextId(),
        title: "Dining guardrails",
      });
      continue;
    }
    if (a.categoryLabel === "Groceries") {
      out.push({
        body: "Move one bulk shop to mid-month and use a list tied to meal plan; reduces duplicate midweek top-ups that inflate grocery totals.",
        id: nextId(),
        title: "Grocery rhythm",
      });
      continue;
    }
    if (a.categoryLabel === "Investment") {
      out.push({
        body: "Large contributions are positive—confirm cash cushion stays above 45 days of expenses after the transfer.",
        id: nextId(),
        title: "Keep buffer after investing",
      });
      continue;
    }
    out.push({
      body: `Review last month's ${a.categoryLabel} line items and tag any one-off charges so next month's forecast excludes them.`,
      id: nextId(),
      title: `Reconcile ${a.categoryLabel}`,
    });
  }

  if (out.length < 2) {
    out.push({
      body: "Turn on merchant-level rules for subscriptions; duplicate SaaS charges are the fastest silent drain after utilities seasonality.",
      id: nextId(),
      title: "Automate categorization",
    });
  }
  if (out.length < 2) {
    out.push({
      body: "Schedule a 10-minute weekly money pulse: compare actuals to category caps and roll unspent dining into savings or debt payoff.",
      id: nextId(),
      title: "Weekly spend pulse",
    });
  }

  return out.slice(0, 6);
}

/**
 * Compares the last full month in the window (second-to-last calendar month
 * present) against the average of all prior months to limit partial-month bias
 * on the trailing month.
 */
export function buildSpendingInsights(
  transactions: MockTransaction[],
): SpendingInsightsReport {
  const monthly = accumulateMonthlySpends(transactions);
  const months = sortedMonthKeys(monthly);

  const anomalies: SpendingAnomaly[] = [];

  if (months.length >= 3) {
    const baselineMonths = months.slice(0, -2);
    const reviewMonth = months[months.length - 2] ?? "";

    if (baselineMonths.length > 0 && reviewMonth !== "") {
      for (const category of SPEND_CATEGORIES) {
        const baselineValues = baselineMonths.map(
          (m) => monthly.get(m)?.get(category) ?? 0,
        );
        const baselineAvg = mean(baselineValues);
        const recent =
          monthly.get(reviewMonth)?.get(category) ?? 0;
        pushCategoryAnomaly(
          anomalies,
          category,
          recent,
          baselineAvg,
          "anomaly_cat",
        );
      }

      const foodMonthly = getFoodMonthlyTotals(monthly);
      const baselineFood = mean(
        baselineMonths.map((m) => foodMonthly.get(m) ?? 0),
      );
      const recentFood = foodMonthly.get(reviewMonth) ?? 0;
      pushCategoryAnomaly(
        anomalies,
        "Food (Dining + Groceries)",
        recentFood,
        baselineFood,
        "anomaly_food",
      );
    }
  }

  detectInvestmentSpike(monthly, anomalies);

  const deduped = dedupeAnomalies(
    dedupeInvestmentAnomalies(suppressRedundantFoodAnomalies(anomalies)),
  );
  const recommendations = buildRecommendations(deduped);

  return {
    anomalies: deduped,
    generatedAt: new Date().toISOString(),
    recommendations,
  };
}

function dedupeInvestmentAnomalies(rows: SpendingAnomaly[]): SpendingAnomaly[] {
  const hasSpike = rows.some((r) => r.id === "anomaly_investment_spike");
  if (!hasSpike) {
    return rows;
  }
  return rows.filter(
    (r) =>
      !(
        r.categoryLabel === "Investment" && r.id.startsWith("anomaly_cat_")
      ),
  );
}

function suppressRedundantFoodAnomalies(
  rows: SpendingAnomaly[],
): SpendingAnomaly[] {
  const hasFoodCombo = rows.some((r) => r.id.startsWith("anomaly_food"));
  if (!hasFoodCombo) {
    return rows;
  }
  return rows.filter(
    (r) =>
      r.categoryLabel !== "Dining" && r.categoryLabel !== "Groceries",
  );
}

function dedupeAnomalies(rows: SpendingAnomaly[]): SpendingAnomaly[] {
  const seen = new Set<string>();
  const out: SpendingAnomaly[] = [];
  for (const row of rows) {
    const key = `${row.categoryLabel}|${row.title}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    out.push(row);
  }
  return out;
}
