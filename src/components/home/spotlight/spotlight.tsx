"use client";

import { MissionCard } from "@/components/home/mission/mission-card";
import { Heading } from "@/components/shared/headingt";
import { spotlight } from "@/data/spotlight.data";
import { useState } from "react";

export default function Spotlight() {
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(
    null
  );

  const handleCardToggle = (index: number) => {
    const isClosing = expandedCardIndex === index;
    setExpandedCardIndex(isClosing ? null : index);

    // If closing, scroll back to the card after a brief delay
    if (isClosing) {
      const mission = spotlight[index];
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
    <section
      className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      id="spotlight"
    >
      <div className="max-w-7xl mx-auto">
        <Heading title="Spotlight" />

        {/* Spotlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spotlight.map((mission, index) => (
            <MissionCard
              key={mission.projectTitle}
              mission={mission}
              isExpanded={expandedCardIndex === index}
              onToggle={() => handleCardToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
