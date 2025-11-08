"use client";

import { Button } from "@/components/ui/button";
import type { Project } from "@/types";
import { supabase } from "@/utils/supabase/client";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ProjectActionCard } from ".";

interface ShowPendingProjectsProps {
  projects: Project[];
}

// Component wrapper for PendingAction to properly use hooks
const PendingActionWrapper = ({
  project,
  setOpen,
}: {
  project: Project;
  setOpen: (open: boolean) => void;
}) => {
  const router = useRouter();
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

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
    <>
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
    </>
  );
};

export const ShowPendingProjects = ({ projects }: ShowPendingProjectsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {projects.map((project) => (
        <ProjectActionCard
          key={project.id}
          project={project}
          render={(proj, setOpen) => (
            <PendingActionWrapper project={proj} setOpen={setOpen} />
          )}
        />
      ))}
    </div>
  );
};

// Export for backward compatibility if needed elsewhere
export const PendingAction = (
  project: Project,
  setOpen: (open: boolean) => void
) => <PendingActionWrapper project={project} setOpen={setOpen} />;
