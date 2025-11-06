import { HeroTopArea } from "@/components/shared/hero-top-area";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { FooterUpload } from "./footerUpload";
import { ProjectUploadForm } from "./project-upload-form";
import { UploadRestrictions } from "./upload-restrictions";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function Upload({ searchParams }: Props) {
  const { token } = await searchParams;
  if (!token) redirect("/");

  const supabase = await createClient();

  // Optimized: Only select necessary fields for church validation
  const { data: church } = await supabase
    .from("churches")
    .select("*")
    .eq("id", token)
    .single();

  if (!church) redirect("/");

  // Optimized: Count active projects (approved + pending) without fetching all data
  // Using count with head: true returns only the count, not the actual rows
  const { count: activeProjectsCount } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("church_id", token)
    .in("status", ["approved", "pending"])
    .eq("archived", false);

  const isRestricted = (activeProjectsCount ?? 0) >= 5;

  return (
    <div>
      <HeroTopArea
        title="Share Your Church's Mission and Connect with Supporters Directly "
        description="This is where your church can upload project details, photos, and videos to be featured on the ICSA page. "
      />

      {isRestricted ? (
        <UploadRestrictions />
      ) : (
        <ProjectUploadForm
          churchesId={token}
          churchName={church.church_name}
          contact_email={church.contact_email}
        />
      )}
      <FooterUpload />
    </div>
  );
}
