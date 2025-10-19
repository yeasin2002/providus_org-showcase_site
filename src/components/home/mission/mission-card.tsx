import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import Image, { StaticImageData } from "next/image";
interface Mission {
  image: StaticImageData;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  date: string;
}

export function MissionCard({ mission }: { mission: Mission }) {
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={mission.image}
          alt={mission.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Category Badge */}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <div className="flex justify-between items-center gap-2 text-gray-500 text-sm mb-3">
          <div>
            <Button className="text-[#ffffff] bg-[#C79C44]">
              {mission.category}
            </Button>
          </div>
          <div className="flex justify-between items-center gap-2 text-gray-500 text-sm mb-3">
            <Clock className="w-4 h-4" />
            <time dateTime={mission.date}>{mission.date}</time>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[24px] font-semibold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
          {mission.title}
        </h3>

        {/* Description */}
        <p className="text-[#8A8A8A] text-[18px] font-regular mb-4">
          {mission.description}
        </p>

        {/* Read More Link */}
        <a
          href="#"
          className="inline-flex items-center gap-2 text-yellow-600 font-semibold text-sm hover:gap-3 transition-all group"
        >
          <span className="underline text-[#C79C44] text-[18px] font-bold">
            READ MORE
          </span>
        </a>
      </div>
    </article>
  );
}
