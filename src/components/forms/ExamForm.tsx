"use client";

import { startTransition, useActionState, useEffect } from "react";

import { CreateUpdateFormType } from "@/lib/types";
import { toDateInputValue, toDateTimeLocalString } from "@/lib/config";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import InputField from "@/components/inputs/InputField";
import SelectField from "@/components/inputs/SelectField";
import { Loader2 } from "lucide-react";

import { ExamInputs, examSchema } from "@/lib/formValidations";
import { createExam, updateExam } from "@/actions/exam.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function LessonForm({
  setOpen,
  type,
  data,
  relatedData,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: CreateUpdateFormType;
  data?: any;
  relatedData?: any;
}) {
  const serverAction = type === "create" ? createExam : updateExam;

  const [state, formAction, pending] = useActionState(serverAction, {
    success: false,
    error: false,
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExamInputs>({
    resolver: zodResolver(examSchema),
  });

  const onSubmit = handleSubmit((formData) => {
    const parsedData = {
      ...formData,
      lessonId: formData.lessonId && Number(formData.lessonId),
    };

    startTransition(() => {
      formAction(
        type === "update" ? { id: data?.id, ...parsedData } : parsedData
      );
    });
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(
        `Exam has been ${type === "create" ? "created" : "updated"}!`
      );
      setOpen(false);
      router.refresh();
    }
  }, [state.success]);

  const { lessons } = relatedData;

  const formattedLessons = lessons.map(
    (item: { id: number; name: string }) => ({
      value: item.id.toString(),
      name: item.name,
    })
  );

  return (
    <DialogContent className="w-[94%] sm:max-w-[50%]">
      <DialogHeader>
        <DialogTitle>Create a new exam</DialogTitle>
        <DialogDescription>
          Input all fields to add a new exam information
        </DialogDescription>
      </DialogHeader>
      <form
        id="dialogForm"
        onSubmit={onSubmit}
        className="max-h-[400px] overflow-y-auto grid gap-4"
      >
        <div className="grid md:grid-cols-2 gap-2 md:gap-4 items-baseline">
          <InputField
            label="Title"
            name="title"
            defaultValue={data?.title}
            register={register}
            error={errors.title}
          />
          <InputField
            label="Date"
            name="date"
            type="date"
            defaultValue={toDateInputValue(new Date(data?.date))}
            register={register}
            error={errors.date}
          />
          <InputField
            label="Start Time"
            name="startTime"
            type="datetime-local"
            defaultValue={toDateTimeLocalString(new Date(data?.startTime))}
            register={register}
            error={errors.startTime}
          />
          <InputField
            label="End Time"
            name="endTime"
            type="datetime-local"
            defaultValue={toDateTimeLocalString(new Date(data?.endTime))}
            register={register}
            error={errors.endTime}
          />
          <SelectField
            label="Lesson"
            name="lessonId"
            className="md:col-span-2"
            control={control}
            defaultValue={data?.lessonId.toString()}
            error={errors.lessonId}
            selectItems={formattedLessons}
          />
        </div>
      </form>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" type="button">
            Cancel
          </Button>
        </DialogClose>
        <Button
          disabled={pending}
          variant="default"
          form="dialogForm"
          type="submit"
        >
          {pending && <Loader2 className="animate-spin" />}{" "}
          {type === "create" ? "Create" : "Update"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default LessonForm;
