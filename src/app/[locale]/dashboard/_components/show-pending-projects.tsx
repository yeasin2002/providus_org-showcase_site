"use client";

import type { Project } from "@/types";
import { ProjectActionCard } from ".";
import { ProjectAcceptOrRejectAction } from "./project-accept-or-reject-action";
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
            let statusAction: React.ReactNode;
            if (proj.status === "pending") {
              statusAction = (
                <ProjectAcceptOrRejectAction
                  project={proj}
                  setOpen={setOpen}
                  refetchProjects={refetchProjects}
                />
              );
            } else if (
              proj.status === "deleted" ||
              proj.status === "rejected" ||
              proj.status === "approved"
            ) {
              statusAction = (
                <UnpublishAction project={proj} setOpen={setOpen} />
              );
            }
            return statusAction;
          }}
        />
      ))}
    </div>
  );
};
