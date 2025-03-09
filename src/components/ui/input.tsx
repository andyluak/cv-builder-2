import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 min-w-0 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: [
          "border border-input rounded-md",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        ],
        borderless: [
          "border-0 border-b border-transparent shadow-none transition-all px-0 py-0",
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

export type InputProps = React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants>;

function Input({
  className,
  type,
  variant,
  placeholder,
  value: controlledValue,
  defaultValue,
  onChange,
  style,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const measureRef = React.useRef<HTMLSpanElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const updateWidth = React.useCallback(() => {
    if (measureRef.current && inputRef.current) {
      // Get the computed styles of the input
      const styles = window.getComputedStyle(inputRef.current);
      const textWidth = measureRef.current.offsetWidth;

      // Account for padding, border, and a small buffer
      const padding =
        parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
      const border =
        parseFloat(styles.borderLeftWidth) +
        parseFloat(styles.borderRightWidth);
      const finalWidth = textWidth + padding + border + 4; // 4px extra buffer

      measureRef.current.parentElement?.style.setProperty(
        "--input-width",
        `${finalWidth}px`,
      );
    }
  }, []);

  React.useEffect(() => {
    updateWidth();
    // Add resize observer to handle font loading and dynamic style changes
    if (inputRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        updateWidth();
      });
      resizeObserver.observe(inputRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [value, placeholder, updateWidth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
    requestAnimationFrame(updateWidth);
  };

  return (
    <div
      className='relative inline-flex items-center'
      style={{
        ...style,
        width: "var(--input-width, auto)",
        minWidth: variant === "borderless" ? 0 : "2rem",
      }}
    >
      <span
        ref={measureRef}
        className={cn(
          "invisible absolute left-0 top-0 -z-[1] whitespace-pre",
          inputVariants({ variant, className }),
        )}
        aria-hidden='true'
      >
        {value || placeholder || "\u00A0"}
      </span>
      <input
        ref={inputRef}
        type={type}
        data-slot='input'
        className={cn(inputVariants({ variant, className }), "w-full")}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}

export { Input, inputVariants };
