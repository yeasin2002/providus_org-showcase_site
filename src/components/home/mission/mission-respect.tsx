import support1 from "@/assets/support1.png";
import support2 from "@/assets/support2.jpg";
import support3 from "@/assets/support3.png";
import support4 from "@/assets/support4.jpg";
import support5 from "@/assets/support5.png";
import support6 from "@/assets/support6.jpg";
import { CTAButton } from "@/components/shared/buttons";
import { MissionCard } from "./mission-card";

export default function MissionsToSupport() {
  const missions = [
    {
      image: support1,
      category: "Education",
      categoryColor: "bg-yellow-600",
      title: "Disease Management Programs",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "APRIL 15, 2022",
    },
    {
      image: support2,
      category: "Foundation",
      categoryColor: "bg-yellow-600",
      title: "Disease Management Programs",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "APRIL 15, 2022",
    },
    {
      image: support3,
      category: "Development",
      categoryColor: "bg-yellow-600",
      title: "Disease Management Programs",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "APRIL 15, 2022",
    },
    {
      image: support4,

      category: "Education",
      categoryColor: "bg-yellow-600",
      title: "Disease Management Programs",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "APRIL 15, 2022",
    },
    {
      image: support5,
      category: "Foundation",
      categoryColor: "bg-yellow-600",
      title: "Disease Management Programs",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "APRIL 15, 2022",
    },
    {
      image: support6,
      category: "Development",
      categoryColor: "bg-yellow-600",
      title: "Disease Management Programs",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "APRIL 15, 2022",
    },
  ];

  return (
    <section className="w-full bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Missions to Support
          </h2>
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {missions.map((mission, index) => (
            <MissionCard key={index} mission={mission} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center">
          <CTAButton text="Load More Stories" />
        </div>
      </div>
    </section>
  );
}
