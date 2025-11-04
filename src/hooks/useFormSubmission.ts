import { useState } from "react";
import type {
  MathQuestion,
  ProjectFormData,
} from "../app/[locale]/upload/types";
import {
  checkHoneypot,
  validateInteractionCount,
  validateMathAnswer,
  validateSubmissionTiming,
} from "../utils/upload-utils";

interface UseFormSubmissionProps {
  formLoadTime: number;
  mathQuestion: MathQuestion;
  interactionCount: number;
}

export function useFormSubmission({
  formLoadTime,
  mathQuestion,
  interactionCount,
}: UseFormSubmissionProps) {
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [timeWarning, setTimeWarning] = useState("");

  const handleSubmit = async (data: ProjectFormData) => {
    setSubmitAttempted(true);
    setTimeWarning("");

    // 1. Check honeypot field
    if (checkHoneypot(data.website)) {
      console.warn("Spam detected: honeypot field filled");
      setSubmitAttempted(false);
      return;
    }

    // 2. Validate submission timing
    const timingValidation = validateSubmissionTiming(formLoadTime);
    if (!timingValidation.valid) {
      setTimeWarning(timingValidation.message || "");
      setSubmitAttempted(false);
      return;
    }

    // 3. Validate math answer
    const mathValidation = validateMathAnswer(
      data.mathAnswer,
      mathQuestion.answer
    );
    if (!mathValidation.valid) {
      setTimeWarning(mathValidation.message || "");
      setSubmitAttempted(false);
      return;
    }

    // 4. Validate interaction count
    const interactionValidation = validateInteractionCount(interactionCount);
    if (!interactionValidation.valid) {
      console.warn("Insufficient interaction detected");
      setTimeWarning(interactionValidation.message || "");
      setSubmitAttempted(false);
      return;
    }

    // 5. Remove honeypot and math answer fields before sending
    const { website: _website, mathAnswer: _mathAnswer, ...submitData } = data;

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...submitData,
          formLoadTime,
          submitTime: Date.now(),
          interactionCount,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);

      // Success - keep submitAttempted true to show success state
      return result;
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
