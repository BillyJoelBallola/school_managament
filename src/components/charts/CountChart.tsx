"use client";
import { Ellipsis } from "lucide-react";
import { RadialBar, RadialBarChart } from "recharts";
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

export const description = "A radial chart with a label";

const chartData = [
  { gender: "total", count: 106, fill: "#fff" },
  { gender: "boys", count: 53, fill: "oklch(62.3% 0.214 259.815)" },
  { gender: "girls", count: 53, fill: "#fccee8" },
];
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

function CountChart() {
  return (
    <Card className="h-full w-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Students</CardTitle>
        <Button variant="ghost" size="icon">
          <Ellipsis />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            innerRadius={40}
            outerRadius={"100%"}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="gender" />}
            />
            <RadialBar dataKey="count" background></RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-16 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="size-4 bg-blue-500 rounded-full" />
          <span className="font-bold">1,234</span>
          <span className="text-xs text-muted-foreground">Boys (55%)</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="size-4 bg-pink-200 rounded-full" />
          <span className="font-bold">1,234</span>
          <span className="text-xs text-muted-foreground">Girls (55%)</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CountChart;
