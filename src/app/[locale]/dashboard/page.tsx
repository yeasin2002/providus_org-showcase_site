import { createClient } from "@/utils/supabase/server";
import { ShowPendingProjects } from "./_components/show-pending-projects";

const Dashboard = async () => {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "pending");
  console.log("🚀 ~ Dashboard ~ projects:", projects);

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Project Review Dashboard</h1>
        <p className="text-muted-foreground">
          Review and approve pending project submissions
        </p>
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
