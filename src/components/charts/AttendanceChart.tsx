"use client";

import { Ellipsis, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

export const description = "A bar chart";

const chartData = [
  { day: "Mon", present: 50, absent: 0 },
  { day: "Tue", present: 47, absent: 3 },
  { day: "Wed", present: 49, absent: 1 },
  { day: "Thu", present: 45, absent: 5 },
  { day: "Fri", present: 47, absent: 3 },
];

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

function AttendanceChart() {
  return (
    <Card className="h-full w-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Attendance</CardTitle>
        <Button variant="ghost" size="icon">
          <Ellipsis />
        </Button>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer barSize={20} data={chartData}>
            <CartesianGrid vertical={false} />
            <YAxis axisLine={false} tickLine={false} tickMargin={20} />
            <XAxis
              dataKey="day"
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
      </CardContent>
    </Card>
  );
}

export default AttendanceChart;
