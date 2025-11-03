import { createClient } from "@/utils/supabase/server";

async function getChurches() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("churches").select("*");

  if (error) {
    console.error("Error fetching churches:", error);
    return [];
  }

  return data || [];
}

const Dashboard = async () => {
  const churches = await getChurches();
  console.log("🚀 ~ Dashboard ~ churches:", churches);
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
