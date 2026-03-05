"use client";


import Image from "next/image";
import Link from "next/link";
export default function Header() {


    return (
    <header className="flex justify-between items-center px-6 py-4 bg- text-white bg-[#FDB608]">
        
        <Link href="/" className="font-bold text-lg place-content-center bg-center">
            <Image
            src = "https://www.clipartmax.com/png/full/71-713336_harry-potter-logo-harry-potter-logo-png.png"
            alt = "harry potter"
            className="place-content-center "
            width={200} height={200}
          />
        </Link>
    </header>
    );
}