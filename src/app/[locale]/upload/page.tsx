import { HeroTopArea } from "@/components/shared/hero-top-area";
import { FooterUpload } from "./footerUpload";
import { ProjectUploadForm } from "./project-upload-form";
type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function Upload({ searchParams }: Props) {
  const { token } = await searchParams;
  console.log("🚀 ~ Upload ~ searchParams:", token);
  return (
    <div>
      <HeroTopArea
        title="Share Your Church’s Mission and Connect with Supporters Directly "
        description="This is where your church can upload project details, photos, and videos to be featured on the ICSA page. "
      />

      <ProjectUploadForm />
      <FooterUpload />
    </div>
  );
}
