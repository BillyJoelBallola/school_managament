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
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood type is required!" }),
  birthday: z.date({ message: "Birthday is required!" }),
  sex: z.enum(["male", "female"], { message: "Sex is required" }),
  img: z.instanceof(File, { message: "Image is required!" }),
});

type Input = z.infer<typeof schema>;

function StudentForm({
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
    console.log(data.username);
  });

  return (
    <DialogContent className="w-[94%] sm:max-w-[50%]">
      <DialogHeader>
        <DialogTitle>Create a new student</DialogTitle>
        <DialogDescription>
          Input all fields to add a new student information
        </DialogDescription>
      </DialogHeader>
      <form
        id="dialogForm"
        onSubmit={onSubmit}
        className="max-h-[400px] overflow-y-auto grid gap-4"
      >
        <div className="grid gap-4">
          <span className="text-sm text-muted-foreground">
            Authentication Information
          </span>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 items-baseline">
            <InputField
              label="Username"
              name="username"
              defaultValue={data?.username}
              register={register}
              error={errors.username}
            />
            <InputField
              label="Email"
              name="email"
              defaultValue={data?.email}
              register={register}
              error={errors.email}
            />
            <InputField
              label="Password"
              name="username"
              type="password"
              className="col-span-2 md:col-span-1"
              defaultValue={data?.password}
              register={register}
              error={errors.password}
            />
          </div>
        </div>
        <div className="grid gap-4">
          <span className="text-sm text-muted-foreground">
            Personal Information
          </span>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 items-baseline">
            <InputField
              label="First Name"
              name="firstName"
              defaultValue={data?.firstName}
              register={register}
              error={errors.firstName}
            />
            <InputField
              label="Last Name"
              name="lastName"
              defaultValue={data?.lastName}
              register={register}
              error={errors.lastName}
            />
            <InputField
              label="Phone"
              name="phone"
              className="col-span-2 md:col-span-1"
              defaultValue={data?.phone}
              register={register}
              error={errors.phone}
            />
            <InputField
              label="Address"
              name="address"
              defaultValue={data?.address}
              register={register}
              error={errors.address}
            />
            <InputField
              label="Blood Type"
              name="bloodType"
              defaultValue={data?.bloodType}
              register={register}
              error={errors.bloodType}
            />
            <SelectField
              label="Sex"
              name="sex"
              className="col-span-2 md:col-span-1"
              defaultValue={data?.sex}
              register={register}
              error={errors.sex}
              selectItems={[
                { value: "male", name: "Male" },
                { value: "female", name: "Female" },
              ]}
            />
            <InputField
              label="Birthday"
              name="birthday"
              type="date"
              defaultValue={data?.birthday}
              register={register}
              error={errors.birthday}
            />
            {/* <InputField
              label="Image"
              name="img"
              type="file"
              defaultValue={data?.img?.toString()}
              register={register}
              error={errors.img}
            /> */}
          </div>
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

export default StudentForm;
