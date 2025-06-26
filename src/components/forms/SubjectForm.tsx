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
  teachers: z.string().min(1, "Teacher is required!"),
});

type Input = z.infer<typeof schema>;

function SubjectForm({
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
        <DialogTitle>Create a new subject</DialogTitle>
        <DialogDescription>
          Input all fields to add a new subject information
        </DialogDescription>
      </DialogHeader>
      <form
        id="dialogForm"
        onSubmit={onSubmit}
        className="max-h-[400px] overflow-y-auto grid gap-4"
      >
        <div className="grid gap-2 md:gap-4 items-baseline">
          <InputField
            label="Subject Name"
            name="name"
            defaultValue={data?.name}
            register={register}
            error={errors.name}
          />
          <div className="flex items-end gap-2">
            <SelectField
              label="Teacher"
              name="teachers"
              defaultValue={data?.teachers}
              register={register}
              error={errors.teachers}
              className="w-full"
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
        {data?.teachers && (
          <div className="grid text-sm border p-2 rounded-md">
            <span className="mb-2 font-semibold text-muted-foreground">
              teachers
            </span>
            {data?.teachers.map((teacher: string) => (
              <div
                key={teacher}
                className="flex items-center justify-between px-2 hover:bg-slate-100 dark:hover:bg-slate-800/20"
              >
                <span>{teacher}</span>
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

export default SubjectForm;
