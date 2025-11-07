import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "./_components";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return redirect("/login");

  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
};

export default DashboardLayout;
