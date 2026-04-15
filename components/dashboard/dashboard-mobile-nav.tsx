import Link from "next/link";
import type { ReactElement } from "react";

import { dashboardNavItems } from "@/components/dashboard/nav-config";
import { cn } from "@/lib/utils";

const navItemClass = (disabled: boolean | undefined): string =>
  cn(
    "flex min-h-[48px] w-full max-w-[4.5rem] flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 text-[10px] font-medium leading-tight transition-colors sm:max-w-[5.5rem]",
    disabled
      ? "cursor-not-allowed text-slate-600"
      : "text-slate-300 active:bg-white/[0.1] active:text-white",
  );

export function DashboardMobileNav(): ReactElement {
  return (
    <nav
      className="glass-frost fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.1] px-1 pt-1 shadow-[0_-12px_40px_-8px_rgba(0,0,0,0.55)] lg:hidden"
      style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
      aria-label="Primary mobile navigation"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between gap-0.5 pb-1 sm:justify-around sm:gap-1">
        {dashboardNavItems.map((item) => {
          const Icon = item.icon;
          const inner = (
            <>
              <Icon className="h-5 w-5 shrink-0 sm:h-5" aria-hidden />
              <span className="w-full truncate text-center">{item.label}</span>
            </>
          );

          if (item.disabled) {
            return (
              <li
                key={item.href}
                className="flex min-w-0 flex-1 justify-center"
                aria-disabled="true"
              >
                <span className={navItemClass(true)}>{inner}</span>
              </li>
            );
          }

          return (
            <li key={item.href} className="flex min-w-0 flex-1 justify-center">
              <Link
                href={item.href}
                className={cn(
                  navItemClass(false),
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/60",
                )}
              >
                {inner}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
