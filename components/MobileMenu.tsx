"use client";

import Image from "next/image";
import React from "react";
import Overview from "@/public/icons/Overview.svg";
import convert from "@/public/icons/convert.svg";
import portfolio from "@/public/icons/portfolio.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
const MobileMenu = () => {
  const pathname = usePathname();

  return (
    <div className="sm:hidden bg-[#191925E5] py-3 px-4 rounded-sm flex gap-3 justify-around opacity-90 backdrop-blur-3xl fixed bottom-0 left-0 right-0 z-10 ">
      <Link href={"/"}>
        <div
          className={`item ${
            pathname === "/" ? "bg-[#3C3C7E] btn" : ""
          }  py-2 px-4 rounded-md flex flex-col items-center gap-1 justify-evenly text-[10px] font-medium flex-1`}
        >
          <Image src={Overview} alt="home icon" />
          <p>Overview</p>
        </div>
      </Link>
      <Link href={"/convertor"}>
        <div
          className={`item ${
            pathname === "/convertor" ? "bg-[#3C3C7E] btn" : ""
          } py-2 px-4 rounded-md flex flex-col items-center gap-1 justify-evenly text-[10px] font-medium flex-1`}
        >
          <Image src={convert} alt="convert icon" />
          <p>Convertor</p>
        </div>
      </Link>
      <Link href={"portfolio"}>
        <div
          className={`item ${
            pathname === "/portfolio" ? "bg-[#3C3C7E] btn" : ""
          } py-2 px-4 rounded-md flex flex-col items-center gap-1 justify-evenly text-[10px] font-medium flex-1`}
        >
          <Image src={portfolio} alt="portfolio icon" />
          <p>Portfolio</p>
        </div>
      </Link>
    </div>
  );
};

export default MobileMenu;
