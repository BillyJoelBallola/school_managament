import TablePagination from "@/components/TablePagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Button } from "@/components/ui/button";

import { getAllExam } from "@/actions/exam.action";
import { Class, Exam, Subject, Teacher } from "@/generated/prisma";
import { ITEM_PER_PAGE } from "@/lib/config";
import { role } from "@/lib/settings";

import { ArrowDownWideNarrow, ListFilter } from "lucide-react";
import { Metadata } from "next";
import FormContainer from "@/components/forms/FormContainer";

export const metadata: Metadata = {
  title: "Exams",
};

type ExamList = Exam & {
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
    header: "Date",
    accessor: "date",
  },
  ...(role === "admin" || role === "teacher"
    ? [{ header: "Actions", accessor: "action", className: "w-[80px]" }]
    : []),
];

const renderRow = (item: ExamList) => (
  <tr
    key={item.id}
    className="border-b even:bg-white dark:even:bg-neutral-800/50 text-sm hover:bg-slate-100 dark:hover:bg-slate-800/20"
  >
    <td className="flex items-center gap-2 p-4">{item.lesson.subject.name}</td>
    <td>{item.lesson.class.name}</td>
    <td className="hidden md:table-cell">
      {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
    </td>
    <td>{new Intl.DateTimeFormat("en-US").format(item.date)}</td>
    <td>
      <div className="flex items-center gap-1">
        {(role === "admin" || role === "teacher") && (
          <>
            <FormContainer table="exam" type="update" data={item} />
            <FormContainer table="exam" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

async function ExamListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) {
  const { page, ...queryParams } = (await searchParams) ?? {};

  const pageNumber = page ? parseInt(page) : 1;

  const { exams, count } = await getAllExam(
    ITEM_PER_PAGE,
    ITEM_PER_PAGE * (pageNumber - 1),
    queryParams
  );

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg h-full">
      <div className="flex gap-4 items-center flex-col md:flex-row justify-between">
        <h1 className="text-xl font-semibold">All Exams</h1>
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
              <FormContainer table="exam" type="create" />
            )}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={exams} />
      <TablePagination pageNumber={pageNumber} count={count} />
    </div>
  );
}

export default ExamListPage;
