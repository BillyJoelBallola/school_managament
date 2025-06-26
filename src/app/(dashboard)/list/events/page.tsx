import FormDialog from "@/components/FormDialog";
import TablePagination from "@/components/TablePagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Button } from "@/components/ui/button";

import { getAllEvent } from "@/actions/event.actions";
import { Class, Event, Prisma } from "@/generated/prisma";
import { ITEM_PER_PAGE } from "@/lib/config";
import { currentUserId, role } from "@/lib/settings";

import { ArrowDownWideNarrow, ListFilter } from "lucide-react";

type EventList = Event & { class: Class };

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
  {
    header: "Start Time",
    accessor: "startTime",
    className: "hidden md:table-cell",
  },
  {
    header: "End Time",
    accessor: "endTime",
    className: "hidden md:table-cell",
  },
  ...(role === "admin"
    ? [{ header: "Actions", accessor: "action", className: "w-[80px]" }]
    : []),
];

const renderRow = (item: EventList) => (
  <tr
    key={item.id}
    className="border-b even:bg-white dark:even:bg-neutral-800/50 text-sm hover:bg-slate-100 dark:hover:bg-slate-800/20"
  >
    <td className="flex items-center gap-2 p-4">{item.title}</td>
    <td>{item.class?.name ?? "-"}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.startTime)}
    </td>
    <td className="hidden md:table-cell">
      {item.startTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}
    </td>
    <td className="hidden md:table-cell">
      {item.endTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}
    </td>
    <td>
      <div className="flex items-center gap-1">
        {role === "admin" && (
          <>
            <FormDialog table="event" type="update" data={item} />
            <FormDialog table="event" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

async function EventListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) {
  const { page, ...queryParams } = (await searchParams) ?? {};

  const pageNumber = page ? parseInt(page) : 1;

  const query: Prisma.EventWhereInput = {};

  const roleCondition = {
    teacher: { lessons: { some: { teacherId: currentUserId! } } },
    student: { students: { some: { id: currentUserId! } } },
    parent: { students: { some: { parentId: currentUserId! } } },
  };

  query.OR = [
    { classId: null },
    { class: roleCondition[role as keyof typeof roleCondition] || {} },
    ...(role === "admin" ? [{ classId: { not: null } }] : []),
  ];

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.title = value;
            break;
        }
      }
    }
  }

  const { events, count } = await getAllEvent(
    ITEM_PER_PAGE,
    ITEM_PER_PAGE * (pageNumber - 1),
    query
  );

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg h-full">
      <div className="flex gap-4 items-center flex-col md:flex-row justify-between">
        <h1 className="text-xl font-semibold">All Events</h1>
        <div className="w-full md:w-md flex items-center gap-2">
          <TableSearch />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ListFilter />
            </Button>
            <Button variant="outline" size="icon">
              <ArrowDownWideNarrow />
            </Button>
            {role === "admin" && <FormDialog table="event" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={events} />
      <TablePagination pageNumber={pageNumber} count={count} />
    </div>
  );
}

export default EventListPage;
