"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const PageSelector = () => {
  const pathName = usePathname();

  return (
    <div>
      <button
        className={` w-[15.25rem] ${
          pathName === "/" ? "bg-[#6161D680] btn" : "bg-[#232336]"
        } rounded-md py-3 px-4 shadow-[4px_4px_20px_8px_rgba(120, 120, 250, 0.15)]`}
      >
        <Link href={"/"}> Coins</Link>
      </button>
      <button
        className={`w-[15.25rem] ${
          pathName === "/convertor" ? "bg-[#6161D680] btn" : "bg-[#232336]"
        } rounded-md py-3 px-4`}
      >
        <Link href={"/convertor"}> Convertor</Link>
      </button>
    </div>
  );
};

export default PageSelector;
