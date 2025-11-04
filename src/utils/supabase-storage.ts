/**
 * Supabase Storage Configuration
 * 
 * This file contains constants and utilities for working with Supabase storage buckets.
 */

export const STORAGE_BUCKETS = {
  UPLOADS: "uploads",
  CERTIFICATES: "certificates",
} as const;

export const STORAGE_FOLDERS = {
  PHOTOS: "photos",
  VIDEOS: "videos",
  ADDITIONAL: "additional",
} as const;

/**
 * Generate a unique file name with timestamp and random string
 */
export function generateFileName(originalName: string): string {
  const fileExt = originalName.split(".").pop();
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 9);
  return `${timestamp}-${randomStr}.${fileExt}`;
}

/**
 * Get the file path for storage
 */
export function getStoragePath(
  folder: string,
  churchId: string,
  fileName: string,
  subfolder?: string,
): string {
  if (subfolder) {
    return `${folder}/${churchId}/${subfolder}/${fileName}`;
  }
  return `${folder}/${churchId}/${fileName}`;
}

/**
 * Validate file type
 */
export function isValidImageType(file: File): boolean {
  const validTypes = ["image/jpeg", "image/png", "image/webp"];
  return validTypes.includes(file.type);
}

/**
 * Validate video type
 */
export function isValidVideoType(file: File): boolean {
  const validTypes = ["video/mp4", "video/webm", "video/quicktime"];
  return validTypes.includes(file.type);
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Math.round(bytes / Math.pow(k, i) * 100) / 100} ${sizes[i]}`;
}
