import { HeroTopArea } from "@/components/shared/hero-top-area";
import { FooterUpload } from "../upload/footerUpload";
import { JoinFormSection } from "./join-form";

export default function JoinPage() {
  return (
    <div>
      <HeroTopArea
        title="A few minutes today can give your church global visibility and direct support."
        description="Your work matters. The Providus Alliance gives you a space to share it in detail — so donors and supporters can truly see the heart of your project."
      />
      <JoinFormSection />
      <FooterUpload />
    </div>
  );
}
