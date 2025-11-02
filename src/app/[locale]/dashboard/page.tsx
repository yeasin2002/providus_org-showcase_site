import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const Dashboard = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: churches } = await supabase.from("churches").select();
  console.log("🚀 ~ Dashboard ~ churches:", churches);
  return <div>Dashboard</div>;
};

export default Dashboard;
