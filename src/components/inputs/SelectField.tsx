import { ISelectField } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

function SelectField({
  label,
  register,
  name,
  defaultValue,
  error,
  inputProps,
  selectItems,
  className,
}: ISelectField) {
  return (
    <div className={`${className} grid gap-2`}>
      <Label>{label}</Label>
      <Select defaultValue={defaultValue} {...register(name)} {...inputProps}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {selectItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error?.message && (
        <p className="text-xs text-red-500">{error?.message.toString()}</p>
      )}
    </div>
  );
}

export default SelectField;
