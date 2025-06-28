import React from "react";
import { FieldError } from "react-hook-form";

export type FormType = { type: "create" | "update" | "delete" };

export type CreateUpdateFormType = "create" | "update";

export interface IFormDialog {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "attendance"
    | "result"
    | "event"
    | "announcement";
  type: FormType["type"];
  data?: any;
  id?: number | string;
  relatedData?: any;
}

export interface IInputField {
  className?: string;
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export interface ISelectField {
  className?: string;
  label: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  selectItems: { value: string; name: string }[];
}

export interface IMultipleSelectField
  extends Omit<ISelectField, "selectItems" | "defaultValue"> {
  selectItems: { value: string; label: string }[];
  defaultValue: Object[];
}
