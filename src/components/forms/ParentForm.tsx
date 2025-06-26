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
import { Pencil, Plus, Trash } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required!" }),
  students: z.string().min(1, "Student is required!"),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
});

type Input = z.infer<typeof schema>;

function ParentForm({
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
        <DialogTitle>Create a new parent</DialogTitle>
        <DialogDescription>
          Input all fields to add a new parent information
        </DialogDescription>
      </DialogHeader>
      <form
        id="dialogForm"
        onSubmit={onSubmit}
        className="max-h-[400px] overflow-y-auto grid gap-4"
      >
        <div className="grid grid-cols-2 gap-2 md:gap-4 items-baseline">
          <InputField
            label="Parent Name"
            name="name"
            className="col-span-2 md:col-span-1"
            defaultValue={data?.name}
            register={register}
            error={errors.name}
          />
          <InputField
            label="Email"
            name="email"
            defaultValue={data?.email}
            register={register}
            error={errors.email}
          />
          <InputField
            label="Phone"
            name="phone"
            defaultValue={data?.phone}
            register={register}
            error={errors.phone}
          />
          <InputField
            label="Address"
            name="address"
            className="col-span-2 md:col-span-1"
            defaultValue={data?.address}
            register={register}
            error={errors.address}
          />
          <div className="col-span-2 flex items-end gap-2">
            <SelectField
              label="Student"
              name="students"
              defaultValue={data?.students}
              register={register}
              className="w-full"
              error={errors.students}
              selectItems={[
                { value: "1", name: "John Dawg" },
                { value: "2", name: "Stephanie Lau" },
              ]}
            />
            <Button
              type="button"
              variant="outline"
              className="border-dashed text-muted-foreground"
            >
              <Plus className="size-3" />
              Add
            </Button>
          </div>
        </div>
        {data?.students && (
          <div className="grid text-sm border p-2 rounded-md">
            <span className="mb-2 font-semibold text-muted-foreground">
              Students
            </span>
            {data?.students.map((student: string) => (
              <div
                key={student}
                className="flex items-center justify-between px-2 hover:bg-slate-100 dark:hover:bg-slate-800/20"
              >
                <span>{student}</span>
                <div className="flex">
                  <Button type="button" variant="ghost" size="sm">
                    <Pencil className="size-3" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm">
                    <Trash className="size-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
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

export default ParentForm;
