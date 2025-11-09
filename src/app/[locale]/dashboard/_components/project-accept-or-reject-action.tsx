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
        <AlertDialogContent className="overflow-y-scroll min-w-5xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div>
            <Label htmlFor="placeholder" className="mb-2 mt-8">
              Select Placeholder
            </Label>
            <Select
              onValueChange={(value) => setPlaceholder(value)}
              value={placeholder}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Placeholder" />
              </SelectTrigger>
              <SelectContent id="placeholder">
                <SelectItem value="spotlight">Spotlight</SelectItem>
                <SelectItem value="mission">Mission</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-red-500 text-xs"> {placeholderError} </p>

            <div>
              <MissionCard key={project.id} mission={project} />
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
