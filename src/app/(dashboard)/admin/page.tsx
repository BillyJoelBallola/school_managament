import Announcements from "@/components/Announcements";
import AttendanceChartContainer from "@/components/charts/AttendanceChartContainer";
import CountChartContainer from "@/components/charts/CountChartContainer";
import FinanceChart from "@/components/charts/FinanceChart";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import UserCard from "@/components/UserCard";

function AdminPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <div className="w-full xl:w-2/3 flex flex-col gap-8">
        <div className="flex flex-wrap gap-4 justify-between">
          <UserCard type={"admin"} />
          <UserCard type={"teacher"} />
          <UserCard type={"parent"} />
          <UserCard type={"student"} />
        </div>
        <div className="flex gap-4 flex-col xl:flex-row">
          <div className="w-full xl:w-1/3 lg:h-sm">
            <CountChartContainer />
          </div>
          <div className="w-full xl:w-2/3 lg:h-sm">
            <AttendanceChartContainer />
          </div>
        </div>
        <div className="w-full h-xl">
          <FinanceChart />
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements />
      </div>
    </div>
  );
}

export default AdminPage;
