import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "placeholder:text-muted-foreground focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex field-sizing-content min-h-16 w-full bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: [
          "border border-input rounded-md",
          "focus-visible:border-ring focus-visible:ring-[3px]",
          "aria-invalid:border-destructive",
        ],
        borderless: [
          "border-0 border-b border-transparent shadow-none transition-all px-0",
          "focus-visible:border-b-primary focus-visible:ring-0",
          "aria-invalid:border-b-destructive",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type TextareaProps = React.ComponentProps<"textarea"> &
  VariantProps<typeof textareaVariants>;

function Textarea({ className, variant, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(textareaVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Textarea, textareaVariants };
