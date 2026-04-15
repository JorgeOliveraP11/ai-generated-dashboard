import { Bell, Search } from "lucide-react";
import type { ReactElement } from "react";

export function DashboardHeader(): ReactElement {
  return (
    <header className="glass-frost glass-header sticky top-0 z-30">
      <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-0 sm:h-16 lg:px-10">
        <div className="relative flex min-h-[44px] min-w-0 flex-1 items-center sm:max-w-md">
          <Search
            className="pointer-events-none absolute left-3 h-4 w-4 text-slate-500"
            aria-hidden
          />
          <label htmlFor="global-search" className="sr-only">
            Search transactions
          </label>
          <input
            id="global-search"
            type="search"
            placeholder="Search transactions, merchants…"
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.08] py-2.5 pl-9 pr-3 text-sm text-slate-100 shadow-[0_12px_28px_-16px_rgba(0,0,0,0.55)] ring-1 ring-inset ring-white/[0.04] backdrop-blur-md placeholder:text-slate-500 outline-none transition focus:border-cyan-400/35 focus:ring-2 focus:ring-cyan-400/25 sm:max-w-md [&::-webkit-search-cancel-button]:appearance-none"
            disabled
          />
        </div>
        <div className="flex shrink-0 items-center justify-end gap-2 sm:justify-start">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.08] text-slate-300 shadow-[0_12px_28px_-16px_rgba(0,0,0,0.55)] ring-1 ring-inset ring-white/[0.04] backdrop-blur-md transition hover:border-white/[0.12] hover:bg-white/[0.1] hover:text-white sm:h-10 sm:w-10"
            aria-label="Notifications"
            disabled
          >
            <Bell className="h-4 w-4" />
          </button>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 text-xs font-semibold text-charcoal-950 shadow-[0_14px_28px_-8px_rgba(34,211,238,0.45)] ring-2 ring-white/10 sm:h-10 sm:w-10">
            You
          </div>
        </div>
      </div>
    </header>
  );
}
