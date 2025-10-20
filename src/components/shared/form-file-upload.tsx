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
    <div className={cn("flex flex-col gap-2", className)}>
      <Label>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>

      <button
        type="button"
        onDragEnter={actions.handleDragEnter}
        onDragLeave={actions.handleDragLeave}
        onDragOver={actions.handleDragOver}
        onDrop={actions.handleDrop}
        onClick={actions.openFileDialog}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors w-full",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50",
          error && "border-destructive"
        )}
      >
        <input {...actions.getInputProps()} className="hidden" />

        {!file ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-[#F7F3E8] flex items-center justify-center">
              {icon || <Upload className="w-6 h-6 text-[#C4A053]" />}
            </div>
            {helperText && (
              <p className="text-sm text-muted-foreground">{helperText}</p>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
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
                <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                  {icon || <Upload className="w-6 h-6" />}
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
      </button>

      {(error || errors.length > 0) && (
        <p className="text-sm text-destructive">
          {error?.message || errors[0]}
        </p>
      )}
    </div>
  );
};
