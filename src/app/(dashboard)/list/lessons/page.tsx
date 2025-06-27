import FormDialog from "@/components/FormDialog";
import TablePagination from "@/components/TablePagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Button } from "@/components/ui/button";

import { Class, Lesson, Subject, Teacher } from "@/generated/prisma";
import { getAllLesson } from "@/actions/lesson.actions";
import { ITEM_PER_PAGE } from "@/lib/config";
import { role } from "@/lib/settings";

import { ArrowDownWideNarrow, ListFilter } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lessons",
};

type LessonList = Lesson & { class: Class } & { teacher: Teacher } & {
  subject: Subject;
};

const columns = [
  { header: "Subject Name", accessor: "subject" },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  ...(role === "admin"
    ? [{ header: "Actions", accessor: "action", className: "w-[80px]" }]
    : []),
];

const renderRow = (item: LessonList) => (
  <tr
    key={item.id}
    className="border-b even:bg-white dark:even:bg-neutral-800/50 text-sm hover:bg-slate-100 dark:hover:bg-slate-800/20"
  >
    <td className="flex items-center gap-2 p-4">{item.subject.name}</td>
    <td>{item.class.name}</td>
    <td className="hidden md:table-cell">
      {item.teacher.name + " " + item.teacher.surname}
    </td>
    <td>
      <div className="flex items-center gap-1">
        {role === "admin" && (
          <>
            <FormDialog table="lesson" type="update" data={item} />
            <FormDialog table="lesson" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

async function LessonListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) {
  const { page, ...queryParams } = (await searchParams) ?? {};

  const pageNumber = page ? parseInt(page) : 1;

  const { lessons, count } = await getAllLesson(
    ITEM_PER_PAGE,
    ITEM_PER_PAGE * (pageNumber - 1),
    queryParams
  );

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg h-full">
      <div className="flex gap-4 items-center flex-col md:flex-row justify-between">
        <h1 className="text-xl font-semibold">All Lessons</h1>
        <div className="w-full md:w-md flex items-center gap-2">
          <TableSearch />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ListFilter />
            </Button>
            <Button variant="outline" size="icon">
              <ArrowDownWideNarrow />
            </Button>
            {role === "admin" && <FormDialog table="lesson" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={lessons} />
      <TablePagination pageNumber={pageNumber} count={count} />
    </div>
  );
}

export default LessonListPage;
