import React from "react";

import bgImag from "@/assets/background.jpg";
import logo from "@/assets/logo.svg";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex font-montserrat">
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden "
        style={{ backgroundColor: "#000000 " }}
      >
        <div
          style={{ backgroundImage: `url(${bgImag.src})` }}
          className="absolute w-full h-full bg-no-repeat bg-fixed bg-center bg-cover opacity-50"
        ></div>
        <div className="relative z-10 flex flex-col justify-between w-full px-12 py-12">
          <Image src={logo} alt="logo" />

          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl text-white mb-6 leading-tight font-bold">
              Admin Access
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Review and approve church mission projects to help them reach
              supporters worldwide.
            </p>
          </div>

          <div className="text-white/70 text-sm">
            <span>© 2025 ICSA - International Church Support Alliance</span>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default AuthLayout;
