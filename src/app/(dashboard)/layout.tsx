import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-dvh flex">
      <div className="w-auto xl:w-[250px] p-4 border-r">
        <Menu />
      </div>
      <div className="w-full overflow-y-scroll flex flex-col">
        <Navbar />
        <div className="px-4 pb-4 flex-1">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
