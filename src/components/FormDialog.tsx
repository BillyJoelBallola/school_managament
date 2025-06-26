"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateUpdateFormType, IFormDialog } from "@/lib/types";
import { Pencil, Plus, SquarePen, Trash } from "lucide-react";
import dynamic from "next/dynamic";

const TeacherForm = dynamic(() => import("@/components/forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});

const StudentForm = dynamic(() => import("@/components/forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});

const ParentForm = dynamic(() => import("@/components/forms/ParentForm"), {
  loading: () => <h1>Loading...</h1>,
});

const SubjectForm = dynamic(() => import("@/components/forms/SubjectForm"), {
  loading: () => <h1>Loading...</h1>,
});

const ClassForm = dynamic(() => import("@/components/forms/ClassForm"), {
  loading: () => <h1>Loading...</h1>,
});

const LessonForm = dynamic(() => import("@/components/forms/LessonForm"), {
  loading: () => <h1>Loading...</h1>,
});

const ExamForm = dynamic(() => import("@/components/forms/ExamForm"), {
  loading: () => <h1>Loading...</h1>,
});

const AssignmentForm = dynamic(
  () => import("@/components/forms/AssignmentForm"),
  {
    loading: () => <h1>Loading...</h1>,
  }
);

const ResultForm = dynamic(() => import("@/components/forms/ResultForm"), {
  loading: () => <h1>Loading...</h1>,
});

const EventForm = dynamic(() => import("@/components/forms/EventForm"), {
  loading: () => <h1>Loading...</h1>,
});

const AnnouncementForm = dynamic(
  () => import("@/components/forms/AnnouncementForm"),
  {
    loading: () => <h1>Loading...</h1>,
  }
);

const forms: {
  [key: string]: (type: CreateUpdateFormType, data?: any) => React.ReactNode;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
  parent: (type, data) => <ParentForm type={type} data={data} />,
  subject: (type, data) => <SubjectForm type={type} data={data} />,
  class: (type, data) => <ClassForm type={type} data={data} />,
  lesson: (type, data) => <LessonForm type={type} data={data} />,
  exam: (type, data) => <ExamForm type={type} data={data} />,
  assignment: (type, data) => <AssignmentForm type={type} data={data} />,
  result: (type, data) => <ResultForm type={type} data={data} />,
  event: (type, data) => <EventForm type={type} data={data} />,
  announcement: (type, data) => <AnnouncementForm type={type} data={data} />,
};

function triggerButton(type: string, table: string) {
  switch (type) {
    case "create":
      return (
        <Button variant="default" size="icon">
          <Plus className="text-neutral-50 dark:text-neutral-900" />
        </Button>
      );
    case "delete":
      return (
        <Button variant="outline" size="sm">
          <Trash className="size-3" />
        </Button>
      );
    case "update":
      if (table === "teacher" || table === "student") {
        return (
          <Button asChild variant="outline">
            <div className="flex items-center gap-2">
              <SquarePen className="size-4" />
              <span className="text-sm font-semibold">Edit</span>
            </div>
          </Button>
        );
      } else {
        return (
          <Button variant="outline" size="sm">
            <Pencil className="size-3" />
          </Button>
        );
      }
    default:
      break;
  }
}

function FormDialog({ table, type, data, id }: IFormDialog) {
  const Form = () => {
    return type === "delete" && id ? (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to delete this{" "}
            <span className="font-semibold text-neutral-900 dark:text-neutral-50">
              {table}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <form id="deleteForm" />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" form="deleteForm" type="submit">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    ) : type !== "delete" ? (
      forms[table](type, data)
    ) : null;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton(type, table)}</DialogTrigger>
      <Form />
    </Dialog>
  );
}

export default FormDialog;
