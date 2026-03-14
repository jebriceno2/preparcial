"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderProps = {
  lang: string;
};

export default function Header({ lang }: HeaderProps) {
  const pathname = usePathname();

  function buildLocalePath(newLang: string) {
    if (!pathname) return `/${newLang}`;

    const segments = pathname.split("/");
    segments[1] = newLang;
    return segments.join("/");
  }
  const currentLang = pathname?.split("/")[1] || "en";

  return (
    <header className="w-full bg-[#FDB608]">
      <div className="mx-auto flex w-fit flex-col items-center px-4 pb-3 pt-2">
        <Link href={`/${lang}`} className="block">
          <Image
            src="https://www.clipartmax.com/png/full/71-713336_harry-potter-logo-harry-potter-logo-png.png"
            alt="Harry Potter"
            width={135}
            height={48}
            priority
            className="h-auto w-auto object-contain"
          />
        </Link>

        <div className="mt-1 flex items-center justify-center gap-3">
        <Link
            href={buildLocalePath("en")}
            aria-current={lang === "en" ? "page" : undefined}
            className={`tracking-wide text-white ${
            currentLang === "en" ? "font-bold text-[18px]" : "font-normal"
            }`}
        >
            EN
        </Link>

        <Link
            href={buildLocalePath("es")}
            aria-current={lang === "es" ? "page" : undefined}
            className={` tracking-wide text-white ${
            currentLang === "es" ? "font-bold text-[18px]" : "font-normal"
            }`}
        >
            ES
        </Link>
        </div>
      </div>
    </header>
  );
}