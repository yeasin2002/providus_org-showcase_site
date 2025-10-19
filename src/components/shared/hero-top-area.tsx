import bgImg from "@/assets/background.jpg";
import logoImg from "@/assets/logo.svg";
import star from "@/assets/star.png";
import Image from "next/image";

type Props = {
  title: string;
  description: string;
};

export const HeroTopArea = ({ title, description }: Props) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImg.src})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/20" />

      <div className="relative font-montserrat">
        <div className="container mx-auto">
          <Image
            src={logoImg}
            alt="Logo"
            className="w-32 h-32 mx-auto absolute top-5 z-50"
          />
        </div>
        <div className="relative min-h-[92dvh] flex items-center justify-center overflow-hidden container mx-auto">
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl  font-bold text-white leading-tight mb-6 font-montserrat">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-200  mx-auto mb-10 leading-relaxed w-full">
              {description}
            </p>
          </div>
        </div>
        <div className="h-[80px] bg-[#C79C44] flex justify-center items-center">
          <Image src={star} alt="star" className="mr-3" />
          <div className="text-center ">
            <h3 className="md:text-[24px] text-[16px] font-semibold text-[#FFFFFF] leading-3">
              INTERNATIONAL CHURCH SUPPORT ALL
            </h3>
          </div>
          <Image src={star} alt="star" className="ml-3" />
        </div>
      </div>
    </div>
  );
};
