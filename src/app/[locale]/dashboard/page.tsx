import { createClient } from "@/utils/supabase/server";

const Dashboard = async () => {
  const supabase = await createClient();

  const { data: churches, error } = await supabase.from("churches").select();

  if (error) {
    console.error("Error fetching churches:", error);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(churches, null, 2)}
      </pre>
    </div>
  );
};

export default Dashboard;
