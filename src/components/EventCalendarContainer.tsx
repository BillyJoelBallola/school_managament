import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import EventCalendar from "@/components/EventCalendar";
import EventList from "@/components/EventList";

async function EventCalendarContainer({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { date } = (await searchParams) ?? {};

  return (
    <Card className="rounded-md pt-1 flex flex-col h-fit">
      <EventCalendar />
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Events</CardTitle>
        <Link
          href="/announcements"
          className="text-sm hover:underline text-muted-foreground"
        >
          View all
        </Link>
      </CardHeader>
      <EventList dateParam={date} />
    </Card>
  );
}

export default EventCalendarContainer;
