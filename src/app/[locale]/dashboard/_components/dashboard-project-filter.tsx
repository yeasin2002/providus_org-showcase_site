"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProjectStatus } from "@/types";

interface Props {
  status: ProjectStatus | "all";
  setStatus: (value: ProjectStatus) => void;
}

export const DashboardProjectFilter = ({ status, setStatus }: Props) => {
  const handleStatus = (value: ProjectStatus) => {
    setStatus(value);
  };

  return (
    <div>
      <Select onValueChange={handleStatus} value={status || ""}>
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
