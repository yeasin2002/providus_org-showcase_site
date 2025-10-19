import React from "react";
import banner from "@/assets/hero.png.jpg";
import Image from "next/image";
export default function HeroSection() {
  return (
    <section className="w-full bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full h-[900px] mx-auto">
        {/* Banner Container */}
        <div className="relative h-[400px] md:h-[450px] lg:h-full rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src={banner}
              alt="Hands holding wooden cross together in unity"
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/40 to-black/50"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-end pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-4">
              {/* Badge */}
              <div className="inline-block mb-6">
                <span className="bg-yellow-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">
                  Connect
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
                Here you'll find missions and stories that make the world
                better. Discover them, be inspired, and support churches
                directly through their own links and contacts.
              </h2>

              {/* Subtext */}
              <p className="text-gray-200 text-base md:text-lg lg:text-xl max-w-2xl">
                Every story here is a door to real change— and a chance for you
                to stand with a church in need.
              </p>
            </div>
          </div>

          {/* Decorative Corner Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-600/10 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-600/10 rounded-tr-full"></div>
        </div>
      </div>
    </section>
  );
}
