import banner from "@/assets/hero.png.jpg";
import Image from "next/image";
import CleanNavbar from "../navbar/navbar";

export default function HeroSection() {
  return (
    // 🌸 Soft peach-pink gradient background
    <div className="lg:min-h-screen  bg-gradient-to-b from-[#FF6D000F] via-[#FF6D000F] to-white ">
      <CleanNavbar />

      <section className="w-full py-8 md:py-12 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-[1800px] mx-auto">
          {/* Hero Container */}
          <div className="relative h-[450px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[750px] rounded-3xl overflow-hidden shadow-2xl">
            {/* Background Image + Overlay */}
            <div className="absolute inset-0">
              <Image
                src={banner}
                alt="Hands holding wooden cross together in unity"
                className="w-full h-full object-cover"
                priority
              />
              {/* Dark overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/40 to-black/50" />
            </div>

            {/* Content Section */}
            <div className="relative z-10 h-full flex items-end sm:items-center md:items-end pb-8 sm:pb-10 md:pb-16">
              <div className="max-w-[1400px] mx-auto text-left px-4 sm:px-6 md:px-8 lg:px-12">
                {/* Badge */}
                <div className="inline-block mb-4 sm:mb-6">
                  <span className="bg-yellow-600 text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">
                    Connect
                  </span>
                </div>

                {/* Heading */}
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-snug sm:leading-tight mb-4 sm:mb-6">
                  Here you'll find missions and stories that make the world
                  better. Discover them, be inspired, and support churches
                  directly through their own links and contacts.
                </h2>

                {/* Subtext */}
                <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed">
                  Every story here is a door to real change— and a chance for
                  you to stand with a church in need.
                </p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-yellow-600/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 bg-yellow-600/10 rounded-tr-full"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
