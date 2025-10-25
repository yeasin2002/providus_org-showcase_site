"use client";

import { CTAButton } from "@/components/shared/buttons";
import { missions } from "@/data/mission.data";
import { useState } from "react";
import { MissionCard } from "./mission-card";

export default function MissionsToSupport() {
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(
    null
  );

  const handleCardToggle = (index: number) => {
    const isClosing = expandedCardIndex === index;

    setExpandedCardIndex(isClosing ? null : index);

    // If closing, scroll back to the card after a brief delay
    if (isClosing) {
      const mission = missions[index];
      const cardId = `mission-card-${mission.projectTitle
        .toLowerCase()
        .replace(/\s+/g, "-")}`;

      setTimeout(() => {
        const element = document.getElementById(cardId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    }
  };

  return (
    <section className="w-full bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16" id="missions">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Missions to Support
          </h2>
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {missions.map((mission, index) => (
            <MissionCard
              key={mission.projectTitle}
              mission={mission}
              isExpanded={expandedCardIndex === index}
              onToggle={() => handleCardToggle(index)}
            />
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
