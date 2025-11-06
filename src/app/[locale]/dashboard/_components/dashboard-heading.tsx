"use client";

import Link from "next/link";
// import { Logo } from "@/components/logo";
import logo from "@/assets/logo-dark.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/utils/supabase/client";
import { LogOut as LogOutIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// const menuItems = [
//   { name: "Features", href: "#link" },
//   { name: "Solution", href: "#link" },
//   { name: "Pricing", href: "#link" },
//   { name: "About", href: "#link" },
// ];

export const DashboardHeader = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Logout successfully");
     return  router.push("/login");
    } catch (error) {
      console.log("🚀 ~ handleLogout ~ error:", error);
      toast.error("Logout failed");
    }
  };
  return (
    <header className="border-b border-gray-200">
      <nav
        className={cn(
          "w-full transition-colors duration-150 container mx-auto"
        )}
      >
        <div className="flex w-full items-center justify-between gap-12 lg:w-auto ">
          <Link
            href="/"
            aria-label="home"
            className="flex items-center space-x-2"
          >
            <Image src={logo} alt="logo" className="size-20" />
          </Link>

          <Button onClick={handleLogout} className="cursor-pointer">
            <LogOutIcon className="size-5" />
            <span>Logout</span>
          </Button>
        </div>
      </nav>
    </header>
  );
};

{
  /* <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div> */
}
