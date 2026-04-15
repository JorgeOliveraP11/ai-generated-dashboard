import type {
  FinanceSummary,
  MonthlySpendingRow,
  NetWorthPoint,
} from "@/types/finance";

export const mockSummary: FinanceSummary = {
  currency: "USD",
  currentNetWorthCents: 127_450_00,
  monthToDateIncome: 6_200_00,
  monthToDateSpend: 3_450_00,
  savingsRatePercent: 22,
};

export const mockNetWorthHistory: NetWorthPoint[] = [
  { label: "Sep", netWorthDollars: 108_400 },
  { label: "Oct", netWorthDollars: 111_200 },
  { label: "Nov", netWorthDollars: 114_050 },
  { label: "Dec", netWorthDollars: 117_800 },
  { label: "Jan", netWorthDollars: 120_150 },
  { label: "Feb", netWorthDollars: 122_600 },
  { label: "Mar", netWorthDollars: 124_900 },
  { label: "Apr", netWorthDollars: 127_450 },
];

export const mockMonthlySpending: MonthlySpendingRow[] = [
  {
    label: "Nov",
    housing: 1_800,
    food: 520,
    transport: 280,
    discretionary: 410,
  },
  {
    label: "Dec",
    housing: 1_800,
    food: 610,
    transport: 300,
    discretionary: 520,
  },
  {
    label: "Jan",
    housing: 1_820,
    food: 540,
    transport: 290,
    discretionary: 480,
  },
  {
    label: "Feb",
    housing: 1_820,
    food: 580,
    transport: 310,
    discretionary: 430,
  },
  {
    label: "Mar",
    housing: 1_850,
    food: 560,
    transport: 295,
    discretionary: 505,
  },
  {
    label: "Apr",
    housing: 1_850,
    food: 590,
    transport: 305,
    discretionary: 470,
  },
];
