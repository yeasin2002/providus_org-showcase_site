"use client";

import type { Project } from "@/types";
import { ProjectActionCard } from ".";
import { ProjectAcceptOrRejectAction } from "./project-accept-or-reject-action";
import { ReopenAction } from "./reopen-action";
import { UnpublishAction } from "./unpublish-action";

interface ShowPendingProjectsProps {
  projects: Project[];
  refetchProjects: () => void;
}

export const ShowPendingProjects = ({
  projects,
  refetchProjects,
}: ShowPendingProjectsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectActionCard
          key={project.id}
          project={project}
          render={(proj, setOpen) => {
            // Pending projects: Show Approve/Reject actions
            if (proj.status === "pending") {
              return (
                <ProjectAcceptOrRejectAction
                  project={proj}
                  setOpen={setOpen}
                  refetchProjects={refetchProjects}
                />
              );
            }

            // Approved projects: Show Unpublish action
            if (proj.status === "approved") {
              return <UnpublishAction project={proj} setOpen={setOpen} />;
            }

            // Rejected or Deleted projects: Show Reopen action
            if (proj.status === "rejected" || proj.status === "deleted") {
              return <ReopenAction project={proj} setOpen={setOpen} />;
            }

            return null;
          }}
        />
      ))}
    </div>
  );
};
