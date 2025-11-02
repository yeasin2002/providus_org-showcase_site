"use client";

import { Label } from "@/components/ui/label";
import { useFileUpload } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import type { FieldError } from "react-hook-form";

interface FormFileUploadProps {
  label: string;
  error?: FieldError;
  required?: boolean;
  className?: string;
  accept?: string;
  maxSize?: number;
  icon?: React.ReactNode;
  helperText?: string;
  onChange?: (files: File[]) => void;
}

export const FormFileUpload = ({
  label,
  error,
  required = false,
  className,
  accept = "*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  icon,
  helperText,
  onChange,
}: FormFileUploadProps) => {
  const [{ files, isDragging, errors }, actions] = useFileUpload({
    accept,
    maxSize,
    multiple: false,
    onFilesChange: (newFiles) => {
      if (onChange) {
        const fileObjects = newFiles
          .map((f) => (f.file instanceof File ? f.file : null))
          .filter((f): f is File => f !== null);
        onChange(fileObjects);
      }
    },
  });

  const file = files[0];

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Label className="text-lg capitalize font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>

      <input {...actions.getInputProps()} className="hidden" />

      {!file ? (
        <button
          type="button"
          onDragEnter={actions.handleDragEnter}
          onDragLeave={actions.handleDragLeave}
          onDragOver={actions.handleDragOver}
          onDrop={actions.handleDrop}
          onClick={actions.openFileDialog}
          className="flex flex-col items-start gap-3 cursor-pointer group"
        >
          {/* Small icon box with dashed border */}
          <div
            className={cn(
              "w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center transition-colors",
              isDragging
                ? "border-[#C4A053] bg-[#F7F3E8]"
                : "border-[#C4A053] group-hover:bg-[#F7F3E8]",
            )}
          >
            {icon || <Upload className="w-6 h-6 text-[#C4A053]" />}
          </div>

          {/* Helper text below */}
          {helperText && (
            <p className="text-sm text-muted-foreground text-left">
              {helperText}
            </p>
          )}
        </button>
      ) : (
        <div className="flex items-center gap-3 p-3 border rounded-lg">
          <div className="flex items-center gap-3 flex-1">
            {file.preview &&
            file.file instanceof File &&
            file.file.type.startsWith("image/") ? (
              <Image
                src={file.preview}
                alt="Preview"
                width={48}
                height={48}
                className="rounded object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded bg-[#F7F3E8] flex items-center justify-center">
                {icon || <Upload className="w-6 h-6 text-[#C4A053]" />}
              </div>
            )}
            <span className="text-sm truncate">
              {file.file instanceof File ? file.file.name : file.file.name}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              actions.removeFile(file.id);
            }}
            className="p-1 hover:bg-destructive/10 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-destructive" />
          </button>
        </div>
      )}

      {(error || errors.length > 0) && (
        <p className="text-sm text-destructive">
          {error?.message || errors[0]}
        </p>
      )}
    </div>
  );
};
