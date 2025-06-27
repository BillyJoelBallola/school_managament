import FormDialog from "@/components/FormDialog";
import TablePagination from "@/components/TablePagination";
import TableSearch from "@/components/TableSearch";
import { Button } from "@/components/ui/button";
import Table from "@/components/Table";

import { Assignment, Class, Subject, Teacher } from "@/generated/prisma";
import { getAllAssignment } from "@/actions/assignment.actions";
import { ITEM_PER_PAGE } from "@/lib/config";

import { ArrowDownWideNarrow, ListFilter } from "lucide-react";
import { role } from "@/lib/settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assignments",
};

type AssignmentList = Assignment & {
  lesson: { subject: Subject; class: Class; teacher: Teacher };
};

const columns = [
  { header: "Subject", accessor: "subject" },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Due Date",
    accessor: "dueDate",
  },
  ...(role === "admin" || role === "teacher"
    ? [{ header: "Actions", accessor: "action", className: "w-[80px]" }]
    : []),
];

const renderRow = (item: AssignmentList) => (
  <tr
    key={item.id}
    className="border-b even:bg-white dark:even:bg-neutral-800/50 text-sm hover:bg-slate-100 dark:hover:bg-slate-800/20"
  >
    <td className="flex items-center gap-2 p-4">{item.lesson.subject.name}</td>
    <td>{item.lesson.class.name}</td>
    <td className="hidden md:table-cell">
      {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
    </td>
    <td>{new Intl.DateTimeFormat("en-US").format(item.dueDate)}</td>
    <td>
      <div className="flex items-center gap-1">
        {(role === "admin" || role === "teacher") && (
          <>
            <FormDialog table="assignment" type="update" data={item} />
            <FormDialog table="assignment" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

async function AssignmentListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) {
  const { page, ...queryParams } = (await searchParams) ?? {};

  const pageNumber = page ? parseInt(page) : 1;

  const { assignments, count } = await getAllAssignment(
    ITEM_PER_PAGE,
    ITEM_PER_PAGE * (pageNumber - 1),
    queryParams
  );

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg h-full">
      <div className="flex gap-4 items-center flex-col md:flex-row justify-between">
        <h1 className="text-xl font-semibold">All Assignments</h1>
        <div className="w-full md:w-md flex items-center gap-2">
          <TableSearch />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ListFilter />
            </Button>
            <Button variant="outline" size="icon">
              <ArrowDownWideNarrow />
            </Button>
            {(role === "admin" || role === "teacher") && (
              <FormDialog table="assignment" type="create" />
            )}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={assignments} />
      <TablePagination pageNumber={pageNumber} count={count} />
    </div>
  );
}

export default AssignmentListPage;
