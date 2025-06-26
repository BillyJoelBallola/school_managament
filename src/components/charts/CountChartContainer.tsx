import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CountChart from "@/components/charts/CountChart";
import { Ellipsis } from "lucide-react";

import { getStudentGenderCount } from "@/actions/dashboard.actions";

async function CountChartContainer() {
  const count = await getStudentGenderCount();

  return (
    <Card className="h-full w-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Students</CardTitle>
        <Button variant="ghost" size="icon">
          <Ellipsis />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <CountChart boys={count.boys} girls={count.girls} total={count.total} />
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-16 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="size-4 bg-blue-500 rounded-full" />
          <span className="font-bold">{count.boys}</span>
          <span className="text-xs text-muted-foreground">
            Boys ({Math.round((count.boys / count.total) * 100)}%)
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="size-4 bg-pink-200 rounded-full" />
          <span className="font-bold">{count.girls}</span>
          <span className="text-xs text-muted-foreground">
            Girls ({Math.round((count.girls / count.total) * 100)}
            %)
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CountChartContainer;
