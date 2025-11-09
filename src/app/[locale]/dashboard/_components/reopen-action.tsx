"use client";

import { Button } from "@/components/ui/button";
import type { Project } from "@/types";
import { supabase } from "@/utils/supabase/client";
import { CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  project: Project;
  setOpen: (open: boolean) => void;
}

export const ReopenAction = ({ project, setOpen }: Props) => {
  const router = useRouter();
  const [isReopening, setIsReopening] = useState(false);

  const handleReopen = async () => {
    setIsReopening(true);

    try {
      const { error } = await supabase
        .from("projects")
        .update({ status: "approved", approved_at: new Date() })
        .eq("id", project.id);

      if (error) throw error;

      toast.success("Project reopened and approved successfully");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to reopen project:", error);
      toast.error("Failed to reopen project");
    } finally {
      setIsReopening(false);
    }
  };

  return (
    <Button
      onClick={handleReopen}
      className="gap-2 cursor-pointer"
      disabled={isReopening}
    >
      {isReopening ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <>
          <CheckCircle className="h-4 w-4" />
          Reopen & Approve
        </>
      )}
    </Button>
  );
};
