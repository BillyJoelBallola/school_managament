"use client";

import React, {
  FormEvent,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";

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
import { toast } from "sonner";
import { Loader2, Pencil, Plus, SquarePen, Trash } from "lucide-react";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { deleteSubject } from "@/actions/subject.actions";
import { CreateUpdateFormType, IFormDialog } from "@/lib/types";

const deleteActionMap = {
  subject: deleteSubject,
  class: deleteSubject,
  teacher: deleteSubject,
  student: deleteSubject,
  parent: deleteSubject,
  lesson: deleteSubject,
  exam: deleteSubject,
  assignment: deleteSubject,
  result: deleteSubject,
  attendance: deleteSubject,
  event: deleteSubject,
  announcement: deleteSubject,
};

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
  [key: string]: (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    type: CreateUpdateFormType,
    data?: any,
    relatedData?: any
  ) => React.ReactNode;
} = {
  // teacher: (type, data) => <TeacherForm type={type} data={data} />,
  // student: (type, data) => <StudentForm type={type} data={data} />,
  // parent: (type, data) => <ParentForm type={type} data={data} />,
  subject: (setOpen, type, data, relatedData) => (
    <SubjectForm
      setOpen={setOpen}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  // class: (type, data) => <ClassForm type={type} data={data} />,
  // lesson: (type, data) => <LessonForm type={type} data={data} />,
  // exam: (type, data) => <ExamForm type={type} data={data} />,
  // assignment: (type, data) => <AssignmentForm type={type} data={data} />,
  // result: (type, data) => <ResultForm type={type} data={data} />,
  // event: (type, data) => <EventForm type={type} data={data} />,
  // announcement: (type, data) => <AnnouncementForm type={type} data={data} />,
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

function FormDialog({ table, type, data, id, relatedData }: IFormDialog) {
  const [open, setOpen] = useState(false);

  const [state, formAction, pending] = useActionState(deleteActionMap[table], {
    success: false,
    error: false,
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      formAction(formData);
    });
  };

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(`Subject has been deleted!`);
      setOpen(false);
      router.refresh();
    }
  }, [state.success]);

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
        <form id="deleteForm" onSubmit={onSubmit}>
          <input
            type="text | number"
            name="id"
            defaultValue={id}
            hidden
            readOnly
          />
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            disabled={pending}
            variant="destructive"
            form="deleteForm"
            type="submit"
          >
            {pending && <Loader2 className="animate-spin" />} Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    ) : type === "create" || type === "update" ? (
      forms[table](setOpen, type, data, relatedData)
    ) : null;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton(type, table)}</DialogTrigger>
      <Form />
    </Dialog>
  );
}

export default FormDialog;
