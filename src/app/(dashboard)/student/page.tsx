import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import EventCalendar from "@/components/EventCalendar";

function StudentPage() {
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="h-full p-4 bg-white dark:bg-neutral-900 rounded-md border shadow-sm">
          <h1 className="font-semibold">Schedule (4A)</h1>
          <BigCalendar />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
}

export default StudentPage;
