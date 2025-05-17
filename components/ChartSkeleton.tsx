"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ChartSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
      {[1, 2].map((item) => (
        <div
          key={item}
          className="bg-white dark:bg-[#191932] border dark:border-none w-full sm:w-1/2 flex flex-col gap-6 p-6 rounded-xl"
        >
          {/* Title */}
          <Skeleton className="h-6 sm:h-8 w-1/2 rounded" />

          {/* Price */}
          <Skeleton className="h-6 sm:h-8 w-1/3 rounded" />

          {/* Date */}
          <Skeleton className="h-4 sm:h-6 w-1/4 rounded" />

          {/* Chart Area */}
          <Skeleton className="h-[200px] w-full rounded-md" />

          {/* Comparison Section */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-sm bg-[#7878FA]" />
              <Skeleton className="h-6 w-32 rounded" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-sm bg-[#D878FA]" />
              <Skeleton className="h-6 w-32 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChartSkeleton;
