import { AlertTriangle, Lightbulb, Sparkles } from "lucide-react";
import type { ReactElement } from "react";

import type { SpendingInsightsReport } from "@/lib/spending-insights";
import { cn } from "@/lib/utils";

type SmartInsightsSidebarProps = Readonly<{
  className?: string;
  report: SpendingInsightsReport;
}>;

function formatGeneratedAt(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

export function SmartInsightsSidebar({
  className,
  report,
}: SmartInsightsSidebarProps): ReactElement {
  return (
    <aside
      className={cn(
        "glass-frost w-full max-w-xl shrink-0 space-y-4 rounded-2xl border border-white/[0.08] p-4 shadow-[0_28px_56px_-16px_rgba(0,0,0,0.72)] ring-1 ring-inset ring-white/[0.05] sm:mx-auto sm:space-y-5 sm:p-5 xl:mx-0 xl:max-h-[calc(100dvh-6rem)] xl:max-h-[calc(100vh-6rem)] xl:max-w-[22rem] xl:overflow-y-auto xl:sticky xl:top-20",
        className,
      )}
      aria-label="Smart insights"
    >
      <div className="flex items-start gap-3 border-b border-white/[0.06] pb-3 sm:pb-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-indigo-500/30 text-cyan-200 ring-1 ring-cyan-300/25">
          <Sparkles className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold tracking-tight text-white sm:text-base">
            Smart insights
          </h2>
          <p className="mt-1 text-[11px] leading-relaxed text-slate-400 sm:text-xs">
            Rule-based analysis of your mock ledger—anomalies vs baseline and
            suggested next steps.
          </p>
          {formatGeneratedAt(report.generatedAt) !== "" ? (
            <p className="mt-2 text-[10px] font-medium uppercase tracking-wide text-slate-500 sm:text-[11px]">
              Updated {formatGeneratedAt(report.generatedAt)}
            </p>
          ) : null}
        </div>
      </div>

      <section>
        <div className="mb-2 flex items-center gap-2 sm:mb-3">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-300" aria-hidden />
          <h3 className="text-sm font-semibold text-white">Spending anomalies</h3>
        </div>
        {report.anomalies.length === 0 ? (
          <p className="rounded-xl border border-white/[0.06] bg-charcoal-950/40 px-3 py-3 text-xs leading-relaxed text-slate-400 sm:text-sm">
            No category cleared the 20% above-baseline threshold for the review
            window—keep logging transactions for richer signals.
          </p>
        ) : (
          <ul className="space-y-2 sm:space-y-3">
            {report.anomalies.map((item) => (
              <li
                key={item.id}
                className={cn(
                  "rounded-xl border px-3 py-2.5 shadow-[0_14px_28px_-14px_rgba(0,0,0,0.55)] ring-1 ring-inset sm:py-3",
                  item.severity === "warning"
                    ? "border-amber-400/25 bg-amber-500/[0.07] ring-amber-200/10"
                    : "border-white/[0.07] bg-navy-950/55 ring-white/[0.04] backdrop-blur-md",
                )}
              >
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <span
                    className={cn(
                      "w-fit shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                      item.severity === "warning"
                        ? "bg-amber-500/20 text-amber-200"
                        : "bg-slate-500/20 text-slate-200",
                    )}
                  >
                    {item.metric}
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400 sm:text-xs">
                  {item.description}
                </p>
                <p className="mt-2 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                  {item.categoryLabel}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="mb-2 flex items-center gap-2 sm:mb-3">
          <Lightbulb className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden />
          <h3 className="text-sm font-semibold text-white">AI recommendations</h3>
        </div>
        <ul className="space-y-2 sm:space-y-3">
          {report.recommendations.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-cyan-400/15 bg-gradient-to-br from-cyan-500/[0.07] to-indigo-600/[0.06] px-3 py-2.5 shadow-[0_12px_28px_-14px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-white/[0.05] sm:py-3"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-cyan-200/90 sm:text-xs">
                {item.title}
              </p>
              <p className="mt-1.5 text-xs leading-snug text-slate-200 sm:text-sm">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
