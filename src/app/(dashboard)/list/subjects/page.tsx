import FormContainer from "@/components/forms/FormContainer";
import TablePagination from "@/components/TablePagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Button } from "@/components/ui/button";

import { role } from "@/lib/settings";

import { ArrowDownWideNarrow, ListFilter } from "lucide-react";

import { Subject, Teacher } from "@/generated/prisma";
import { getAllSubject } from "@/actions/subject.actions";
import { ITEM_PER_PAGE } from "@/lib/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subjects",
};

type SubjectList = Subject & { teachers: Teacher[] };

const columns = [
  { header: "Subject Name", accessor: "subject" },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  { header: "Actions", accessor: "action", className: "w-[80px]" },
];

const renderRow = (item: SubjectList) => (
  <tr
    key={item.id}
    className="border-b even:bg-white dark:even:bg-neutral-800/50 text-sm hover:bg-slate-100 dark:hover:bg-slate-800/20"
  >
    <td className="flex items-center gap-2 p-4">{item.name}</td>
    <td className="hidden md:table-cell">
      {item.teachers.map((item) => item.name).join(", ")}
    </td>
    <td>
      <div className="flex items-center gap-1">
        {role === "admin" && (
          <>
            <FormContainer table="subject" type="update" data={item} />
            <FormContainer table="subject" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

async function SubjectListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) {
  const { page, ...queryParams } = (await searchParams) ?? {};

  const pageNumber = page ? parseInt(page) : 1;

  const { subjects, count } = await getAllSubject(
    ITEM_PER_PAGE,
    ITEM_PER_PAGE * (pageNumber - 1),
    queryParams
  );

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg h-full">
      <div className="flex gap-4 items-center flex-col md:flex-row justify-between">
        <h1 className="text-xl font-semibold">All Subjects</h1>
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
              <FormContainer table="subject" type="create" />
            )}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={subjects} />
      <TablePagination pageNumber={pageNumber} count={count} />
    </div>
  );
}

export default SubjectListPage;
