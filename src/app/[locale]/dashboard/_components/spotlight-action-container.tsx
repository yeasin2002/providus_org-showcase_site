"use client";

import { Button } from "@/components/ui/button";
import type { Churches } from "@/types";
import { supabase } from "@/utils/supabase/client";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ProjectActionCard } from ".";

interface SpotlightActionContainerProps {
  projects: Churches[];
}

export const SpotlightActionContainer = ({
  projects,
}: SpotlightActionContainerProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {projects.map((project) => (
        <ProjectActionCard
          key={project.id}
          project={project}
          render={PendingAction}
        />
      ))}
    </div>
  );
};

const PendingAction = (project: Churches, setOpen: (open: boolean) => void) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleApproveAndReject = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .update({ is_spotlight: !project.is_spotlight })
        .eq("id", project.id);

      console.log("🚀 ~ handleApproveAndReject ~ data:", data);

      if (error) throw error;
      toast.success(`Status Updated`);

      // Close the dialog
      setOpen(false);

      // Refresh server component data
      router.refresh();
    } catch (error) {
      console.log("🚀 ~ handleApproveAndReject ~ error:", error);
      toast.error("Failed to update project status");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      variant={project.is_spotlight ? "destructive" : "default"}
      onClick={handleApproveAndReject}
      className="gap-2 cursor-pointer"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <>
          {project.is_spotlight ? (
            <XCircle className="h-4 w-4" />
          ) : (
            <CheckCircle className="h-4 w-4" />
          )}
          {project.is_spotlight ? "Remove Spotlight" : "Spotlight"}
        </>
      )}
    </Button>
  );
};
