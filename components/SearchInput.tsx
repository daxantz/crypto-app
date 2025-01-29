"use client";

import Image from "next/image";
import React, { useState } from "react";
import search from "@/public/icons/search.png";
import { useGetAllCurrenciesQuery } from "@/lib/cryptoApi";
import { searchCoins } from "@/lib/types/searchCoin";
const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filterCoins, setFilterCoins] = useState<searchCoins[] | undefined>([]);
  const { data, isLoading } = useGetAllCurrenciesQuery();
  if (isLoading) return <p>Loading...</p>;

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
        className="bg-[#CCCCFA66] dark:bg-[#191925] px-12 py-2 w-[22.25rem] h-12 rounded-md "
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setSearchValue(e.target.value);
          setTimeout(() => {
            if (searchValue === "") return;
            setFilterCoins(() => {
              return data?.filter((coin) => {
                return coin.name.toLowerCase().includes(searchValue);
              });
            });
          }, 1000);
        }}
      />
      {filterCoins !== undefined && searchValue !== "" && (
        <div className="h-[564px] w-[22.25rem] border border-red-500 overflow-scroll z-10 absolute bg-[#FFFFFF0D] p-4">
          {filterCoins.map((coin) => (
            <p key={coin.id}>{coin.name}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
