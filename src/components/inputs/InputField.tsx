import { IInputField } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function InputField({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
  className,
}: IInputField) {
  return (
    <div className={`${className} grid gap-2`}>
      <Label>{label}</Label>
      <Input
        type={type}
        {...register(name)}
        {...inputProps}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <p className="text-xs text-red-500">{error?.message.toString()}</p>
      )}
    </div>
  );
}

export default InputField;
