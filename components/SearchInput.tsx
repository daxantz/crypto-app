"use client";

import Image from "next/image";
import React, { useState } from "react";
import search from "@/public/icons/search.png";

import Link from "next/link";

import { useDebouncedSearchParams } from "@/lib/hooks/useDebounceSearch";
import { Skeleton } from "./ui/skeleton";

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading } = useDebouncedSearchParams(searchValue);

  if (isLoading) return <Skeleton className="rounded-md w-[262px]" />;

  return (
    <form>
      <div className="flex justify-center items-center relative rounded-md ">
        <Image
          className="object-contain absolute left-3 top-3.5 hidden sm:block"
          src={search}
          alt="search-icon"
          width={20}
          height={20}
        />
      </div>
      <input
        className="bg-[#CCCCFA66] dark:bg-[#191925] px-2 sm:px-12 sm:py-2  h-12 rounded-md "
        type="search"
        placeholder="Search..."
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        value={searchValue}
      />
      {data && data?.length > 1 && (
        <div
          className={`max-h-[564px] w-[22.25rem]  overflow-scroll overflow-x-hidden z-10 absolute bg-[#1f1c1c] p-4 flex flex-col gap-4${
            searchValue ? "" : "hidden"
          }`}
        >
          {data?.map((coin) => (
            <Link
              className="flex gap-3"
              key={coin.id}
              href={`/${coin.id}`}
              onClick={() => setSearchValue("")}
            >
              <Image src={coin.thumb} alt="coin logo" width={25} height={25} />
              <p className="hover:bg-[#ffffff47 self-center">{coin.name}</p>
            </Link>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchInput;
