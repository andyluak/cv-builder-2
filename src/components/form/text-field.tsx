import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFieldContext } from "@/components/form";
import { Textarea, TextareaProps } from "@/components/ui/textarea";

type InputFieldProps = InputProps;

export function InputField(props: InputFieldProps) {
  // The `Field` infers that it should have a `value` type of `string`
  const field = useFieldContext<string>();

  return (
    <Input
      value={field.state.value}
      data-1p-ignore
      spellCheck={false}
      onChange={(e) => field.handleChange(e.target.value)}
      {...props}
    />
  );
}

export function TextAreaField(props: TextareaProps) {
  const field = useFieldContext<string>();

  return (
    <Textarea
      {...props}
      value={field.state.value}
      data-1p-ignore
      onChange={(e) => field.handleChange(e.target.value)}
    />
  );
}
