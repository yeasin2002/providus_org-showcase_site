import { fontVariables } from "@/lib/fonts";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import "./../globals.css";
import { routing } from "@/i18n/routing";

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

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
