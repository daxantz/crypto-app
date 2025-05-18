"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/Logo.png";
import home from "@/public/icons/home-2.png";
import Home from "@/public/icons/Home.svg";
import portfolio from "@/public/icons/portfolio.png";
import currency from "@/public/icons/currency.png";
import Layers from "@/public/icons/Layers.svg";
import { ModeToggle } from "./ModeToggle";
import SearchInput from "./SearchInput";
import CurrencySelector from "./CurrencySelector";

import { useTheme } from "next-themes";
import { Suspense } from "react";
import { useEffect } from "react";
import { useState } from "react";

const Navbar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Suspense fallback={<p>loading nav bar</p>}>
      <nav className="flex justify-between py-2 px-4">
        <div className="self-center hidden sm:flex sm:gap-4">
          <Image src={logo} alt="logo" className="w-8 h-5 self-center" />
          <span className="hidden sm:block sm:text-xl">Logoipsm</span>
        </div>
        <div className="hidden lg:flex items-center gap-6">
          <div className=" flex gap-[10px]">
            <Image src={theme === "dark" ? home : Home} alt="home-icon" />

            <Link href={"/"}>Home</Link>
          </div>

          <div className="flex gap-[10px]">
            <Image
              src={theme === "dark" ? portfolio : Layers}
              alt="home-icon"
            />
            <Link href={"/portfolio"}>Portfolio</Link>
          </div>
        </div>
        <div>
          <div className="flex gap-2">
            <SearchInput />

            <div className="bg-[#CCCCFA66] dark:bg-[#191925] py-3 px-4 rounded-md flex gap-2">
              <Image
                className="hidden sm:block"
                src={currency}
                alt="dollar-sign"
              />
              <CurrencySelector />
            </div>

            <ModeToggle />
          </div>
        </div>
      </nav>
    </Suspense>
  );
};

export default Navbar;
