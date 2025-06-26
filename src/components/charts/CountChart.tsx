"use client";

import { RadialBar, RadialBarChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A radial chart with a label";

const chartConfig = {
  boys: {
    label: "Boys",
  },
  total: {
    label: "Total",
  },
  girls: {
    label: "Girls",
  },
} satisfies ChartConfig;

function CountChart({
  boys,
  girls,
  total,
}: {
  boys: number;
  girls: number;
  total: number;
}) {
  const chartData = [
    { gender: "total", count: total, fill: "#fff" },
    { gender: "boys", count: boys, fill: "oklch(62.3% 0.214 259.815)" },
    { gender: "girls", count: girls, fill: "#fccee8" },
  ];

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <RadialBarChart data={chartData} innerRadius={40} outerRadius={"100%"}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="gender" />}
        />
        <RadialBar dataKey="count" background></RadialBar>
      </RadialBarChart>
    </ChartContainer>
  );
}

export default CountChart;
