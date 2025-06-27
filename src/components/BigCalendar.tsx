"use client";

import { useState } from "react";

import { Calendar, dayjsLocalizer, View, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { adjustScheduleToCurrentWeek } from "@/lib/settings";
import dayjs from "dayjs";

const localizer = dayjsLocalizer(dayjs);

const BigCalendar = ({
  schedule,
}: {
  schedule: { title: string; start: Date; end: Date }[];
}) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <Calendar
      localizer={localizer}
      events={schedule}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "96%" }}
      onView={handleOnView}
      min={new Date(2025, 1, 0, 8, 0, 0)}
      max={new Date(2025, 1, 0, 17, 0, 0)}
    />
  );
};

export default BigCalendar;
