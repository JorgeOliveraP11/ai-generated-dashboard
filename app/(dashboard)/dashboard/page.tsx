import { CalendarRange, Sparkles } from "lucide-react";
import type { ReactElement } from "react";

import { loadSpendingInsights } from "@/app/actions/spending-insights";
import { ChartSurface } from "@/components/dashboard/chart-surface";
import { GlassPanel } from "@/components/dashboard/glass-panel";
import { MetricCards } from "@/components/dashboard/metric-cards";
import { NetWorthChart } from "@/components/dashboard/net-worth-chart";
import { SmartInsightsSidebar } from "@/components/dashboard/smart-insights-sidebar";
import { SpendingChart } from "@/components/dashboard/spending-chart";
import {
  mockMonthlySpending,
  mockNetWorthHistory,
  mockSummary,
} from "@/lib/mock-finance-data";

export default async function DashboardPage(): Promise<ReactElement> {
  const insightReport = await loadSpendingInsights();

  return (
    <div className="flex flex-col gap-6 sm:gap-8 xl:flex-row xl:items-start xl:gap-10">
      <div className="min-w-0 flex-1 space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="glass-frost inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-3 py-1 text-xs font-medium text-cyan-200/90 shadow-[0_12px_28px_-18px_rgba(0,0,0,0.55)] ring-1 ring-inset ring-white/[0.05]">
              <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
              AI-assisted overview
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Executive overview
            </h1>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-400 sm:text-sm">
              Frosted panels highlight what changed this month—cash flow, net
              worth trajectory, and category momentum at a glance.
            </p>
          </div>
          <div className="glass-frost flex w-full shrink-0 flex-wrap items-center gap-2 rounded-xl border border-white/[0.08] px-3 py-2.5 text-xs text-slate-300 shadow-[0_16px_32px_-18px_rgba(0,0,0,0.6)] ring-1 ring-inset ring-white/[0.05] sm:w-auto sm:px-4 sm:py-3 sm:text-sm">
            <CalendarRange
              className="h-4 w-4 shrink-0 text-cyan-300"
              aria-hidden
            />
            <span className="font-medium text-white">April 2026</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">Month to date</span>
          </div>
        </div>

        <MetricCards summary={mockSummary} />

        <div className="grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-2">
          <GlassPanel
            title="Monthly spending"
            description="Stacked categories—sample data for the trailing six months."
          >
            <div className="h-[15rem] w-full sm:h-[17rem] md:h-72">
              <ChartSurface className="h-full">
                <SpendingChart data={mockMonthlySpending} />
              </ChartSurface>
            </div>
          </GlassPanel>

          <GlassPanel
            title="Net worth"
            description="Total assets minus liabilities; trend across linked accounts."
          >
            <div className="h-[15rem] w-full sm:h-[17rem] md:h-72">
              <ChartSurface className="h-full">
                <NetWorthChart data={mockNetWorthHistory} />
              </ChartSurface>
            </div>
          </GlassPanel>
        </div>
      </div>

      <SmartInsightsSidebar report={insightReport} />
    </div>
  );
}
