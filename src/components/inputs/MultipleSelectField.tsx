import { IMultipleSelectField } from "@/lib/types";
import { Label } from "@/components/ui/label";
import React from "react";
import { Check } from "lucide-react";

function MultipleSelectField({
  label,
  register,
  name,
  defaultValue,
  error,
  inputProps,
  selectItems,
  className,
}: IMultipleSelectField) {
  return (
    <div className={`${className} grid gap-2`}>
      <Label>
        {label}{" "}
        <span className="text-muted-foreground font-medium">
          (Hold shift and select)
        </span>
      </Label>
      <select
        multiple
        defaultValue={defaultValue}
        {...register(name)}
        {...inputProps}
        className="border rounded-lg shadow-lg p-2 text-sm dark:bg-neutral-900"
      >
        {selectItems.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {error?.message && (
        <p className="text-xs text-red-500">{error?.message.toString()}</p>
      )}
    </div>
  );
}

export default MultipleSelectField;
