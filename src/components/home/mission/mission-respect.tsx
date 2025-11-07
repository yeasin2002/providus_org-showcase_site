import { CTAButton } from "@/components/shared/buttons";
import { missions } from "@/data/mission.data";
import { MissionCard } from "./mission-card";

export default function MissionsToSupport() {
  return (
    <section className="w-full bg-white py-4 md:py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16" id="missions">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Missions to Support
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {missions.map((mission) => (
            <MissionCard key={mission.projectTitle} mission={mission} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center">
          <CTAButton>Load more Stories</CTAButton>
        </div>
      </div>
    </section>
  );
}
