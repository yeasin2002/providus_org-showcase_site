import { Footer } from "@/components/shared/footer";
import { HeroTopArea } from "@/components/shared/hero-top-area";
import { ProjectUploadForm } from "./project-upload-form";
import { FooterUpload } from "./footerUpload";

export default function Upload() {
  return (
    <div>
      <HeroTopArea
        title="Share Your Church’s Mission and Connect with Supporters Directly "
        description="This is where your church can upload project details, photos, and videos to be 
featured on the ICSA page. "
      />

      <ProjectUploadForm />
       <FooterUpload />
       
    </div>
  );
}
