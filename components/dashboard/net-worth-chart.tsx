"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  type ChartData,
  type ChartOptions,
  type TooltipItem,
} from "chart.js";
import type { ReactElement } from "react";
import { Line } from "react-chartjs-2";

import type { NetWorthPoint } from "@/types/finance";

ChartJS.register(
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
);

type NetWorthChartProps = Readonly<{
  data: NetWorthPoint[];
}>;

export function NetWorthChart({ data }: NetWorthChartProps): ReactElement {
  const labels = data.map((row) => row.label);

  const chartData: ChartData<"line"> = {
    datasets: [
      {
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (chartArea === undefined) {
            return "rgba(34, 211, 238, 0.15)";
          }
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );
          gradient.addColorStop(0, "rgba(34, 211, 238, 0.35)");
          gradient.addColorStop(1, "rgba(34, 211, 238, 0)");
          return gradient;
        },
        borderColor: "rgba(34, 211, 238, 0.95)",
        borderWidth: 2,
        data: data.map((row) => row.netWorthDollars),
        fill: true,
        pointBackgroundColor: "rgba(15, 23, 42, 1)",
        pointBorderColor: "rgba(34, 211, 238, 1)",
        pointBorderWidth: 2,
        pointHoverBackgroundColor: "rgba(34, 211, 238, 1)",
        pointHoverBorderColor: "rgba(255, 255, 255, 1)",
        pointRadius: 4,
        pointHoverRadius: 5,
        tension: 0.35,
      },
    ],
    labels,
  };

  const options: ChartOptions<"line"> = {
    layout: {
      padding: { bottom: 4, left: 2, right: 4, top: 4 },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(12, 18, 34, 0.96)",
        borderColor: "rgba(148, 163, 184, 0.25)",
        borderWidth: 1,
        callbacks: {
          label(context: TooltipItem<"line">) {
            const value = context.parsed.y;
            if (value === null) {
              return "";
            }
            const formatted = new Intl.NumberFormat("en-US", {
              currency: "USD",
              maximumFractionDigits: 0,
              style: "currency",
            }).format(value);
            return `Net worth: ${formatted}`;
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
        ticks: {
          autoSkip: true,
          color: "#94a3b8",
          font: { size: 10 },
          maxRotation: 0,
        },
      },
      y: {
        border: { display: false },
        grid: { color: "rgba(148, 163, 184, 0.12)" },
        ticks: {
          color: "#94a3b8",
          font: { size: 10 },
          callback: (value: string | number) => {
            if (typeof value === "number") {
              if (value >= 1_000_000) {
                return `$${(value / 1_000_000).toFixed(1)}M`;
              }
              if (value >= 1_000) {
                return `$${(value / 1_000).toFixed(0)}k`;
              }
              return `$${value}`;
            }
            return value;
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
