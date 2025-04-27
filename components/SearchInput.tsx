"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import search from "@/public/icons/search.png";
import { useGetAllCurrenciesQuery } from "@/lib/cryptoApi";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import { useEffect } from "react";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading } = useGetAllCurrenciesQuery(
    searchParams.get("search") || ""
  );

  const router = useRouter();

  const searchDebounce = useMemo(
    () =>
      debounce((query: string) => {
        // use the latest input value here
        const params = new URLSearchParams(searchParams); // clone

        if (searchValue) {
          params.set("search", query);
        } else {
          params.delete("search");
        }
        router.replace(`?${params.toString()}`);
      }, 500),
    [router, searchParams, searchValue]
  );
  useEffect(() => {
    searchDebounce(searchValue);
  }, [searchValue, searchDebounce]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <form className="hidden sm:block">
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
