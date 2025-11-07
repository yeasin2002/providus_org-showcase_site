"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, MapPin } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

interface Mission {
  mainImage: StaticImageData;
  extraImages?: StaticImageData[];
  churchName: string;
  projectTitle: string;
  country: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  videoUrl?: string;
  contactEmail?: string;
  website?: string;
  donationLink?: string;
}



interface MissionCardProps {
  mission: Mission;
}

export function MissionCard({ mission }: MissionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = [mission.mainImage, ...(mission.extraImages || [])];
  const hasMultipleImages = allImages.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  // Truncate short description to 200-250 characters
  const truncatedDescription =
    mission.shortDescription.length > 250
      ? mission.shortDescription.substring(0, 247) + "..."
      : mission.shortDescription;

  // Generate unique ID for this card
  const cardId = `mission-card-${mission.projectTitle
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
          src={mission.mainImage}
          alt={mission.projectTitle}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <Button className="text-white bg-gold hover:bg-gold/90 h-7 text-xs px-3 pointer-events-none">
            {mission.category}
          </Button>
        </div>

        {/* Church Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {mission.churchName}
        </h3>

        {/* Project Title */}
        <h4 className="text-lg font-semibold text-gray-700 mb-2">
          {mission.projectTitle}
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
                {mission.fullDescription}
              </p>
            </div>

            {/* Photo Gallery (if multiple images) */}
            {hasMultipleImages && (
              <div>
                <h5 className="font-semibold text-gray-900 mb-3 text-lg">
                  Photo Gallery
                </h5>
                <div className="relative">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={allImages[currentImageIndex]}
                      alt={`${mission.projectTitle} - Image ${
                        currentImageIndex + 1
                      }`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Carousel Controls */}
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronUp className="w-5 h-5 -rotate-90" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronDown className="w-5 h-5 -rotate-90" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {currentImageIndex + 1} / {allImages.length}
                  </div>
                </div>

                {/* Thumbnail Navigation */}
                <div className="flex gap-2 mt-3 overflow-x-auto">
                  {allImages.map((img, idx) => (
                    <button
                      key={`thumb-${mission.projectTitle}-${idx}`}
                      type="button"
                      onClick={() => setCurrentImageIndex(idx)}
                      className={cn(
                        "shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                        currentImageIndex === idx
                          ? "border-gold"
                          : "border-transparent opacity-60 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Video if available */}
            {mission.videoUrl && (
              <div>
                <h5 className="font-semibold text-gray-900 mb-3 text-lg">
                  Video
                </h5>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {mission.videoUrl.includes("youtube.com") ||
                  mission.videoUrl.includes("youtu.be") ? (
                    <iframe
                      src={mission.videoUrl}
                      title="Mission video"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={mission.videoUrl}
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
                {mission.contactEmail && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600 font-medium min-w-[80px]">
                      Email:
                    </span>
                    <a
                      href={`mailto:${mission.contactEmail}`}
                      className="text-gold hover:underline break-all"
                    >
                      {mission.contactEmail}
                    </a>
                  </div>
                )}
                {mission.website && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600 font-medium min-w-[80px]">
                      Website:
                    </span>
                    <a
                      href={mission.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:underline break-all"
                    >
                      {mission.website}
                    </a>
                  </div>
                )}
                {mission.donationLink && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600 font-medium min-w-[80px]">
                      Donate:
                    </span>
                    <a
                      href={mission.donationLink}
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
