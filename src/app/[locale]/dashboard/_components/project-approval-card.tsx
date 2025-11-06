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
import { supabase } from "@/utils/supabase/client";
import {
  Calendar,
  CheckCircle,
  Edit,
  ExternalLink,
  Loader2,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type Project = {
  id: string;
  church_id: string;
  project_name: string;
  short_description: string;
  main_photo_url: string;
  video_url?: string;
  language: string;
  country: string;
  submitted_at: string;
  approved_at?: string | null;
  additional_photos?: string;
  church_email: string;
  church_website?: string;
  donation_link?: string;
  status: string;
};

type ProjectApprovalCardProps = {
  project: Project;
  // onApprove?: (projectId: string) => void;
  // onReject?: (projectId: string) => void;
};

export const ProjectApprovalCard = ({ project }: ProjectApprovalCardProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const additionalPhotos = project.additional_photos
    ? JSON.parse(project.additional_photos)
    : [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const handleApproveAndReject = async (type: "approved" | "rejected") => {
    if (type === "approved") {
      setIsApproving(true);
    } else {
      setIsRejecting(true);
    }

    try {
      const { data, error } = await supabase
        .from("projects")
        .update({ status: type, approved_at: new Date() })
        .eq("id", project.id);
      console.log("🚀 ~ handleApproveAndReject ~ data:", data);

      if (error) throw error;

      toast.success(
        `Project ${type === "approved" ? "approved" : "rejected"} successfully`
      );

      // Close the dialog
      setOpen(false);

      // Refresh server component data
      router.refresh();
    } catch (error) {
      console.log("🚀 ~ handleApproveAndReject ~ error:", error);
      toast.error("Failed to update project status");
    } finally {
      if (type === "approved") {
        setIsApproving(false);
      } else {
        setIsRejecting(false);
      }
    }
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

                {/* Additional Photos */}
                {additionalPhotos.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Additional Photos</h3>
                    <div className="space-y-4">
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
                )}

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
              <Button
                variant="destructive"
                onClick={() => handleApproveAndReject("rejected")}
                className="gap-2"
                disabled={isRejecting}
              >
                {isRejecting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <XCircle className="h-4 w-4" />
                    Reject
                  </>
                )}
              </Button>
              <Button
                onClick={() => handleApproveAndReject("approved")}
                className="gap-2"
                disabled={isApproving}
              >
                {isApproving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Approve
                  </>
                )}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
