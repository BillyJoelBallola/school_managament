import FormDialog from "@/components/FormDialog";
import TablePagination from "@/components/TablePagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Button } from "@/components/ui/button";

import { Announcement, Class } from "@/generated/prisma";
import { getAllAnnouncement } from "@/actions/announcement.actions";
import { ITEM_PER_PAGE } from "@/lib/config";

import { ArrowDownWideNarrow, ListFilter } from "lucide-react";
import { role } from "@/lib/settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Announcements",
};

type AnnouncementList = Announcement & { class: Class };

const columns = [
  { header: "Title", accessor: "title" },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  ...(role === "admin"
    ? [{ header: "Actions", accessor: "action", className: "w-[80px]" }]
    : []),
];

const renderRow = (item: AnnouncementList) => (
  <tr
    key={item.id}
    className="border-b even:bg-white dark:even:bg-neutral-800/50 text-sm hover:bg-slate-100 dark:hover:bg-slate-800/20"
  >
    <td className="flex items-center gap-2 p-4">{item.title}</td>
    <td>{item.class?.name ?? "-"}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.date)}
    </td>
    <td>
      <div className="flex items-center gap-1">
        {role === "admin" && (
          <>
            <FormDialog table="announcement" type="update" data={item} />
            <FormDialog table="announcement" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

async function AnnouncementListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) {
  const { page, ...queryParams } = (await searchParams) ?? {};

  const pageNumber = page ? parseInt(page) : 1;

  const { announcements, count } = await getAllAnnouncement(
    ITEM_PER_PAGE,
    ITEM_PER_PAGE * (pageNumber - 1),
    queryParams
  );

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg h-full">
      <div className="flex gap-4 items-center flex-col md:flex-row justify-between">
        <h1 className="text-xl font-semibold">All Announcements</h1>
        <div className="w-full md:w-md flex items-center gap-2">
          <TableSearch />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ListFilter />
            </Button>
            <Button variant="outline" size="icon">
              <ArrowDownWideNarrow />
            </Button>
            {role === "admin" && (
              <FormDialog table="announcement" type="create" />
            )}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={announcements} />
      <TablePagination pageNumber={pageNumber} count={count} />
    </div>
  );
}

export default AnnouncementListPage;
