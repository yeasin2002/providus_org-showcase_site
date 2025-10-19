import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface Mission {
  image: StaticImageData;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  date: string;
}

interface SpotLigtCardProps {
  mission: Mission;
}

export function SpotLigtCard({ mission }: SpotLigtCardProps) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      {/* Image */}
      <div className="relative h-48 sm:h-56 md:h-60 lg:h-64 overflow-hidden">
        <Image
          src={mission.image}
          alt={mission.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6 flex flex-col justify-between flex-grow">
        {/* Category + Date */}
        <div className="flex justify-between items-center text-gray-500 text-xs sm:text-sm mb-3 flex-wrap gap-2">
          <Button
            className={`text-white ${mission.categoryColor} px-3 py-1 text-xs sm:text-sm font-medium rounded-full`}
          >
            {mission.category}
          </Button>

          <div className="flex items-center gap-1 sm:gap-2 text-gray-500">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <time dateTime={mission.date}>{mission.date}</time>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-yellow-600 transition-colors leading-snug">
          {mission.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 leading-relaxed line-clamp-3">
          {mission.description}
        </p>

        {/* Read More */}
        <a
          href="#"
          className="inline-flex items-center gap-2 text-yellow-600 font-semibold text-sm sm:text-base hover:gap-3 transition-all group"
        >
          <span className="underline text-[#C79C44] font-bold tracking-wide">
            READ MORE
          </span>
        </a>
      </div>
    </article>
  );
}
