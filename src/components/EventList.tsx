import { getEventByDate } from "@/actions/event.actions";

async function EventList({ dateParam }: { dateParam: string | undefined }) {
  const date = dateParam ? new Date(dateParam) : new Date();

  const events = await getEventByDate(date);

  return (
    <div className="grid gap-4 px-4">
      {events.length !== 0 ? (
        events.map((event) => (
          <div
            key={event.id}
            className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-md border-t-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-sm">{event.title}</h2>
              <span className="text-xs text-muted-foreground">
                {event.startTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>
            <p className="text-sm">{event.description}</p>
          </div>
        ))
      ) : (
        <p className="text-xs text-muted-foreground px-2">
          There is no event for this day.
        </p>
      )}
    </div>
  );
}

export default EventList;
