import { MissionCard } from "@/components/home/mission/mission-card";
import { Heading } from "@/components/shared/headingt";
import { createClient } from "@/utils/supabase/server";

export default async function Spotlight() {
  const supabase = await createClient();
  const { data: spotlightData = [] } = await supabase
    .from("projects")
    .select(`*,churches (*)`)
    .eq("status", "approved")
    .eq("is_spotlight", true)
    .order("approved_at", { ascending: false });

  if (!spotlightData || spotlightData.length === 0) return null;
  
  return (
    <section
      className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      id="spotlight"
    >
      <div className="max-w-7xl mx-auto">
        <Heading title="Spotlight" />

        {/* Spotlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spotlightData.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      </div>
    </section>
  );
}
