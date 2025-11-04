import { useState } from "react";
import type {
  MathQuestion,
  ProjectFormData,
} from "../app/[locale]/upload/types";
import { insertProject } from "../utils/project-submission";
import {
  getAdditionalPhotosFolder,
  getPhotoFolder,
  getVideoFolder,
  uploadFile,
  uploadMultipleFiles,
} from "../utils/supabase-upload";
import {
  validateInteractionCount,
  validateMathAnswer,
  validateSubmissionTiming,
} from "../utils/upload-utils";

interface UseFormSubmissionProps {
  formLoadTime: number;
  mathQuestion: MathQuestion;
  interactionCount: number;
  churchId: string;
}

/**
 * Custom hook for handling form submission with validation and file uploads
 */
export function useFormSubmission({
  formLoadTime,
  mathQuestion,
  interactionCount,
  churchId,
}: UseFormSubmissionProps) {
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [timeWarning, setTimeWarning] = useState("");

  const handleSubmit = async (data: ProjectFormData) => {
    setSubmitAttempted(true);
    setTimeWarning("");

    // Step 1: Validate submission timing (prevent bot submissions)
    const timingValidation = validateSubmissionTiming(formLoadTime);
    if (!timingValidation.valid) {
      setTimeWarning(timingValidation.message || "");
      setSubmitAttempted(false);
      return;
    }

    // Step 2: Validate math answer (CAPTCHA)
    const mathValidation = validateMathAnswer(
      data.mathAnswer,
      mathQuestion.answer,
    );
    if (!mathValidation.valid) {
      setTimeWarning(mathValidation.message || "");
      setSubmitAttempted(false);
      return;
    }

    // Step 3: Validate user interaction count (bot detection)
    const interactionValidation = validateInteractionCount(interactionCount);
    if (!interactionValidation.valid) {
      console.warn("Insufficient interaction detected");
      setTimeWarning(interactionValidation.message || "");
      setSubmitAttempted(false);
      return;
    }

    try {
      // Step 4: Validate and upload main photo (required)
      if (
        !data.photo ||
        !Array.isArray(data.photo) ||
        data.photo.length === 0
      ) {
        setTimeWarning("Please upload a main photo.");
        setSubmitAttempted(false);
        return;
      }

      const mainPhotoFile = data.photo[0] as File;
      const mainPhotoUrl = await uploadFile(
        mainPhotoFile,
        getPhotoFolder(churchId),
      );

      if (!mainPhotoUrl) {
        setTimeWarning("Failed to upload photo. Please try again.");
        setSubmitAttempted(false);
        return;
      }

      // Step 5: Upload video (optional)
      let videoUrl: string | null = null;
      if (data.video && Array.isArray(data.video) && data.video.length > 0) {
        const videoFile = data.video[0] as File;
        videoUrl = await uploadFile(videoFile, getVideoFolder(churchId));
      }

      // Step 6: Upload additional photos (optional)
      let additionalPhotosUrls: string[] = [];
      if (
        data.additionalPhotos &&
        Array.isArray(data.additionalPhotos) &&
        data.additionalPhotos.length > 0
      ) {
        const additionalFiles = data.additionalPhotos as File[];
        additionalPhotosUrls = await uploadMultipleFiles(
          additionalFiles,
          getAdditionalPhotosFolder(churchId),
        );
      }

      // Step 7: Insert project data into database
      const projectData = await insertProject(
        churchId,
        data,
        mainPhotoUrl,
        videoUrl,
        additionalPhotosUrls,
      );

      if (!projectData) {
        setTimeWarning("Failed to submit project. Please try again.");
        setSubmitAttempted(false);
        return;
      }

      console.log("Project submitted successfully:", projectData);

      // Success - keep submitAttempted true to show success state
      return projectData;
    } catch (error) {
      console.error("Submission error:", error);
      setTimeWarning("An error occurred. Please try again.");
      setSubmitAttempted(false);
      throw error;
    }
  };

  return {
    handleSubmit,
    submitAttempted,
    timeWarning,
  };
}
