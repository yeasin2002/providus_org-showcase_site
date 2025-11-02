import logoImage from "@/assets/logo.svg";

import { cn } from "@/lib/utils";
import { Facebook, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props extends React.ComponentProps<"footer"> {}

export function FooterUpload({ className }: Props) {
  // const recentPosts = [
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=200&h=200&fit=crop",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=200&h=200&fit=crop",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=200&h=200&fit=crop",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=200&h=200&fit=crop",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1757609211191-f0a93f7c270b?w=200&h=200&fit=crop",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=200&h=200&fit=crop",
  //   },
  // ];

  return (
    <footer className={cn("w-full bg-black text-white", className)} id="join">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            {/* Logo */}
            <Image src={logoImage} alt="Logo" width={100} height={100} />

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed">
              Join a worldwide fellowship of churches and open <br /> new doors
              of support for your ministry.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* <Link
                href="/"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link> */}
              {/* <Link
                href="/"
                className="w-10 h-10 bg-yellow-600 hover:bg-yellow-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link> */}
              <Link
                href="/"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              {/* <Link
                href="/"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link> */}
            </div>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="size-2 bg-gold rounded-full  transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="text-gray-400 text-sm leading-relaxed pt-2">
                  66 road Broklyn Street 600
                  <br />
                  New York, USA
                </p>
              </li>
              {/* <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <a
                  href="tel:8509627192"
                  className="text-gray-400 hover:text-gold text-sm transition-colors"
                >
                  (850) 562 7192
                </a>
              </li> */}
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <a
                  href="mailto:hello@internationalchurchesalliance.com"
                  className="text-gray-400 hover:text-gold text-sm transition-colors break-all"
                >
                  hello@internationalchurches
                  <br />
                  alliance.com
                </a>
              </li>
            </ul>
          </div>

          {/* Recent Post */}
          {/* <div>
            <h3 className="text-white font-bold text-lg mb-6">Recent Post</h3>
            <div className="grid grid-cols-3 gap-2">
              {recentPosts.map((post, index) => (
                <a
                  key={crypto.randomUUID()}
                  href="/"
                  className="aspect-square rounded-lg overflow-hidden hover:opacity-75 transition-opacity"
                >
                  <Image
                    src={post.image}
                    alt={`Recent post ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={500}
                    height={500}
                  />
                </a>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#FFFFFF]">
            <p>Copyright© 2024. All Rights Reserved.</p>
            <div className="flex items-center gap-4">
              <a href="/" className="hover:text-yellow-600 transition-colors">
                Terms & Conditions
              </a>
              <span>|</span>
              <a href="/" className="hover:text-yellow-600 transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
