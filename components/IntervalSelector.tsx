import { useSearchParams, useRouter } from "next/navigation";

import React from "react";

const IntervalSelector = ({
  setDays,
  days,
}: {
  setDays: React.Dispatch<React.SetStateAction<string>>;
  days: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const newday = (e.target as HTMLInputElement).id;
    setDays(newday);
    params.set("days", newday);
    router.push(`?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="flex gap-2 border bg-[#a7a7d0] dark:border-none dark:bg-[#232336] sm:w-[28rem] rounded-sm mt-4 sm:mt-12 justify-evenly">
      <div
        onClick={handleClick}
        id="1"
        className={`py-2 px-5 rounded-md w-14 ${
          days === "1" ? "btn bg-[#6161D680" : ""
        }`}
      >
        1D
      </div>

      <div
        onClick={handleClick}
        id="14"
        className={`py-2 px-5 rounded-md w-14 ${
          days === "14" ? "btn bg-[#6161D680] " : ""
        }`}
      >
        14D
      </div>
      <div
        onClick={handleClick}
        id="30"
        className={`py-2 px-5 rounded-md w-14 ${
          days === "30" ? "btn bg-[#6161D680]" : ""
        }`}
      >
        1M
      </div>
      <div
        onClick={handleClick}
        id="7"
        className={`py-2 px-5 rounded-md w-14 ${
          days === "7" ? "btn bg-[#6161D680]" : ""
        }`}
      >
        1W
      </div>
      <div
        onClick={handleClick}
        id="365"
        className={`py-2 px-5 rounded-md w-14 ${
          days === "365" ? "btn bg-[#6161D680]" : ""
        }`}
      >
        1Y
      </div>
    </div>
  );
};

export default IntervalSelector;
