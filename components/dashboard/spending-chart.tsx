"use client";

import {
  BarElement,
  BarController,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  type ChartData,
  type ChartOptions,
  type TooltipItem,
} from "chart.js";
import type { ReactElement } from "react";
import { Bar } from "react-chartjs-2";

import type { MonthlySpendingRow } from "@/types/finance";

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Tooltip,
);

type SpendingChartProps = Readonly<{
  data: MonthlySpendingRow[];
}>;

export function SpendingChart({ data }: SpendingChartProps): ReactElement {
  const labels = data.map((row) => row.label);

  const chartData: ChartData<"bar"> = {
    datasets: [
      {
        backgroundColor: "rgba(45, 212, 191, 0.5)",
        borderColor: "rgba(13, 148, 136, 0.95)",
        borderWidth: 1,
        data: data.map((row) => row.housing),
        label: "Housing",
      },
      {
        backgroundColor: "rgba(56, 189, 248, 0.5)",
        borderColor: "rgba(14, 165, 233, 0.95)",
        borderWidth: 1,
        data: data.map((row) => row.food),
        label: "Food",
      },
      {
        backgroundColor: "rgba(129, 140, 248, 0.5)",
        borderColor: "rgba(99, 102, 241, 0.95)",
        borderWidth: 1,
        data: data.map((row) => row.transport),
        label: "Transport",
      },
      {
        backgroundColor: "rgba(251, 191, 36, 0.48)",
        borderColor: "rgba(245, 158, 11, 0.95)",
        borderWidth: 1,
        data: data.map((row) => row.discretionary),
        label: "Discretionary",
      },
    ],
    labels,
  };

  const options: ChartOptions<"bar"> = {
    layout: {
      padding: { bottom: 4, left: 2, right: 2, top: 2 },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          boxWidth: 8,
          color: "#cbd5f5",
          font: { size: 10 },
          padding: 10,
        },
        position: "bottom",
      },
      tooltip: {
        backgroundColor: "rgba(10, 16, 30, 0.96)",
        borderColor: "rgba(148, 163, 184, 0.22)",
        borderWidth: 1,
        callbacks: {
          label(context: TooltipItem<"bar">) {
            const value = context.parsed.y;
            if (value === null) {
              return `${context.dataset.label ?? ""}`;
            }
            const formatted = new Intl.NumberFormat("en-US", {
              currency: "USD",
              style: "currency",
            }).format(value);
            return `${context.dataset.label ?? ""}: ${formatted}`;
          },
        },
        bodyColor: "#e2e8f0",
        titleColor: "#f8fafc",
      },
    },
    responsive: true,
    scales: {
      x: {
        grid: { color: "rgba(148, 163, 184, 0.12)" },
        stacked: true,
        ticks: {
          autoSkip: true,
          color: "#94a3b8",
          font: { size: 10 },
          maxRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        border: { display: false },
        grid: { color: "rgba(148, 163, 184, 0.12)" },
        stacked: true,
        ticks: {
          color: "#94a3b8",
          font: { size: 10 },
          callback: (value: string | number) => {
            if (typeof value === "number") {
              return `$${value}`;
            }
            return value;
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
