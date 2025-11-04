"use client";

import startSharpIcon from "@/assets/star-sharp.svg";
import { CTAButton } from "@/components/shared/buttons";
import { FormFileUpload } from "@/components/shared/form-file-upload";
import { FormInput } from "@/components/shared/form-input";
import { FormSelect } from "@/components/shared/form-select";
import { FormTextarea } from "@/components/shared/form-textarea";
import { Badge } from "@/components/ui/badge";
import { countries } from "@/data/countries-data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, Video } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFormSubmission } from "./hooks/useFormSubmission";
import { useInteractionTracking } from "./hooks/useInteractionTracking";
import { projectSchema, type ProjectFormData } from "./types";
import { generateMathQuestion } from "./utils";

export const ProjectUploadForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  // Initialize form state
  const [formLoadTime] = useState<number>(Date.now());
  const [mathQuestion] = useState(generateMathQuestion());

  // Custom hooks for form logic
  const interactionCount = useInteractionTracking();
  const {
    handleSubmit: onSubmit,
    submitAttempted,
    timeWarning,
  } = useFormSubmission({
    formLoadTime,
    mathQuestion,
    interactionCount,
  });

  return (
    <section
      className="py-16 px-4 md:px-8 max-w-5xl mx-auto font-rubik"
      id="join-here"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="bg-[#F7F3E8] text-[#023C5E] rounded-full px-6 py-1 mb-4">
          <Image src={startSharpIcon} alt="Star" />
          <span className="text-xl font-bold">Share Your Story</span>
        </Badge>

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Take a few minutes to share your ministry’s work with the world.
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Here you can upload your project details, photo, and optional video so
          your church becomes visible to donors and partners who want to help
          directly.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gold rounded-2xl p-8 md:p-12 bg-card shadow-sm font-montserrat"
      >
        {/* 1. Project/Church Name */}
        <div className="mb-6">
          <FormInput
            label="1. Your mission/project name"
            required
            registration={register("projectName")}
            error={errors.projectName}
          />
        </div>

        {/* 2. Short Description */}
        <div className="mb-6">
          <FormTextarea
            label="2. Short Description of Your Project:"
            required
            registration={register("description")}
            error={errors.description}
            rows={6}
          />
        </div>

        {/* 3 & 4. Upload Photo and Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Main Photo */}
          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <FormFileUpload
                label="3. Upload one main photo that will appear on your public card"
                required
                accept="image/jpeg,image/png,image/webp"
                maxSize={5 * 1024 * 1024}
                icon={<Upload className="w-6 h-6 text-[#C4A053]" />}
                helperText="JPG/PNG Max 5MB — Choose a photo that shows your project activity or church community."
                error={errors.photo as never}
                onChange={(files) => field.onChange(files)}
              />
            )}
          />

          {/* Video */}
          <Controller
            name="video"
            control={control}
            render={({ field }) => (
              <FormFileUpload
                label="4. Upload a Video(optional)"
                accept="video/mp4,video/webm"
                maxSize={50 * 1024 * 1024}
                icon={<Video className="w-6 h-6 text-[#C4A053]" />}
                helperText="MP4, Max 50MB — A short introduction or news if you have one."
                error={errors.video as never}
                onChange={(files) => field.onChange(files)}
              />
            )}
          />

          {/* ✅ Additional Photos (optional) */}
          <Controller
            name="additionalPhotos"
            control={control}
            render={({ field }) => (
              <FormFileUpload
                label="5. Additional Photos (optional)"
                accept="image/jpeg,image/png,image/webp"
                maxSize={5 * 1024 * 1024}
                icon={<Upload className="w-6 h-6 text-[#C4A053]" />}
                helperText="JPG/PNG/WebP Max 5MB each — You may upload extra photos to show your mission or community."
                error={errors.additionalPhotos as never}
                onChange={(files) => field.onChange(files)}
              />
            )}
          />
        </div>

        {/* 5. Country / Region */}
        <div className="mb-6">
          <FormSelect
            label="5. Country"
            required
            registration={register("country")}
            error={errors.country}
            options={countries}
          />
        </div>

        {/* 6. Contact Details */}
        <div className="mb-6">
          <h3 className="text-lg capitalize font-medium">
            6. Contact Information (Displayed Publicly)
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Please share how people can contact and support your church.
          </p>

          <div className="space-y-4">
            <FormInput
              label="Church Email Address"
              subLabel="(For donors or partners to contact you directly.)"
              required
              type="email"
              registration={register("contactEmail")}
              error={errors.contactEmail}
            />

            <FormInput
              label="Church Website or Social Media Link"
              subLabel="(Your main online page – e.g., website, Facebook, or Instagram.)"
              type="url"
              registration={register("website")}
              error={errors.website}
            />

            <FormInput
              label="Donation Link (optional)"
              subLabel="(If you accept online donations, add the direct link here – e.g., PayPal, bank page, or fundraising site.)"
              type="url"
              registration={register("donationLink")}
              error={errors.donationLink}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mb-8">
          {/* <label className="block text-gray-700 font-medium mb-2">
            Security Question <span className="text-red-500">*</span>
          </label> */}
          <div className="flex items-center gap-4">
            <div className="bg-gray-50 border border-gray-300 rounded-md px-4 py-3 text-lg font-semibold">
              {mathQuestion.question} = ?
            </div>
            <FormInput
              label=""
              type="text"
              registration={register("mathAnswer")}
              placeholder="Your answer"
              error={errors.mathAnswer}
            />
            {errors.mathAnswer && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mathAnswer.message}
              </p>
            )}
          </div>

          <p className="text-gray-500 text-sm mt-2">
            Please solve this simple math problem to verify you're human
          </p>
        </div>
        {timeWarning && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-yellow-800 text-sm text-center">{timeWarning}</p>
          </div>
        )}
        <div className="flex justify-center">
          <CTAButton type="submit" disabled={isSubmitting || submitAttempted}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-label="Loading"
                >
                  <title>Loading</title>
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </span>
            ) : submitAttempted ? (
              "Submitted"
            ) : (
              "Join the Alliance for Free"
            )}
          </CTAButton>
        </div>
      </form>
    </section>
  );
};
