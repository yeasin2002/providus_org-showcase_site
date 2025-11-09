"use client";

import { Button } from "@/components/ui/button";
import type { Project, ProjectStatus } from "@/types";
import { supabase } from "@/utils/supabase/client";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { MissionCard } from "@/components/home/mission/mission-card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSendEmail } from "@/hooks/useSendEmail";

export interface ShowPendingProjectsProps {
  project: Project;
  setOpen: (open: boolean) => void;
  refetchProjects: () => void;
}

export const ProjectAcceptOrRejectAction = ({
  project,
  setOpen,
  refetchProjects,
}: ShowPendingProjectsProps) => {
  const { sendEmail } = useSendEmail();
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

  const [placeholderError, setPlaceholderError] = useState<
    string | undefined
  >();
  const [placeholder, setPlaceholder] = useState<string | undefined>();

  const handleApproveAndReject = async (
    type: ProjectStatus,
    is_spotlight = false
  ) => {
    if (type === "approved") {
      setIsApproving(true);
    } else {
      setIsRejecting(true);
    }

    try {
      const { data, error } = await supabase
        .from("projects")
        .update({ status: type, approved_at: new Date(), is_spotlight })
        .select(`*,churches (*)`)
        .eq("id", project.id);
      console.log("🚀 ~ handleApproveAndReject ~ data:", data);

      if (error) throw error;

      toast.success(
        `Project ${type === "approved" ? "approved" : "rejected"} successfully`
      );

      // Close the dialog
      setOpen(false);

      // Refresh server component data
      refetchProjects();
      const emailSubject =
        type === "approved"
          ? "Congratulations! Your ICSA Project Has Been Approved"
          : "Update on Your ICSA Project Submission";

      const emailText =
        type === "approved"
          ? `Dear ${project?.churches?.name},

Congratulations! Your project "${
              project?.project_name
            }" has been approved and is now live on the ICSA Showcase Site.

Your mission story is now visible to supporters and partners worldwide at:
${process.env.NEXT_PUBLIC_SITE_URL || "https://voices.icsa.church"}

What's Next:
- Your project is now publicly visible on our showcase grid
- Visitors can view your full mission story, photos, and videos
- Your ICSA membership certificate will be sent in a separate email

Thank you for being part of the ICSA community and sharing your important work with the world.

Blessings,
The ICSA Team

---
This is an automated message. Please do not reply to this email.`
          : `Dear ${project?.churches?.name},

Thank you for submitting your project "${
              project?.project_name
            }" to the ICSA Showcase Site.

After careful review, we are unable to approve this project at this time.
If you have questions or would like to resubmit with updates, please feel free to reach out to our support team.

We appreciate your interest in ICSA and encourage you to submit future projects that align with our guidelines.

Blessings,
The ICSA Team

---
This is an automated message. Please do not reply to this email.`;

      await sendEmail({
        to: project?.churches?.contact_email as string,
        subject: emailSubject,
        text: emailText,
      });
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
    <>
      <Button
        variant="destructive"
        onClick={() => handleApproveAndReject("rejected")}
        className="gap-2 bg-gold"
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
        onClick={() => setIsAcceptModalOpen(true)}
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

      <AlertDialog
        open={isAcceptModalOpen}
        onOpenChange={() => {
          setPlaceholderError(undefined);
          setPlaceholder(undefined);
        }}
      >
        <AlertDialogContent className="max-h-[90vh] flex flex-col min-w-5xl py-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="overflow-y-auto flex-1 pr-2">
            <Label htmlFor="placeholder" className="mb-2 mt-8">
              Select Placeholder
            </Label>
            <Select
              onValueChange={(value) => setPlaceholder(value)}
              value={placeholder}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder="Select Placeholder"
                  className="text-xl"
                />
              </SelectTrigger>
              <SelectContent id="placeholder">
                <SelectItem value="spotlight">Spotlight</SelectItem>
                <SelectItem value="mission">Mission</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-red-500 text-xs"> {placeholderError} </p>

            <div className="mt-8">
              <p className="text-xl font-semibold mb-2">Preview</p>
              <div className="grid grid-cols-2">
                <MissionCard key={project.id} mission={project} />
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAcceptModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (!placeholder) {
                  return setPlaceholderError("Please select a placeholder");
                }
                await handleApproveAndReject(
                  "approved",
                  placeholder === "spotlight"
                );
                setIsAcceptModalOpen(false);
                setOpen(false);
              }}
            >
              {isApproving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Continue"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
