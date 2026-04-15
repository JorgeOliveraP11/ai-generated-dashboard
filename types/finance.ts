export type CurrencyCode = "USD";

export type MoneyCents = number;

export type FinanceSummary = {
  currency: CurrencyCode;
  currentNetWorthCents: MoneyCents;
  monthToDateSpend: MoneyCents;
  monthToDateIncome: MoneyCents;
  savingsRatePercent: number;
};

export type MonthlySpendingRow = {
  label: string;
  discretionary: number;
  food: number;
  housing: number;
  transport: number;
};

export type NetWorthPoint = {
  label: string;
  netWorthDollars: number;
};
