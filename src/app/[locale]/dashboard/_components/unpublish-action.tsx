"use client";

import { Button } from "@/components/ui/button";
import type { Project } from "@/types";
import { supabase } from "@/utils/supabase/client";
import { Loader2, XCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  project: Project;
  setOpen: (open: boolean) => void;
  refetchProjects: () => void;
}

export const UnpublishAction = ({
  project,
  setOpen,
  refetchProjects,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleApproveAndReject = async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("projects")
        .update({ status: "deleted", approved_at: new Date() })
        .eq("id", project.id);
      console.log("🚀 ~ handleApproveAndReject ~ data:", data);

      if (error) throw error;

      toast.success(`Project unpublished} successfully`);
      setOpen(false);
      refetchProjects();
    } catch (error) {
      console.log("🚀 ~ handleApproveAndReject ~ error:", error);
      toast.error("Failed to update project status");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      variant="destructive"
      onClick={() => handleApproveAndReject()}
      className="gap-2 cursor-pointer"
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <>
          <XCircle className="h-4 w-4" />
          Unpublish
        </>
      )}
    </Button>
  );
};
