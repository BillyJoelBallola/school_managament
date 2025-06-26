import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ellipsis } from "lucide-react";
import Link from "next/link";

const tempAnnouncementData = [
  {
    id: 1,
    title: "Lorem, ipsum dolor.",
    date: "2025/6/9",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: 2,
    title: "Lorem, ipsum dolor.",
    date: "2025/6/9",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: 3,
    title: "Lorem, ipsum dolor.",
    date: "2025/6/9",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
];

function Announcements() {
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
          {tempAnnouncementData.map((announcement) => (
            <div
              key={announcement.id}
              className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-800 p-4 rounded-md"
            >
              <h2 className="font-semibold text-sm">{announcement.title}</h2>
              <span className="text-xs text-muted-foreground">
                {announcement.date}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Announcements;
