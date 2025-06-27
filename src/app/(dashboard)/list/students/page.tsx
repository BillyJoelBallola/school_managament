import FormDialog from "@/components/FormDialog";
import TablePagination from "@/components/TablePagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Button } from "@/components/ui/button";

import { role } from "@/lib/settings";
import { ITEM_PER_PAGE } from "@/lib/config";
import { Class, Student } from "@/generated/prisma";
import { getAllStudent } from "@/actions/student.actions";

import { ArrowDownWideNarrow, ExternalLink, ListFilter } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Students",
};

const columns = [
  { header: "Info", accessor: "info" },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  { header: "Phone", accessor: "phone", className: "hidden md:table-cell" },
  { header: "Address", accessor: "address", className: "hidden md:table-cell" },
  ...(role === "admin" || role === "teacher"
    ? [{ header: "Actions", accessor: "action", className: "w-[80px]" }]
    : []),
];

type StudentList = Student & { class: Class };

const renderRow = (item: StudentList) => (
  <tr
    key={item.id}
    className="border-b even:bg-white dark:even:bg-neutral-800/50 text-sm hover:bg-slate-100 dark:hover:bg-slate-800/20"
  >
    <td className="flex items-center gap-2 p-4">
      <Image
        src={item.img || "/noAvatar.png"}
        alt="image"
        width={30}
        height={30}
        className="md:hidden xl:block size-10 rounded-full object-cover"
      />
      <div className="grid">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-muted-foreground">{item.class.name}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.username}</td>
    <td className="hidden md:table-cell">{item.class.name[0]}</td>
    <td className="hidden md:table-cell">{item.phone}</td>
    <td className="hidden md:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/list/students/${item.id}`}>
            <ExternalLink className="size-3" />
          </Link>
        </Button>
        {role === "admin" && (
          <FormDialog table="student" type="delete" id={item.id} />
        )}
      </div>
    </td>
  </tr>
);

async function StudentListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) {
  const { page, ...queryParams } = (await searchParams) ?? {};

  const pageNumber = page ? parseInt(page) : 1;

  const { students, count } = await getAllStudent(
    ITEM_PER_PAGE,
    ITEM_PER_PAGE * (pageNumber - 1),
    queryParams
  );

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg h-full">
      <div className="flex gap-4 items-center flex-col md:flex-row justify-between">
        <h1 className="text-xl font-semibold">All Students</h1>
        <div className="w-full md:w-md flex items-center gap-2">
          <TableSearch />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ListFilter />
            </Button>
            <Button variant="outline" size="icon">
              <ArrowDownWideNarrow />
            </Button>
            {role === "admin" && <FormDialog table="student" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={students} />
      <TablePagination pageNumber={pageNumber} count={count} />
    </div>
  );
}

export default StudentListPage;
