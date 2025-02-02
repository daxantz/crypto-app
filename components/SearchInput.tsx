"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import search from "@/public/icons/search.png";
import { useGetAllCurrenciesQuery } from "@/lib/cryptoApi";

import Link from "next/link";

const SearchInput = () => {
  const { data, isLoading } = useGetAllCurrenciesQuery();
  const [searchValue, setSearchValue] = useState("");

  const filteredCoins = useMemo(() => {
    if (searchValue === "") return;
    return data?.filter((coin) =>
      coin.name.toLowerCase().startsWith(searchValue.toLowerCase())
    );
  }, [data, searchValue]);

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
        type="search"
        placeholder="Search..."
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        value={searchValue}
      />
      {filteredCoins !== undefined && searchValue !== "" && (
        <div className="max-h-[564px] w-[22.25rem]  overflow-scroll z-10 absolute bg-[#FFFFFF0D] p-4">
          {filteredCoins?.map((coin) => (
            <Link key={coin.id} href={`/${coin.id}`}>
              <p className="hover:bg-[#ffffff47]">{coin.name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
