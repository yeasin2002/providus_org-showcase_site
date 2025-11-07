import { Heading } from "@/components/shared/headingt";
// import { spotlight } from "@/data/spotlight.data";
import { createClient } from "@/utils/supabase/server";
import { SpotLightCard } from "./sportlight-card";

export default async function Spotlight() {
  const supabase = await createClient();
  const { data: spotlight } = await supabase
    .from("churches")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  if (!spotlight || spotlight.length === 0) {
    return null;
  }

  return (
    <section
      className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      id="spotlight"
    >
      <div className="max-w-7xl mx-auto">
        <Heading title="Spotlight" />

        {/* Spotlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spotlight.map((church) => (
            <SpotLightCard key={church.id} item={church} />
          ))}
        </div>
      </div>
    </section>
  );
}
