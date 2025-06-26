"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart";

const chartConfig = {
  present: {
    label: "Present",
    color: "green",
  },
  absent: {
    label: "Absent",
    color: "red",
  },
} satisfies ChartConfig;

function AttendanceChart({
  data,
}: {
  data: { name: string; present: number; absent: number }[];
}) {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer barSize={20} data={data}>
        <CartesianGrid vertical={false} />
        <YAxis axisLine={false} tickLine={false} tickMargin={20} />
        <XAxis
          dataKey="name"
          tickLine={true}
          tickMargin={5}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="present" fill="oklch(69.6% 0.17 162.48)" radius={5} />
        <Bar dataKey="absent" fill="oklch(63.7% 0.237 25.331)" radius={5} />
      </BarChart>
    </ChartContainer>
  );
}

export default AttendanceChart;
