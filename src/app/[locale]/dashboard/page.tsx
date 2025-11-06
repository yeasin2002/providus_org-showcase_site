import { createClient } from "@/utils/supabase/server";
import { ProjectApprovalCard } from "./_components";

const Dashboard = async () => {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "pending");

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectApprovalCard
              key={project.id}
              project={project}
              // onApprove={(id) => console.log("Approve:", id)}
              // onReject={(id) => console.log("Reject:", id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
