import React from "react";
import logo from "../../assets/logo.svg";
import footerImg from "../../assets/ngoFooterImg.png";
import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Mail,
  MoveUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NGOCTAWithFooter() {
  const quickLinks = [
    { label: "Home", href: "#" },
    { label: "Why Join", href: "#" },
    { label: "How it works", href: "#" },
    { label: "Stories", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Vision", href: "#" },
  ];

  return (
    <div className="w-full">
      {/* CTA Banner Section */}
      <section className="w-full bg-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 -mb-40 md:-mb-48">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#C79C44]">
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
                  <button className="bg-white hover:bg-gray-100 text-yellow-600 font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full flex items-center justify-center mx-auto lg:mx-0 gap-4 transition-all duration-300 shadow-md hover:shadow-xl group">
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

      {/* Footer */}
      <footer className="w-full bg-black text-white pt-40 md:pt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {/* Brand Section */}
            <div className="space-y-6 text-center sm:text-left">
              <div className="flex justify-center sm:justify-start">
                <Image src={logo} alt="logo" />
              </div>

              <p className="text-white text-base md:text-lg leading-relaxed">
                Join a worldwide fellowship of churches and open new doors of
                support for your ministry.
              </p>

              <div className="flex justify-center sm:justify-start items-center gap-3 flex-wrap">
                <a
                  href="#"
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-yellow-600 hover:bg-yellow-700 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-white font-bold text-xl sm:text-2xl mb-5">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-white hover:text-yellow-600 transition-colors text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center sm:text-left">
              <h3 className="text-white font-bold text-xl sm:text-2xl mb-5">
                Contact
              </h3>
              <ul className="space-y-5">
                <li className="flex justify-center sm:justify-start items-start gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <p className="text-white text-sm sm:text-base leading-relaxed">
                    66 Road, Broklyn Street 600 <br /> New York, USA
                  </p>
                </li>
                <li className="flex justify-center sm:justify-start items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <a
                    href="tel:8509627192"
                    className="text-white hover:text-yellow-600 text-sm sm:text-base transition-colors"
                  >
                    (850) 562 7192
                  </a>
                </li>
                <li className="flex justify-center sm:justify-start items-start gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <a
                    href="mailto:hello@internationalchurchesalliance.com"
                    className="text-white hover:text-yellow-600 text-sm sm:text-base transition-colors break-all"
                  >
                    hello@internationalchurches
                    <br />
                    alliance.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm sm:text-base text-white text-center md:text-left">
            <p>Copyright© 2024. All Rights Reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-yellow-600 transition-colors">
                Terms & Conditions
              </a>
              <span>|</span>
              <a href="#" className="hover:text-yellow-600 transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
