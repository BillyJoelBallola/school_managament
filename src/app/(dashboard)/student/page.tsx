import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

async function StudentPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { userId } = await auth();

  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: userId! } },
    },
  });

  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="h-full p-4 bg-white dark:bg-neutral-900 rounded-md border shadow-sm">
          <h1 className="font-semibold">Schedule (4A)</h1>
          <BigCalendarContainer type="classId" id={classItem[0].id} />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-8">
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements />
      </div>
    </div>
  );
}

export default StudentPage;
