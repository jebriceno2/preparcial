import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { notFound } from "next/navigation"; 
import { getDictionary, hasLocale } from "./dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const locales= ['es', 'en'];

export async function generateStaticParams() {  
  return locales.map((locale) => ({ lang: locale }));
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(
  { params }: { params: Promise<{ lang: "es" | "en" }> }
): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return {
    title: dict.meta?.title ?? "App",
    description: dict.meta?.description ?? ""
  };
}
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!locales.includes(lang)) {
    notFound();
  }
  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Header lang={""}></Header>
      <main>{children}</main>
      <Footer></Footer>
      </body>
    </html>
  );
}
