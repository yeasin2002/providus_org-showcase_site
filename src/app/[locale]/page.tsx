import NGOCTAWithFooter from "@/components/footer/NGOCTAWithFooter";
import Alliance from "@/components/home/allience";
import HeroSection from "@/components/home/hero-section";
import MissionsToSupport from "@/components/home/mission/mission-respect";
import RelatedPostsSection from "@/components/home/reletedSection/RelatedPostsSection";
import Spotlight from "@/components/home/spotlight/spotlight";

const RootPage = () => {
  return (
    <div>
      <HeroSection />
      <MissionsToSupport />
      <Spotlight />
      <RelatedPostsSection />
      <Alliance />
      <NGOCTAWithFooter />
    </div>
  );
};

export default RootPage;
