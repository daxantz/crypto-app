import React from "react";
import { Skeleton } from "./ui/skeleton";
import ChartSkeleton from "./ChartSkeleton";

const CardSkeleton = () => {
  return (
    <div className="mt-20 space-y-6">
      {/* Header text and button placeholder */}
      <div className="flex justify-between px-4">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>

      {/* Carousel content skeletons */}
      <div className="flex gap-4 px-4">
        {[...Array(5)].map(() => (
          <div
            key={crypto.randomUUID()}
            className="basis-[30%] flex gap-2 rounded-lg py-2 px-[10px] bg-white dark:bg-[#181825] border md:flex md:gap-4 md:py-4 md:px-8 sm:basis-[40%] lg:basis-1/5 md:rounded-md"
          >
            <div className="hidden md:block">
              <Skeleton className="w-[50px] h-[35px] rounded-md" />
            </div>
            <div className="md:hidden">
              <Skeleton className="w-[24px] h-[24px] rounded-md" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        ))}
      </div>

      {/* ChartContainer and IntervalSelector placeholder */}
      <div className="px-4 space-y-4">
        <ChartSkeleton />
        <div className="flex justify-between gap-2">
          {[...Array(4)].map(() => (
            <Skeleton
              key={crypto.randomUUID()}
              className="h-8 w-16 rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
