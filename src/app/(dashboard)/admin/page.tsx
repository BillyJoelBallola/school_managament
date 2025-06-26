import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/charts/AttendanceChart";
import CountChart from "@/components/charts/CountChart";
import FinanceChart from "@/components/charts/FinanceChart";
import EventCalendar from "@/components/EventCalendar";
import UserCard from "@/components/UserCard";

function AdminPage() {
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <div className="w-full xl:w-2/3 flex flex-col gap-8">
        <div className="flex flex-wrap gap-4 justify-between">
          {["student", "teacher", "parent", "staff"].map((type) => (
            <UserCard key={type} type={type} />
          ))}
        </div>
        <div className="flex gap-4 flex-col xl:flex-row">
          <div className="w-full xl:w-1/3 lg:h-sm">
            <CountChart />
          </div>
          <div className="w-full xl:w-2/3 lg:h-sm">
            <AttendanceChart />
          </div>
        </div>
        <div className="w-full h-xl">
          <FinanceChart />
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
}

export default AdminPage;
