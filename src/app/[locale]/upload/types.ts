import { z } from "zod";

export const projectSchema = z.object({
  projectName: z
    .string()
    .min(2, "Project/Church name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  photo: z
    .unknown()
    .refine((files) => files && Array.isArray(files) && files.length > 0, {
      message: "Photo is required",
    }),
  video: z.unknown().optional(),
  country: z.string().min(1, "Please select your country/region"),
  contactEmail: z.string().email("Please enter a valid email address"),
  website: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  donationLink: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  additionalPhotos: z.unknown().optional(),
  mathAnswer: z.string().optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

export interface MathQuestion {
  question: string;
  answer: number;
}

export interface FormState {
  formLoadTime: number;
  submitAttempted: boolean;
  timeWarning: string;
  mathQuestion: MathQuestion;
  interactionCount: number;
}
