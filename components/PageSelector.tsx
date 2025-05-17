"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Skeleton } from "./ui/skeleton";

const PageSelector = () => {
  const pathName = usePathname();
  const { theme } = useTheme();

  const buttons = [
    { href: "/", label: "Coins" },
    { href: "/convertor", label: "Convertor" },
  ];
  if (!theme) return <Skeleton className="w-[30rem] rounded-md h-[48px] " />;
  return (
    <div className="hidden sm:block">
      {buttons.map(({ href, label }) => {
        const isActive = pathName === href;
        const isDark = theme === "dark";

        const baseClasses = "w-[15.25rem] rounded-md py-3 px-4 ";
        const activeClass = "bg-[#6161D680] btn";
        const inactiveDark = "bg-[#232336] text-white";
        const inactiveLight = "bg-white text-black";

        return (
          <Link key={href} href={href}>
            <button
              className={`${baseClasses} ${
                isActive ? activeClass : isDark ? inactiveDark : inactiveLight
              }`}
            >
              {label}
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default PageSelector;
