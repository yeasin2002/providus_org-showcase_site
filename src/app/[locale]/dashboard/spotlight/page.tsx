import { createClient } from "@/utils/supabase/server";
import { SpotlightActionContainer } from "../_components";

const Dashboard = async () => {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "approved");

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Spotlight Projects</h1>
        <p className="text-muted-foreground">
          Chose projects to be spotlighted
        </p>
      </div>

      {!projects || projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects to spotlight</p>
        </div>
      ) : (
        <SpotlightActionContainer projects={projects} />
      )}
    </div>
  );
};

export default Dashboard;
