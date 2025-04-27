import Image from "next/image";
import React from "react";
import search from "@/public/icons/search.png";
const SearchButton = () => {
  return (
    <button className="bg-[#191925] p-2 rounded-md w-12 h-12 flex items-center flex-col justify-center sm:hidden">
      <Image src={search} alt="search icon" />
    </button>
  );
};

export default SearchButton;
