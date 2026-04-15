import type { ReactElement, ReactNode } from "react";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardMobileNav } from "@/components/dashboard/dashboard-mobile-nav";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

type DashboardShellProps = Readonly<{
  children: ReactNode;
}>;

export function DashboardShell({
  children,
}: DashboardShellProps): ReactElement {
  return (
    <div className="dashboard-bg flex min-h-screen text-slate-100 supports-[min-height:100dvh]:min-h-[100dvh]">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader />
        <main className="relative flex-1 overflow-x-hidden overflow-y-auto px-4 py-6 pb-24 sm:px-6 sm:py-8 sm:pb-24 lg:px-10 lg:pb-8">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-950/20 via-transparent to-transparent" />
          <div className="relative mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
      <DashboardMobileNav />
    </div>
  );
}
