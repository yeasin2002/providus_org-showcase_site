import type { MathQuestion } from "../app/[locale]/upload/types";

export const MIN_SUBMIT_TIME = 3000; // 3 seconds minimum
export const MIN_INTERACTION_COUNT = 5;

/**
 * Generate a simple math question for bot prevention
 */
export function generateMathQuestion(): MathQuestion {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return {
    question: `${num1} + ${num2}`,
    answer: num1 + num2,
  };
}

/**
 * Validate form submission timing to prevent bot submissions
 */
export function validateSubmissionTiming(
  formLoadTime: number,
  minTime: number = MIN_SUBMIT_TIME,
): { valid: boolean; message?: string } {
  const timeElapsed = Date.now() - formLoadTime;

  if (timeElapsed < minTime) {
    return {
      valid: false,
      message:
        "Please take a moment to review your information before submitting.",
    };
  }

  return { valid: true };
}

/**
 * Validate math answer for bot prevention
 */
export function validateMathAnswer(
  userAnswer: string | undefined,
  correctAnswer: number,
): { valid: boolean; message?: string } {
  const parsedAnswer = parseInt(userAnswer || "0", 10);

  if (parsedAnswer !== correctAnswer) {
    return {
      valid: false,
      message: "Incorrect answer to the security question. Please try again.",
    };
  }

  return { valid: true };
}

/**
 * Validate user interaction count to prevent bot submissions
 */
export function validateInteractionCount(
  count: number,
  minCount: number = MIN_INTERACTION_COUNT,
): { valid: boolean; message?: string } {
  if (count < minCount) {
    return {
      valid: false,
      message: "Please review the form before submitting.",
    };
  }

  return { valid: true };
}

/**
 * Check if honeypot field was filled (indicates bot)
 */
export function checkHoneypot(honeypotValue: string | undefined): boolean {
  return !!honeypotValue;
}
