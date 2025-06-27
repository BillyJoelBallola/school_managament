import { getBigCalendarData } from "@/actions/lesson.actions";
import { adjustScheduleToCurrentWeek } from "@/lib/settings";
import BigCalendar from "@/components/BigCalendar";

async function BigCalendarContainer({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) {
  const dataResponse = await getBigCalendarData({ type, id });

  const data = dataResponse.map((lesson) => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }));

  const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <div className="h-full">
      <BigCalendar schedule={schedule} />
    </div>
  );
}

export default BigCalendarContainer;
