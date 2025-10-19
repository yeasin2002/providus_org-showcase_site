"use client"
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function NavbarHeroSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Missions to Support", href: "#missions" },
    { label: "Spotlight", href: "#spotlight" },
    { label: "About the Alliance", href: "#about" },
  ];

  return (
    <div className="w-full">
      {/* Navbar */}
      <nav className="bg-white shadow-md relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center relative">
                <div className="w-10 h-10 border-4 border-yellow-500 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
              <div className="text-blue-900">
                <div className="text-[10px] font-bold uppercase tracking-wider leading-tight">
                  International
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider leading-tight">
                  Churches Support
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider leading-tight">
                  Alliance
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
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
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-yellow-600 font-medium transition-colors rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&h=900&fit=crop"
            alt="Hands holding wooden cross together"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-block mb-6">
              <span className="bg-yellow-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">
                Connect
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
              Here you'll find missions and stories that make the world better.
              Discover them, be inspired, and support churches directly through
              their own links and contacts.
            </h1>

            {/* Subtext */}
            <p className="text-gray-200 text-base md:text-lg lg:text-xl mb-8">
              Every story here is a door to real change— and a chance for you to
              stand with a church in need.
            </p>
          </div>
        </div>

        {/* Decorative Bottom Curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
