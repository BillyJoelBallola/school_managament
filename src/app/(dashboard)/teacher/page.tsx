import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { auth } from "@clerk/nextjs/server";

async function TeacherPage() {
  const { userId } = await auth();

  return (
    <div className="flex gap-4 flex-col md:flex-row h-full">
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="h-full p-4 bg-white dark:bg-neutral-900 rounded-md border shadow-sm">
          <h1 className="font-semibold">Schedule</h1>
          <BigCalendarContainer type="teacherId" id={userId!} />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
}

export default TeacherPage;
