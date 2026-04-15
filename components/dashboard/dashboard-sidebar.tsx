import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import type { ReactElement } from "react";

import { dashboardNavItems } from "@/components/dashboard/nav-config";
import { cn } from "@/lib/utils";

export function DashboardSidebar(): ReactElement {
  return (
    <aside className="glass-frost glass-sidebar hidden w-56 shrink-0 sm:w-60 lg:block">
      <div className="flex h-14 items-center gap-3 border-b border-white/[0.06] px-4 sm:h-16 sm:px-6">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-indigo-500/25 text-cyan-200 shadow-[0_12px_24px_-10px_rgba(34,211,238,0.35)] ring-1 ring-cyan-300/25 sm:h-10 sm:w-10">
          <LayoutDashboard className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
        </div>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-semibold tracking-tight text-white">
            Atlas Finance
          </p>
          <p className="truncate text-xs text-slate-500">Smart dashboard</p>
        </div>
      </div>
      <nav className="space-y-1 px-2 py-4 sm:px-3 sm:py-5" aria-label="Primary">
        {dashboardNavItems.map((item) => {
          const Icon = item.icon;
          const content = (
            <span
              className={cn(
                "flex min-h-[44px] items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all sm:min-h-0",
                item.disabled
                  ? "cursor-not-allowed text-slate-600"
                  : "text-slate-300 hover:bg-white/[0.06] hover:text-white hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              <span className="truncate">{item.label}</span>
              {item.disabled ? (
                <span className="ml-auto shrink-0 rounded-full border border-white/[0.06] bg-charcoal-900/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  Soon
                </span>
              ) : null}
            </span>
          );

          if (item.disabled) {
            return (
              <div key={item.href} className="select-none">
                {content}
              </div>
            );
          }

          return (
            <Link key={item.href} href={item.href} className="block">
              {content}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
