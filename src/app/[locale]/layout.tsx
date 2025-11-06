import { routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import "./../globals.css";
import { RootLayoutWrapper } from "./root-layout";

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
        <RootLayoutWrapper>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </RootLayoutWrapper>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
