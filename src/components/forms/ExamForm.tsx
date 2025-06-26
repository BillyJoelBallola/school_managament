"use client";

import { CreateUpdateFormType } from "@/lib/types";

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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Name is required!" }),
  date: z.string().min(1, { message: "Date is required!" }),
  startTime: z.string().min(1, { message: "Start time is required!" }),
  endTime: z.string().min(1, { message: "End time is required!" }),
});

type Input = z.infer<typeof schema>;

function LessonForm({
  type,
  data,
}: {
  type: CreateUpdateFormType;
  data?: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

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
        <div className="grid grid-cols-2 gap-2 md:gap-4 items-baseline">
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
            defaultValue={data?.date}
            register={register}
            error={errors.date}
          />
          <InputField
            label="Start Time"
            name="startTime"
            type="time"
            defaultValue={data?.startTime}
            register={register}
            error={errors.startTime}
          />
          <InputField
            label="End Time"
            name="endTime"
            type="time"
            defaultValue={data?.endTime}
            register={register}
            error={errors.endTime}
          />
        </div>
      </form>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" type="button">
            Cancel
          </Button>
        </DialogClose>
        <Button variant="default" form="dialogForm" type="submit">
          {type === "create" ? "Create" : "Update"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default LessonForm;
