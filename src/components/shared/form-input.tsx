"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label: string;
  subLabel?: string; // ✅ optional subLabel
  error?: FieldError;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  registration: UseFormRegisterReturn;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
}

export const FormInput = ({
  label,
  subLabel,
  error,
  required = false,
  className,
  inputClassName,
  registration,
  type = "text",
  placeholder,
}: FormInputProps) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div>
        <Label
          htmlFor={registration.name}
          className="text-lg capitalize font-medium"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {subLabel && (
          <p className="text-sm text-gray-400 mt-0.5">{subLabel}</p> // ✅ added subLabel
        )}
      </div>

      <Input
        id={registration.name}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={cn("min-h-10 shadow-none", inputClassName)}
        {...registration}
      />

      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
};
