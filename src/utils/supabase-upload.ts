import { createClient } from "@/utils/supabase/client";

const UPLOADS_BUCKET = "uploads";

/**
 * Upload a single file to Supabase storage
 * @param file - The file to upload
 * @param folder - The folder path within the bucket (e.g., "photos/church-id")
 * @returns Public URL of the uploaded file or null if failed
 */
export async function uploadFile(
  file: File,
  folder: string,
): Promise<string | null> {
  try {
    const supabase = createClient();

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2);
    const fileName = `${timestamp}-${randomStr}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Upload file to storage
    const { data, error } = await supabase.storage
      .from(UPLOADS_BUCKET)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("File upload error:", error);
      return null;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(UPLOADS_BUCKET).getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
}

/**
 * Upload multiple files to Supabase storage
 * @param files - Array of files to upload
 * @param folder - The folder path within the bucket
 * @returns Array of public URLs for successfully uploaded files
 */
export async function uploadMultipleFiles(
  files: File[],
  folder: string,
): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadFile(file, folder));
  const results = await Promise.all(uploadPromises);

  // Filter out failed uploads (null values)
  return results.filter((url): url is string => url !== null);
}

/**
 * Get folder path for church photos
 */
export function getPhotoFolder(churchId: string): string {
  return `photos/${churchId}`;
}

/**
 * Get folder path for church videos
 */
export function getVideoFolder(churchId: string): string {
  return `videos/${churchId}`;
}

/**
 * Get folder path for additional church photos
 */
export function getAdditionalPhotosFolder(churchId: string): string {
  return `photos/${churchId}/additional`;
}
