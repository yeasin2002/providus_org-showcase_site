import { fontVariables } from "@/lib/fonts";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import "./../globals.css";
import NavbarHeroSection from "@/components/navbar/navbar";

export const metadata: Metadata = {
  title: "ICSA",
  description: "international church support all",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontVariables}  antialiased`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
