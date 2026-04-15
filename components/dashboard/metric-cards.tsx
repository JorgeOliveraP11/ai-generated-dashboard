import {
  ArrowDownRight,
  ArrowUpRight,
  Landmark,
  type LucideIcon,
  Percent,
} from "lucide-react";
import type { ReactElement } from "react";

import { cn } from "@/lib/utils";
import type { FinanceSummary } from "@/types/finance";

type MetricCardsProps = Readonly<{
  summary: FinanceSummary;
}>;

function formatUsdFromCents(cents: number): string {
  const dollars = cents / 100;
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(dollars);
}

export function MetricCards({ summary }: MetricCardsProps): ReactElement {
  const items: ReadonlyArray<{
    hint: string;
    icon: LucideIcon;
    title: string;
    tone: "negative" | "neutral" | "positive";
    value: string;
  }> = [
    {
      hint: "After-tax inflows this month",
      icon: ArrowUpRight,
      title: "Income (MTD)",
      tone: "positive",
      value: formatUsdFromCents(summary.monthToDateIncome),
    },
    {
      hint: "Card + cash outflows this month",
      icon: ArrowDownRight,
      title: "Spending (MTD)",
      tone: "negative",
      value: formatUsdFromCents(summary.monthToDateSpend),
    },
    {
      hint: "Across all linked accounts & liabilities",
      icon: Landmark,
      title: "Net worth",
      tone: "neutral",
      value: formatUsdFromCents(summary.currentNetWorthCents),
    },
    {
      hint: "Target vs actual savings",
      icon: Percent,
      title: "Savings rate",
      tone: "neutral",
      value: `${summary.savingsRatePercent}%`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        const toneClass =
          item.tone === "positive"
            ? "text-emerald-300"
            : item.tone === "negative"
              ? "text-rose-300"
              : "text-cyan-200";

        return (
          <div
            key={item.title}
            className={cn(
              "glass-frost rounded-2xl border border-white/[0.08] p-4 shadow-[0_22px_44px_-14px_rgba(0,0,0,0.68)] ring-1 ring-inset ring-white/[0.04] sm:p-5",
              "transition duration-200 hover:border-white/[0.12] hover:shadow-[0_28px_56px_-14px_rgba(0,0,0,0.78)]",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-400 sm:text-sm">
                  {item.title}
                </p>
                <p className="mt-1.5 truncate text-xl font-semibold tracking-tight text-white tabular-nums sm:mt-2 sm:text-2xl">
                  {item.value}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-slate-500 sm:text-xs">
                  {item.hint}
                </p>
              </div>
              <span
                className={cn(
                  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-950/75 text-cyan-100 ring-1 ring-white/[0.1] backdrop-blur-md sm:h-11 sm:w-11",
                  toneClass,
                )}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
