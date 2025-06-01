"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

const PageSelector = () => {
  const pathName = usePathname();

  return (
    <div className="hidden sm:block w-[31rem] ">
      <ToggleGroup
        className="hidden sm:block"
        type="single"
        defaultValue={pathName}
      >
        <Link href={"/"}>
          <ToggleGroupItem
            className="dark:data-[state=on]:bg-[#6161D680] dark:data-[state=off]:bg-[#232336] px-4 py-3 w-1/2"
            value="/"
          >
            Coins
          </ToggleGroupItem>
        </Link>
        <Link href={"/convertor"}>
          <ToggleGroupItem
            className="dark:data-[state=on]:bg-[#6161D680] w-1/2 dark:data-[state=off]:bg-[#232336]"
            value="/convertor"
          >
            Convertor
          </ToggleGroupItem>
        </Link>
      </ToggleGroup>
    </div>
  );
};

export default PageSelector;
