"use client";

import startSharpIcon from "@/assets/star-sharp.svg";
import { CTAButton } from "@/components/shared/buttons";
import { FormFileUpload } from "@/components/shared/form-file-upload";
import { FormInput } from "@/components/shared/form-input";
import { FormSelect } from "@/components/shared/form-select";
import { FormTextarea } from "@/components/shared/form-textarea";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, Video } from "lucide-react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const projectSchema = z.object({
  projectName: z
    .string()
    .min(2, "Project/Church name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  photo: z.any().refine((files) => files && files.length > 0, {
    message: "Photo is required",
  }),
  video: z.any().optional(),
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
});

type ProjectFormData = z.infer<typeof projectSchema>;

// Sample countries - replace with your full list
const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "bd", label: "Bangladesh" },
  { value: "in", label: "India" },
  // Add more countries as needed
];

export const ProjectUploadForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = async (data: ProjectFormData) => {
    console.log("Form submitted:", data);
    // TODO: Implement API call to submit data to Supabase
  };

  return (
    <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto font-rubik">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="bg-[#F7F3E8] text-[#023C5E] rounded-full px-6 py-1 mb-4">
          <Image src={startSharpIcon} alt="Star" />
          <span className="text-xl font-bold">Contact Us</span>
        </Badge>

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Donors and partners will contact you directly
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          You don't need to do everything at once — you can always upload more
          projects later. A small step today can create real opportunities for
          your ministry.
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
            label="1. Project/Church Name"
            required
            registration={register("projectName")}
            error={errors.projectName}
          />
        </div>

        {/* 2. Short Description */}
        <div className="mb-6">
          <FormTextarea
            label="2. Short Description"
            required
            registration={register("description")}
            error={errors.description as any}
            rows={6}
          />
        </div>

        {/* 3 & 4. Upload Photo and Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <FormFileUpload
                label="3. Upload A Photo"
                required
                accept="image/jpeg,image/png,image/webp"
                maxSize={5 * 1024 * 1024}
                icon={<Upload className="w-6 h-6 text-[#C4A053]" />}
                helperText="JPG/PNG Max 5MB — Choose A Photo That Shows Your Project Activity Or Church Community"
                error={errors.photo as any}
                onChange={(files) => field.onChange(files)}
              />
            )}
          />

          <Controller
            name="video"
            control={control}
            render={({ field }) => (
              <FormFileUpload
                label="4. Upload A Video"
                accept="video/mp4,video/webm"
                maxSize={50 * 1024 * 1024}
                icon={<Video className="w-6 h-6 text-[#C4A053]" />}
                helperText="MP4, Max 50MB — A Short Introduction Or News If You Have One"
                error={errors.video as any}
                onChange={(files) => field.onChange(files)}
              />
            )}
          />
        </div>

        {/* 5. Country / Region */}
        <div className="mb-6">
          <FormSelect
            label="5. Country / Region"
            required
            registration={register("country")}
            error={errors.country}
            options={countries}
          />
        </div>

        {/* 6. Contact Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">
            6. Contact Details (Shown Publicly)
          </h3>

          <div className="space-y-4">
            <FormInput
              label="Where Can People Reach You?"
              required
              type="email"
              registration={register("contactEmail")}
              error={errors.contactEmail}
            />

            <FormInput
              label="Do You Have A Website?"
              type="url"
              registration={register("website")}
              error={errors.website}
            />

            <FormInput
              label="Can People Donate Online To You?"
              type="url"
              registration={register("donationLink")}
              error={errors.donationLink}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col items-center gap-4">
          <CTAButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Publishing..." : "Publish My Story"}
          </CTAButton>
          <p className="text-sm text-muted-foreground text-center max-w-2xl">
            This Is Just The Beginning. You Can Add More Projects Anytime To
            Help Them Be Discovered By Donors And Supporters
          </p>
        </div>
      </form>
    </section>
  );
};
