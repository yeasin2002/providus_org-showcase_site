"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/types";
import { supabase } from "@/utils/supabase/client";
import { Loader2, RefreshCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ShowPendingProjects } from "./_components";

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<ProjectStatus | "all">("all");

  const fetchProjects = useMemo(
    () => async () => {
      setLoading(true);
      let query = supabase.from("projects").select(`*,churches (*)`);

      if (status && status !== "all") {
        query = query.eq("status", status);
      }

      const { data: projects } = (await query) as { data: Project[] };
      setProjects(projects || []);
      setLoading(false);
    },
    [status]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <>
  useEffect(() => {
    fetchProjects();
  }, [status]);

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Project Review Dashboard</h1>
          <p className="text-muted-foreground">
            Review and approve pending project submissions
          </p>
        </div>
        <div className="flex items-center  gap-x-2">
          <Select
            onValueChange={(value: ProjectStatus) => setStatus(value)}
            value={status || ""}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={"outline"}
            onClick={fetchProjects}
            disabled={loading}
          >
            <RefreshCcw className={cn("h-4 w-4 ", loading && "animate-spin")} />
            <span className="sr-only">refresh</span>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </div>
      ) : !projects || projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No <span className="font-semibold">"{status}"</span> projects to
            review
          </p>
        </div>
      ) : (
        <ShowPendingProjects
          projects={projects}
          refetchProjects={fetchProjects}
        />
      )}
    </div>
  );
};

export default Dashboard;
