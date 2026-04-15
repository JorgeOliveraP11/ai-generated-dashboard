"use server";

import { mockTransactionsSorted } from "@/lib/mockData";
import {
  buildSpendingInsights,
  type SpendingInsightsReport,
} from "@/lib/spending-insights";

export async function loadSpendingInsights(): Promise<SpendingInsightsReport> {
  return buildSpendingInsights(mockTransactionsSorted);
}
