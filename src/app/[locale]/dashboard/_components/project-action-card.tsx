"use client";

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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types";
import { Calendar, Edit, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
          <Badge variant="secondary" className="shrink-0">
            {project.country.toUpperCase()}
          </Badge>
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

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button size="sm" className="cursor-pointer">
              <Edit />
              Review
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="min-w-4xl max-h-[90vh] overflow-y-auto">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl">
                {project.project_name}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-base">
                Review project details and take action
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="space-y-6">
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
                <div>
                  <h3 className="font-semibold mb-1">Description</h3>
                  <p className="text-sm text-muted-foreground">
                    {project.short_description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-1">Country</h3>
                    <p className="text-sm text-muted-foreground">
                      {project.country.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Language</h3>
                    <p className="text-sm text-muted-foreground">
                      {project.language.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">Church Email</h3>
                  <p className="text-sm text-muted-foreground">
                    {project.church_email}
                  </p>
                </div>

                {project.church_website && (
                  <div>
                    <h3 className="font-semibold mb-1">Church Website</h3>
                    <a
                      href={project.church_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      {project.church_website}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}

                {project.donation_link && (
                  <div>
                    <h3 className="font-semibold mb-1">Donation Link</h3>
                    <a
                      href={project.donation_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      {project.donation_link}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}

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

                {/* {additionalPhotos.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Additional Photos</h3>
                    
                      {additionalPhotos.map((photoUrl: string) => (
                        <div
                          key={photoUrl}
                          className="relative min-h-24 rounded-lg overflow-hidden h-56"
                        >
                          <Image
                            src={photoUrl}
                            alt="Additional photo"
                            fill
                            className="object-cover aspect-video"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )} */}

                <div>
                  <h3 className="font-semibold mb-1">Submitted</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(project.submitted_at)}
                  </p>
                </div>
              </div>
            </div>

            <AlertDialogFooter className="gap-2 sm:gap-2">
              <AlertDialogCancel>Close</AlertDialogCancel>
              {render(project, setOpen)}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
