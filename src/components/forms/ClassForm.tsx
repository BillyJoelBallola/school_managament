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
import { Loader2, Pencil, Trash } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ClassInputs, classSchema } from "@/lib/formValidations";
import { startTransition, useActionState, useEffect } from "react";
import { createClass, updateClass } from "@/actions/class.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SelectField from "../inputs/SelectField";

function AssignmentForm({
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
  const serverAction = type === "create" ? createClass : updateClass;

  const [state, formAction, pending] = useActionState(serverAction, {
    success: false,
    error: false,
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassInputs>({
    resolver: zodResolver(classSchema),
  });

  const onSubmit = handleSubmit((formData) => {
    const parsedData = {
      ...formData,
      gradeId: formData.gradeId && Number(formData.gradeId),
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
        `Class has been ${type === "create" ? "created" : "updated"}!`
      );
      setOpen(false);
      router.refresh();
    }
  }, [state.success]);

  const { teachers, grades } = relatedData;

  const formattedTeachersData = teachers.map(
    (item: { name: string; surname: string; id: string }) => ({
      value: item.id,
      name: `${item.name} ${item.surname}`,
    })
  );

  const formattedGradesData = grades.map(
    (item: { id: number; level: number }) => ({
      value: item.id.toString(),
      name: item.level,
    })
  );

  return (
    <DialogContent className="w-[94%] sm:max-w-[50%]">
      <DialogHeader>
        <DialogTitle>Create a new class</DialogTitle>
        <DialogDescription>
          Input all fields to add a new class information
        </DialogDescription>
      </DialogHeader>
      <form
        id="dialogForm"
        onSubmit={onSubmit}
        className="max-h-[400px] overflow-y-auto grid gap-4"
      >
        <div className="grid grid-cols-2 gap-2 md:gap-4 items-baseline">
          <InputField
            label="Class Name"
            name="name"
            defaultValue={data?.name}
            register={register}
            error={errors.name}
          />
          <InputField
            label="Capacity"
            name="capacity"
            type="number"
            defaultValue={data?.capacity}
            register={register}
            error={errors.capacity}
          />
          <SelectField
            label="Grade"
            name="gradeId"
            control={control}
            defaultValue={data?.gradeId.toString()}
            error={errors.gradeId}
            selectItems={formattedGradesData}
          />
          <SelectField
            label="Supervisor"
            name="supervisorId"
            control={control}
            defaultValue={data?.supervisorId}
            error={errors.supervisorId}
            selectItems={formattedTeachersData}
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

export default AssignmentForm;
