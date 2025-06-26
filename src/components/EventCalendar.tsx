"use client";

import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const tempEventData = [
  {
    id: 1,
    title: "Lorem, ipsum dolor.",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: 2,
    title: "Lorem, ipsum dolor.",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: 3,
    title: "Lorem, ipsum dolor.",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
];

function EventCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="rounded-md pt-1 flex flex-col h-fit">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="w-full bg-transparent"
        captionLayout="dropdown"
      />
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Recent Events</CardTitle>
        <Link
          href="/announcements"
          className="text-sm hover:underline text-muted-foreground"
        >
          View all
        </Link>
      </CardHeader>
      <div className="grid gap-4 px-4">
        {tempEventData.map((event) => (
          <div
            key={event.id}
            className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-md border-t-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-sm">{event.title}</h2>
              <span className="text-xs text-muted-foreground">
                {event.time}
              </span>
            </div>
            <p className="text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default EventCalendar;
