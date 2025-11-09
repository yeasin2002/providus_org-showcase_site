"use client";

import { useForm } from "react-hook-form";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { FormInput } from "@/components/shared/form-input";
import { FormSelect } from "@/components/shared/form-select";
import { FormTextarea } from "@/components/shared/form-textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { countries } from "@/data/countries-data";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Edit, MapPinned, Save } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { ProjectFormData } from "../../upload/types";
import { projectSchema } from "../../upload/types";

type ProjectApprovalCardProps = {
  project: Project;
  render: (
    project: Project,
    setOpen: (open: boolean) => void
  ) => React.ReactNode;
};

export const ProjectActionCard = ({
  project,
  render,
}: ProjectApprovalCardProps) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: project.project_name,
      description: project.short_description,
      country: project.country,
      contactEmail: project.church_email,
      website: project.church_website || "",
      donationLink: project.donation_link || "",
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const countriesData = countries.map((country) => ({
    value: country.label,
    label: country.label,
  }));

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setIsEditing(false);
      reset();
    }
  };

  const onSaveChanges = async (data: ProjectFormData) => {
    // TODO: Implement save logic here
    console.log("Saving changes:", data);
    setIsEditing(false);
  };

  return (
    <Card className="overflow-hidden pt-0">
      <div className="relative h-48 w-full">
        <Image
          src={project.main_photo_url}
          alt={project.project_name}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-1">{project.project_name}</CardTitle>
          <div className="space-x-2">
            <Badge variant="secondary" className="shrink-0 uppercase">
              <MapPinned />
              {project.country}
            </Badge>

            <Badge
              variant="secondary"
              className={cn("shrink-0 capitalize", {
                "bg-green-500 text-white": project.status === "approved",
                "bg-red-500 text-white": project.status === "rejected",
                "bg-yellow-500 text-white": project.status === "pending",
                "bg-gray-500 text-white": project.status === "deleted",
              })}
            >
              <Calendar />
              {project.status}
            </Badge>
          </div>
        </div>
        <CardDescription className="line-clamp-2">
          {project.short_description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between gap-2">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {formatDate(project.submitted_at)}
        </div>

        <AlertDialog open={open} onOpenChange={handleOpenChange}>
          <AlertDialogTrigger asChild>
            <Button size="sm" className="cursor-pointer">
              <Edit />
              Review
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="min-w-6xl max-h-[90vh] overflow-y-auto">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl">
                {project.project_name}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-base">
                {isEditing
                  ? "Edit project details and save changes"
                  : "Review project details and take action"}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <form onSubmit={handleSubmit(onSaveChanges)} className="space-y-6">
              {/* Main Photo */}
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <Image
                  src={project.main_photo_url}
                  alt={project.project_name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Project Details */}
              <div className="space-y-4">
                {/* Project Name */}
                <FormInput
                  label="Project Name"
                  required
                  registration={register("projectName")}
                  error={errors.projectName}
                  inputClassName={!isEditing ? "bg-muted" : ""}
                  disabled={!isEditing}
                />

                {/* Description */}
                <FormTextarea
                  label="Description"
                  required
                  registration={register("description")}
                  error={errors.description}
                  rows={6}
                  textareaClassName={!isEditing ? "bg-muted" : ""}
                  disabled={!isEditing}
                />

                {/* Country and Language */}
                <div className="grid grid-cols-2 gap-4">
                  <FormSelect
                    label="Country"
                    required
                    registration={register("country")}
                    error={errors.country}
                    options={countriesData}
                    disabled={!isEditing}
                  />
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="language-field"
                      className="text-lg capitalize font-medium"
                    >
                      Language
                    </label>
                    <input
                      id="language-field"
                      type="text"
                      value={project.language.toUpperCase()}
                      disabled
                      className="min-h-10 shadow-none bg-muted rounded-md border border-input px-3 py-2 text-sm"
                      readOnly
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact Information</h3>

                  <FormInput
                    label="Church Email"
                    required
                    type="email"
                    registration={register("contactEmail")}
                    error={errors.contactEmail}
                    inputClassName={!isEditing ? "bg-muted" : ""}
                    disabled={!isEditing}
                  />

                  <FormInput
                    label="Church Website"
                    type="url"
                    registration={register("website")}
                    error={errors.website}
                    inputClassName={!isEditing ? "bg-muted" : ""}
                    disabled={!isEditing}
                  />

                  <FormInput
                    label="Donation Link"
                    type="url"
                    registration={register("donationLink")}
                    error={errors.donationLink}
                    inputClassName={!isEditing ? "bg-muted" : ""}
                    disabled={!isEditing}
                  />
                </div>

                {/* Video */}
                {project.video_url && (
                  <div>
                    <h3 className="font-semibold mb-2">Video</h3>
                    <video
                      src={project.video_url}
                      controls
                      className="w-full rounded-lg aspect-video"
                    >
                      <track kind="captions" />
                    </video>
                  </div>
                )}

                {/* Submission Date */}
                <div>
                  <h3 className="font-semibold mb-1">Submitted</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(project.submitted_at)}
                  </p>
                </div>
              </div>

              <AlertDialogFooter className="gap-2 sm:gap-2">
                <AlertDialogCancel className="cursor-pointer">
                  Close
                </AlertDialogCancel>

                {isEditing ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        reset();
                      }}
                    >
                      Cancel Edit
                    </Button>
                    <Button type="submit" disabled={isSubmitting || !isDirty}>
                      <Save className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Details
                    </Button>
                    {render(project, setOpen)}
                  </>
                )}
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
