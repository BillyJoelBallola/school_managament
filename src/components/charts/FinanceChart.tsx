"use client";

import { Ellipsis } from "lucide-react";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Dot,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
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

export const description = "A multiple line chart";

const chartData = [
  { month: "Jan", income: 186, expense: 80 },
  { month: "Feb", income: 305, expense: 200 },
  { month: "Mar", income: 237, expense: 120 },
  { month: "Apr", income: 73, expense: 190 },
  { month: "May", income: 209, expense: 130 },
  { month: "Jun", income: 214, expense: 140 },
  { month: "Jul", income: 214, expense: 140 },
  { month: "Aug", income: 214, expense: 140 },
  { month: "Sep", income: 214, expense: 140 },
  { month: "Oct", income: 214, expense: 140 },
  { month: "Nov", income: 214, expense: 140 },
  { month: "Dec", income: 214, expense: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

function FinanceChart() {
  return (
    <Card className="h-full w-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Finance</CardTitle>
        <Button variant="ghost" size="icon">
          <Ellipsis />
        </Button>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis tickLine={false} axisLine={false} tickMargin={20} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Legend
              align="center"
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: "30px" }}
            />
            <Line
              dataKey="income"
              type="monotone"
              stroke="oklch(69.6% 0.17 162.48)"
              strokeWidth={2}
              dot={({ payload, ...props }) => {
                return (
                  <Dot
                    key={payload.month}
                    r={5}
                    cx={props.cx}
                    cy={props.cy}
                    fill={"oklch(69.6% 0.17 162.48)"}
                  />
                );
              }}
            />
            <Line
              dataKey="expense"
              type="monotone"
              stroke="oklch(63.7% 0.237 25.331)"
              strokeWidth={2}
              dot={({ payload, ...props }) => {
                return (
                  <Dot
                    key={payload.month}
                    r={5}
                    cx={props.cx}
                    cy={props.cy}
                    fill={"oklch(63.7% 0.237 25.331)"}
                  />
                );
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default FinanceChart;
