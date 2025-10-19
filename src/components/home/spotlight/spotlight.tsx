"use client";
import { CTAButton } from "@/components/shared/buttons";
import { Heading } from "@/components/reusable/headingt";
import { useState } from "react";
import { SpotLigtCard } from "./sportlight-card";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Spotlight() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const spotlight = [
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

  const itemsPerPage = 3;
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

        {/* Carousel Wrapper */}
        <div className="relative flex items-center">
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute -left-15 z-10 bg-white p-3 rounded-full shadow hover:bg-gray-100"
            aria-label="Previous"
          >
            <ArrowLeft />
          </button>

          {/* Cards */}
          <div className="flex gap-8 overflow-hidden w-full">
            {visibleMissions.map((mission, index) => (
              <SpotLigtCard key={index} mission={mission} />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute -right-15 z-10 bg-white p-3 rounded-full shadow hover:bg-gray-100"
            aria-label="Next"
          >
            <ArrowRight />
          </button>
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-8">
          <CTAButton text="Load More Stories" />
        </div>
      </div>
    </section>
  );
}
