import { routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "react-hot-toast";
import "./../globals.css";

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
        <NextIntlClientProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
