import type { ReactElement, ReactNode } from "react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return <DashboardShell>{children}</DashboardShell>;
}
