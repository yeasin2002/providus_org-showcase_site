import footerImg from "@/assets/ngoFooterImg.png";
import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import { Footer } from "../shared/footer";

export default function NGOCTAWithFooter() {
  return (
    <div className="w-full">
      {/* CTA Banner Section */}
      <section className="w-full bg-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 -mb-40 md:-mb-48">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gold">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
              {/* Text Section */}
              <div className="flex items-center p-6 sm:p-10 lg:p-16">
                <div className="max-w-xl mx-auto text-center lg:text-left">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                    Are you part of an NGO or church?
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base md:text-lg mb-8">
                    Join the Providus Alliance today to share your story,
                    showcase your project, and connect with global donors and
                    partners.
                  </p>
                  <button
                    className="bg-white hover:bg-gray-100 text-yellow-600 font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full flex items-center justify-center mx-auto lg:mx-0 gap-4 transition-all duration-300 shadow-md hover:shadow-xl group"
                    type="button"
                  >
                    <span className="text-sm sm:text-base">
                      Join the Alliance
                    </span>
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-yellow-600 text-white rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <MoveUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Image Section */}
              <div className="relative h-56 sm:h-72 md:h-80 lg:h-auto">
                <Image
                  src={footerImg}
                  alt="Person praying with cross necklace"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer className="w-full bg-black text-white pt-40 md:pt-48" />
    </div>
  );
}
