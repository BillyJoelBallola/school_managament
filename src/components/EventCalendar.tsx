"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";

function EventCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const router = useRouter();

  useEffect(() => {
    if (date instanceof Date) {
      router.push(`?date=${date}`);
    }
  }, [date, router]);

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="w-full bg-transparent"
      captionLayout="dropdown"
    />
  );
}

export default EventCalendar;
