"use client";
import { CTAButton } from "@/components/shared/buttons";
import { Heading } from "@/components/shared/headingt";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { SpotLigtCard } from "./sportlight-card";

import support1 from "@/assets/support1.png";
import support2 from "@/assets/support2.jpg";
import support3 from "@/assets/support3.png";
import support4 from "@/assets/support4.jpg";
import support5 from "@/assets/support5.png";
import support6 from "@/assets/support6.jpg";

export default function Spotlight() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const spotlight = [
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

  // Responsive items per page
  const getItemsPerPage = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  // Adjust items per page on resize
  if (typeof window !== "undefined") {
    window.addEventListener("resize", () => {
      setItemsPerPage(getItemsPerPage());
    });
  }

  const maxIndex = Math.ceil(spotlight.length / itemsPerPage) - 1;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const visibleMissions = spotlight.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative">
        <Heading title="Spotlight" />

        {/* Carousel Container */}
        <div className="relative flex items-center">
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 md:-left-10 lg:-left-14 z-10 bg-white p-2 sm:p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Previous"
            type="button"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Cards */}
          <div className="flex gap-4 sm:gap-6 lg:gap-8 overflow-hidden w-full justify-center px-10 sm:px-12 md:px-16">
            {visibleMissions.map((mission) => (
              <div
                key={mission.title}
                className="flex-shrink-0 w-full sm:w-[45%] lg:w-[32%] transition-transform"
              >
                <SpotLigtCard mission={mission} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-0 md:-right-10 lg:-right-14 z-10 bg-white p-2 sm:p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Next"
            type="button"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-10 sm:mt-12">
          <CTAButton>Load More Stories</CTAButton>
        </div>
      </div>
    </section>
  );
}
