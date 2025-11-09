"use client";

import { Button } from "@/components/ui/button";
import type { Project, ProjectStatus } from "@/types";
import { supabase } from "@/utils/supabase/client";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

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

  const handleApproveAndReject = async (type: ProjectStatus) => {
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
    </>
  );
};
