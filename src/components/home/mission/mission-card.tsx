"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { ChevronDown, ChevronUp, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface MissionCardProps {
  mission: Project;
}

export function MissionCard({ mission }: MissionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Truncate short description to 200-250 characters
  const truncatedDescription =
    mission?.short_description?.length > 250
      ? mission?.short_description?.substring(0, 247) + "..."
      : mission.short_description;

  // Generate unique ID for this card
  const cardId = `mission-card-${mission.project_name
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  const handleToggle = () => {
    const isClosing = isExpanded;
    setIsExpanded(!isExpanded);

    // If closing, scroll back to the card top after animation completes
    if (isClosing) {
      setTimeout(() => {
        const element = document.getElementById(cardId);
        if (element) {
          const yOffset = -100; // Offset from top (adjust for header/navbar)
          const y =
            element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 350); // Wait for collapse animation to complete (300ms + buffer)
    }
  };

  return (
    <article
      id={cardId}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 font-work-sans scroll-mt-24"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden group">
        <Image
          src={mission.main_photo_url}
          alt={mission.project_name}
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <Button className="text-white bg-gold hover:bg-gold/90 h-7 text-xs px-3 pointer-events-none">
            {mission?.churches?.name}
          </Button>
        </div>

        {/* Church Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {mission.project_name}
        </h3>

        {/* Project Title */}
        <h4 className="text-lg font-semibold text-gray-700 mb-2">
          {mission.project_name}
        </h4>

        {/* Country/Region */}
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span>{mission.country}</span>
        </div>

        {/* Short Description (200-250 chars) */}
        <p className="text-gray-600 text-base mb-4">{truncatedDescription}</p>

        {/* Expanded Content */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="pt-4 border-t space-y-6">
            {/* Full Description */}
            <div>
              <h5 className="font-semibold text-gray-900 mb-3 text-lg">
                About This Mission
              </h5>
              <p className="text-gray-600 text-base whitespace-pre-line leading-relaxed">
                {mission.short_description}
              </p>
            </div>

            <Image
              src={mission.additional_photo}
              alt={mission.project_name}
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />

            {/* Video if available */}
            {mission.video_url && (
              <div>
                <h5 className="font-semibold text-gray-900 mb-3 text-lg">
                  Video
                </h5>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {mission.video_url.includes("youtube.com") ||
                  mission.video_url.includes("youtu.be") ? (
                    <iframe
                      src={mission.video_url}
                      title="Mission video"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={mission.video_url}
                      controls
                      className="w-full h-full"
                    >
                      <track kind="captions" />
                    </video>
                  )}
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-3 text-lg">
                Contact This Mission
              </h5>
              <div className="space-y-3">
                {mission?.churches?.contact_email && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600 font-medium min-w-[80px]">
                      Email:
                    </span>
                    <a
                      href={`mailto:${mission?.churches?.contact_email}`}
                      className="text-gold hover:underline break-all"
                    >
                      {mission?.churches?.contact_email}
                    </a>
                  </div>
                )}
                {mission?.churches?.website && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600 font-medium min-w-[80px]">
                      Website:
                    </span>
                    <a
                      href={mission?.churches?.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:underline break-all"
                    >
                      {mission?.churches?.website}
                    </a>
                  </div>
                )}
                {mission.donation_link && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600 font-medium min-w-[80px]">
                      Donate:
                    </span>
                    <a
                      href={mission.donation_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:underline break-all"
                    >
                      Support this mission
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Read More / Close Button */}
        <button
          onClick={handleToggle}
          className="inline-flex items-center gap-2 text-gold font-semibold text-sm hover:gap-3 transition-all mt-2"
          type="button"
        >
          <span className="underline text-gold text-base font-bold">
            {isExpanded ? "CLOSE" : "READ MORE"}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>
    </article>
  );
}
