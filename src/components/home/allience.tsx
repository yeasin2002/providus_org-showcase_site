import mainImg from "@/assets/fellowshipMain.png";
import { CTAButton, PrimaryButton } from "@/components/shared/buttons";
import Image from "next/image";

export default function Alliance() {
  //   const features = [
  //     {
  //       icon: <Award className="w-6 h-6" />,
  //       text: "Pastors who invite others receive Founding Church badges on their profile.",
  //       img: icon,
  //     },
  //     {
  //       icon: <Globe className="w-6 h-6" />,
  //       title: "Churches are introduced to global partners",
  //       text: "Churches are introduced to global partners — with prayer and recognition.",
  //       img: icon2,
  //     },
  //     {
  //       icon: <Heart className="w-6 h-6" />,
  //       text: "Every new church story is welcomed and prayed for in the alliance.",
  //       img: icon3,
  //     },
  //   ];

  return (
    <div className="w-full bg-white py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="space-y-8">
            <div className=" space-y-6">
              <PrimaryButton>About The Alience</PrimaryButton>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                About the Alliance
              </h2>
              <p className="text-[#737373] text-[18px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            <CTAButton>Share My Church’s Story Today</CTAButton>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="relative  rounded-br-[150px] overflow-hidden shadow-2xl">
              <Image
                src={mainImg}
                alt="Church ceremony with pastor in purple vestments"
                className="w-full h-[500px] md:h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
