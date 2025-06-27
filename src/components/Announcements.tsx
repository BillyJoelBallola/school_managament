import { getAnnouncementByRole } from "@/actions/announcement.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

async function Announcements() {
  const announcements = await getAnnouncementByRole();

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Recent Announcements</CardTitle>
        <Link
          href="/list/announcements"
          className="text-sm hover:underline text-muted-foreground"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {announcements.length !== 0 ? (
            announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-md border-t-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-sm">
                    {announcement.title}
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    {new Intl.DateTimeFormat("en-US").format(announcement.date)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {announcement.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-xs text-muted-foreground">
              No announcement found.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default Announcements;
