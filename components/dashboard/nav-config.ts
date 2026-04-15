import {
  CreditCard,
  LayoutDashboard,
  PiggyBank,
  ReceiptText,
  Target,
  type LucideIcon,
} from "lucide-react";

export type DashboardNavItem = Readonly<{
  disabled?: boolean;
  href: string;
  icon: LucideIcon;
  label: string;
}>;

export const dashboardNavItems: DashboardNavItem[] = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  {
    disabled: true,
    href: "/dashboard/transactions",
    icon: ReceiptText,
    label: "Transactions",
  },
  {
    disabled: true,
    href: "/dashboard/budgets",
    icon: PiggyBank,
    label: "Budgets",
  },
  {
    disabled: true,
    href: "/dashboard/accounts",
    icon: CreditCard,
    label: "Accounts",
  },
  {
    disabled: true,
    href: "/dashboard/goals",
    icon: Target,
    label: "Goals",
  },
];
