"use client";

import Image from "next/image";
import React from "react";
import search from "@/public/icons/search.png";
const SearchInput = () => {
  return (
    <div>
      <div className="flex justify-center items-center relative rounded-md ">
        <Image
          className="object-contain absolute left-3 top-3.5"
          src={search}
          alt="search-icon"
          width={20}
          height={20}
        />
      </div>
      <input
        className="bg-[#CCCCFA66] dark:bg-[#191925] px-12 py-2 w-80 h-12 rounded-md "
        type="text"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchInput;
