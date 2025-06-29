"use client";

import { startTransition, useActionState, useEffect } from "react";

import { CreateUpdateFormType } from "@/lib/types";
import { LessonInputs, lessonSchema } from "@/lib/formValidations";

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

import { createLesson, updateLesson } from "@/actions/lesson.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { toDateTimeLocalString } from "@/lib/config";

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
  const serverAction = type === "create" ? createLesson : updateLesson;

  const [state, formAction, pending] = useActionState(serverAction, {
    success: false,
    error: false,
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LessonInputs>({
    resolver: zodResolver(lessonSchema),
  });

  const onSubmit = handleSubmit((formData) => {
    const parsedData = {
      ...formData,
      subjectId: formData.subjectId && Number(formData.subjectId),
      classId: formData.classId && Number(formData.classId),
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
        `Lesson has been ${type === "create" ? "created" : "updated"}!`
      );
      setOpen(false);
      router.refresh();
    }
  }, [state.success]);

  const { subjects, teachers, classes } = relatedData;

  const formattedSubjects = subjects.map(
    (item: { id: number; name: string }) => ({
      value: item.id.toString(),
      name: item.name,
    })
  );

  const formattedTeachers = teachers.map(
    (item: { id: number; name: string; surname: string }) => ({
      value: item.id,
      name: item.name + " " + item.surname,
    })
  );

  const formattedClasses = classes.map(
    (item: { id: number; name: string }) => ({
      value: item.id.toString(),
      name: item.name,
    })
  );

  return (
    <DialogContent className="w-[94%] sm:max-w-[50%]">
      <DialogHeader>
        <DialogTitle>Create a new lesson</DialogTitle>
        <DialogDescription>
          Input all fields to add a new lesson information
        </DialogDescription>
      </DialogHeader>
      <form
        id="dialogForm"
        onSubmit={onSubmit}
        className="max-h-[400px] overflow-y-auto grid gap-4"
      >
        <div className="grid md:grid-cols-2 gap-2 md:gap-4 items-baseline">
          <InputField
            label="Lesson Name"
            name="name"
            defaultValue={data?.name}
            register={register}
            error={errors.name}
          />
          <SelectField
            label="Day"
            name="day"
            control={control}
            defaultValue={data?.day}
            error={errors.day}
            selectItems={[
              { value: "MONDAY", name: "Monday" },
              { value: "TUESDAY", name: "Tuesday" },
              { value: "WEDNESDAY", name: "Wednesday" },
              { value: "THURSDAY", name: "Thursday" },
              { value: "FRIDAY", name: "Friday" },
            ]}
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
            label="Subject"
            name="subjectId"
            control={control}
            defaultValue={data?.subjectId.toString()}
            error={errors.subjectId}
            selectItems={formattedSubjects}
          />
          <SelectField
            label="Class"
            name="classId"
            control={control}
            defaultValue={data?.classId.toString()}
            error={errors.classId}
            selectItems={formattedClasses}
          />
          <SelectField
            label="Teacher"
            name="teacherId"
            className="md:col-span-2"
            control={control}
            defaultValue={data?.teacherId}
            error={errors.teacherId}
            selectItems={formattedTeachers}
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
