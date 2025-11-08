import { ProjectStatus } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { ShowPendingProjects } from "./_components";
import { DashboardProjectFilter } from "./_components/dashboard-project-filter";

interface Props {
  searchParams: { status: ProjectStatus };
}

const Dashboard = async ({ searchParams }: Props) => {
  console.log("🚀 ~ Dashboard ~ searchParams:", searchParams);

  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("status", searchParams.status);

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Project Review Dashboard</h1>
          <p className="text-muted-foreground">
            Review and approve pending project submissions
          </p>
        </div>
        <DashboardProjectFilter />
      </div>

      {!projects || projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No pending projects to review</p>
        </div>
      ) : (
        <ShowPendingProjects projects={projects} />
      )}
    </div>
  );
};

export default Dashboard;
