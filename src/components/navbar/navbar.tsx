"use client";
import logo from "@/assets/navLogo.png";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
export default function CleanNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Missions to Support", href: "#missions" },
    { label: "Spotlight", href: "#spotlight" },
    { label: "About the Alliance", href: "#about" },
  ];

  return (
    <nav className="w-full   top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20 pt-10 gap-x-72">
          {/* Logo */}
          <div className="flex items-center gap-3 group">
            <Image
              src={logo}
              alt="logo"
              height={100}
              width={100}
              className="size-32 "
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 font-montserrat ">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-900 font-normal text-[15px] transition-colors duration-200 relative group font-montserrat lg:text-lg"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-900 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
            type="button"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-blue-900 font-medium transition-colors rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
