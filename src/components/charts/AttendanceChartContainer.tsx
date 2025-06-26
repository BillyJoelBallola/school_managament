import { Ellipsis } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AttendanceChart from "@/components/charts/AttendanceChart";
import { Button } from "@/components/ui/button";

import { getAttendanceForThisWeek } from "@/actions/dashboard.actions";

async function AttendanceChartContainer() {
  const attendanceData = await getAttendanceForThisWeek();

  return (
    <Card className="h-full w-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Attendance</CardTitle>
        <Button variant="ghost" size="icon">
          <Ellipsis />
        </Button>
      </CardHeader>
      <CardContent>
        <AttendanceChart data={attendanceData} />
      </CardContent>
    </Card>
  );
}

export default AttendanceChartContainer;
