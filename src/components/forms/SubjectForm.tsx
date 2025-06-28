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
import MultipleSelectField from "@/components/inputs/MultipleSelectField";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { subjectSchema, SubjectInputs } from "@/lib/formValidations";
import { createSubject, updateSubject } from "@/actions/subject.actions";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function SubjectForm({
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
  const serverAction = type === "create" ? createSubject : updateSubject;

  const [state, formAction, pending] = useActionState(serverAction, {
    success: false,
    error: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectInputs>({
    resolver: zodResolver(subjectSchema),
  });

  const onSubmit = handleSubmit((formData) => {
    startTransition(() => {
      formAction(type === "update" ? { id: data?.id, ...formData } : formData);
    });
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(
        `Subject has been ${type === "create" ? "created" : "updated"}!`
      );
      setOpen(false);
      router.refresh();
    }
  }, [state.success]);

  const { teachers } = relatedData;

  const formattedTeachersData = teachers.map(
    (item: { name: string; surname: string; id: string }) => ({
      value: item.id,
      label: `${item.name} ${item.surname}`,
    })
  );

  return (
    <DialogContent className="w-[94%] sm:max-w-[50%]">
      <DialogHeader>
        <DialogTitle>
          {type === "create" ? "Create a new subject" : "Update a subject"}
        </DialogTitle>
        <DialogDescription>
          {type === "create"
            ? "Input all fields to add a new subject information"
            : "Make changes to subject information"}
        </DialogDescription>
      </DialogHeader>
      <form
        id="dialogForm"
        onSubmit={onSubmit}
        className="max-h-[200px] overflow-y-auto grid gap-4"
      >
        <InputField
          label="Subject Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <MultipleSelectField
          label="Teachers"
          name="teachers"
          defaultValue={data?.teachers}
          register={register}
          // error={errors.teachers}
          selectItems={formattedTeachersData}
        />
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

export default SubjectForm;
