"use client";

import { Ellipsis } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";

export const description = "A simple pie chart";

const chartData = [
  { name: "Group A", value: 92, fill: "var(--color-chrome)" },
  { name: "Group B", value: 8, fill: "var(--color-firefox)" },
];

const chartConfig = {
  name: {
    label: "Name",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

function PerformanceChart() {
  return (
    <Card className="flex flex-col relative">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Attendance</CardTitle>
        <Button variant="ghost" size="icon">
          <Ellipsis />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              startAngle={180}
              endAngle={0}
              cx="50%"
              cy="50%"
              innerRadius={70}
              label
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h2 className="text-3xl font-semibold">9.2</h2>
        <p className="text-xs text-muted-foreground">of 10 max LTS</p>
      </div>
      <div className="absolute font-medium left-0 right-0 bottom-16 text-center">
        1st Semester - 2nd Semester
      </div>
    </Card>
  );
}

export default PerformanceChart;
