"use client";
import bgImg from "@/assets/background.jpg";
import logoImg from "@/assets/logo.svg";
import star from "@/assets/star.png";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
};

export const HeroTopArea = ({ title, description }: Props) => {
  return (
    <div className="">
      <div
        style={{
          backgroundImage: `url(${bgImg.src})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 max-h-[80vh]" />

        <div className="relative font-montserrat">
          <div className="max-w-7xl mx-auto">
            <Image
              src={logoImg}
              alt="Logo"
              className="md:w-28 md:h-28 w-16 h-16 mx-auto absolute top-5 z-50"
            />
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-50">
              <a
                href="#join-here"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("join-here");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-white text-lg font-montserrat font-normal hover:text-gold transition-colors duration-300"
              >
                Join here
              </a>
            </div>
          </div>
          {/* ↓ Updated height from 92dvh to 80vh */}
          <div className="relative min-h-[75vh] flex items-center justify-center overflow-hidden container mx-auto">
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6 font-montserrat">
                {title}
              </h1>
              <p className="md:text-xl text-md text-gray-200 mx-auto mb-10 leading-relaxed w-full">
                {description}
              </p>
            </div>
          </div>
          <div className="h-[80px] bg-gold flex justify-center items-center">
            <Image src={star} alt="star" className="mr-3" />
            <div className="text-center ">
              <h3 className="md:text-[24px] text-[12px] font-semibold text-[#FFFFFF] leading-3 uppercase">
                INTERNATIONAL CHURCH SUPPORT Alliance
              </h3>
            </div>
            <Image src={star} alt="star" className="ml-3" />
          </div>
        </div>
      </div>
    </div>
  );
};
