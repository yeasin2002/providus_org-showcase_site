import React from "react";
import { ArrowRight, Clock } from "lucide-react";
import { MissionCard } from "./mission-card";
import { CTAButton } from "@/components/shared/buttons";

export default function MissionsToSupport() {
  const missions = [
    {
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop",
      category: "Education",
      categoryColor: "bg-yellow-600",
      title: "Disease Management Programs",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "APRIL 15, 2022",
    },
    {
      image:
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&h=600&fit=crop",
      category: "Foundation",
      categoryColor: "bg-yellow-600",
      title: "Disease Management Programs",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "APRIL 15, 2022",
    },
    {
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
      category: "Development",
      categoryColor: "bg-yellow-600",
      title: "Disease Management Programs",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "APRIL 15, 2022",
    },
    {
      image:
        "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=800&h=600&fit=crop",
      category: "Education",
      categoryColor: "bg-yellow-600",
      title: "Disease Management Programs",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "APRIL 15, 2022",
    },
    {
      image:
        "https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=800&h=600&fit=crop",
      category: "Foundation",
      categoryColor: "bg-yellow-600",
      title: "Disease Management Programs",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "APRIL 15, 2022",
    },
    {
      image:
        "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&h=600&fit=crop",
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
