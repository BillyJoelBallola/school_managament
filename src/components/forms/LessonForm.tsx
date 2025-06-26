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
import SelectField from "@/components/inputs/SelectField";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required!" }),
  day: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"], {
    message: "Day is required!",
  }),
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
        <div className="grid grid-cols-2 gap-2 md:gap-4 items-baseline">
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
            defaultValue={data?.day}
            register={register}
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
