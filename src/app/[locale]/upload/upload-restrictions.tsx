import startSharpIcon from "@/assets/star-sharp.svg";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const UploadRestrictions = () => {
  return (
    <section
      className="py-16 px-4 md:px-8 max-w-5xl mx-auto font-rubik"
      id="join-here"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="bg-[#F7F3E8] text-[#023C5E] rounded-full px-6 py-1 mb-4">
          <Image src={startSharpIcon} alt="Star" />
          <span className="text-xl font-bold">Share Your Story</span>
        </Badge>

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          You can only submit 5 projects,
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Please contact with admin to remove existing projects
        </p>
      </div>
    </section>
  );
};
