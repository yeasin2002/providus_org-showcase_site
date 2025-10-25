"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormSelectProps {
  label: string;
  error?: FieldError;
  required?: boolean;
  className?: string;
  selectClassName?: string;
  registration: UseFormRegisterReturn;
  placeholder?: string;
  options: { value: string; label: string }[];
}

export const FormSelect = ({
  label,
  error,
  required = false,
  className,
  selectClassName,
  registration,
  placeholder = "Select an option",
  options,
}: FormSelectProps) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={registration.name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <div className="relative">
        <select
          id={registration.name}
          aria-invalid={!!error}
          className={cn(
            "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full appearance-none rounded-md border bg-transparent px-3 py-1 pr-10 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            selectClassName,
          )}
          {...registration}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
      </div>
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
};
