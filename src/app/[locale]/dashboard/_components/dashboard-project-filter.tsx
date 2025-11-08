"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectStatus } from "@/types";

import { useQueryState } from "nuqs";

export const DashboardProjectFilter = () => {
  const [name, setName] = useQueryState<ProjectStatus | "all">("status", {
    defaultValue: "all",
    parse: (value: string) => value as ProjectStatus,
  });
  const handleStatus = (value: ProjectStatus) => {
    setName(value);
  };

  return (
    <div>
      <Select onValueChange={handleStatus} value={name || ""}>
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
    </div>
  );
};
