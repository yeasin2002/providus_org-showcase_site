import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import { DashboardHeader } from "./dashboard-heading";

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
