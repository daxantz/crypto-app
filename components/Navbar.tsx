"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/Logo.png";

import { ModeToggle } from "./ModeToggle";
import SearchInput from "./SearchInput";
import CurrencySelector from "./CurrencySelector";

import { Suspense } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { DollarSign, House, Layers } from "lucide-react";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Suspense fallback={<p>loading nav bar</p>}>
      <nav className="flex sm:justify-between py-1  sm:mb-14">
        <div className="self-center hidden sm:flex sm:gap-4">
          <Image src={logo} alt="logo" className="w-8 h-5 self-center" />
          <span className="hidden sm:block sm:text-xl">Logoipsm</span>
        </div>
        <div className="hidden lg:flex items-center gap-6">
          <div className=" flex gap-[10px]">
            <House />

            <Link href={"/"}>Home</Link>
          </div>

          <div className="flex gap-[10px]">
            <Layers />
            <Link href={"/portfolio"}>Portfolio</Link>
          </div>
        </div>
        <div className="w-full sm:w-[45%]">
          <div className="flex gap-2  w-full ">
            <SearchInput />

            <div className="bg-[#CCCCFA66] dark:bg-[#191925] py-3 px-4 rounded-md flex gap-1">
              <DollarSign width={20} />
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
