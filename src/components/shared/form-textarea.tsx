"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormTextareaProps {
  label: string;
  error?: FieldError;
  required?: boolean;
  className?: string;
  textareaClassName?: string;
  registration: UseFormRegisterReturn;
  placeholder?: string;
  rows?: number;
}

export const FormTextarea = ({
  label,
  error,
  required = false,
  className,
  textareaClassName,
  registration,
  placeholder,
  rows = 4,
}: FormTextareaProps) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={registration.name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Textarea
        id={registration.name}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={textareaClassName}
        rows={rows}
        {...registration}
      />
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
};
