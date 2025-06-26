import FormDialog from "@/components/FormDialog";
import TablePagination from "@/components/TablePagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Button } from "@/components/ui/button";

import { Parent, Prisma, Student } from "@/generated/prisma";
import { getAllParent } from "@/actions/parent.actions";
import { ITEM_PER_PAGE } from "@/lib/config";
import { role } from "@/lib/settings";

import { ArrowDownWideNarrow, ListFilter } from "lucide-react";

type ParentList = Parent & { students: Student[] };

const columns = [
  { header: "Info", accessor: "info" },
  {
    header: "Student Name",
    accessor: "students",
    className: "hidden md:table-cell",
  },
  { header: "Phone", accessor: "phone", className: "hidden md:table-cell" },
  { header: "Address", accessor: "address", className: "hidden md:table-cell" },
  ...(role === "admin"
    ? [{ header: "Actions", accessor: "action", className: "w-[80px]" }]
    : []),
];

const renderRow = (item: ParentList) => (
  <tr
    key={item.id}
    className="border-b even:bg-white dark:even:bg-neutral-800/50 text-sm hover:bg-slate-100 dark:hover:bg-slate-800/20"
  >
    <td className="flex items-center gap-2 p-4">
      <div className="grid">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-muted-foreground">{item?.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">
      {item.students.map((item) => item.name).join(", ")}
    </td>
    <td className="hidden md:table-cell">{item.phone}</td>
    <td className="hidden md:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-1">
        {role === "admin" && (
          <>
            <FormDialog table="parent" type="update" data={item} />
            <FormDialog table="parent" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

async function ParentListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) {
  const { page, ...queryParams } = (await searchParams) ?? {};

  const pageNumber = page ? parseInt(page) : 1;

  const query: Prisma.ParentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
        }
      }
    }
  }

  const { parents, count } = await getAllParent(
    ITEM_PER_PAGE,
    ITEM_PER_PAGE * (pageNumber - 1),
    query
  );

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg h-full">
      <div className="flex gap-4 items-center flex-col md:flex-row justify-between">
        <h1 className="text-xl font-semibold">All Parents</h1>
        <div className="w-full md:w-md flex items-center gap-2">
          <TableSearch />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ListFilter />
            </Button>
            <Button variant="outline" size="icon">
              <ArrowDownWideNarrow />
            </Button>
            {role === "admin" && <FormDialog table="parent" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={parents} />
      <TablePagination pageNumber={pageNumber} count={count} />
    </div>
  );
}

export default ParentListPage;
