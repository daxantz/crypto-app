import { Skeleton } from "@/components/ui/skeleton";

const MarketDataSkeleton = () => {
  return (
    <div className="flex gap-8 bg-[#353570] text-white p-4 justify-center text-xs items-center border-y border-[#FFFFFF1A]">
      <div className="hidden sm:flex gap-2 items-center">
        <Skeleton className="w-4 h-4 rounded-full" />
        <Skeleton className="w-16 h-4 rounded" />
      </div>
      <div className="hidden sm:flex gap-2 items-center">
        <Skeleton className="w-4 h-4 rounded" />
        <Skeleton className="w-16 h-4 rounded" />
      </div>
      <div className="hidden md:flex gap-2 items-center">
        <Skeleton className="w-5 h-5 rounded" />
        <Skeleton className="w-20 h-4 rounded" />
      </div>
      <Skeleton className="w-20 h-4 rounded" />
      <div className="flex items-center gap-[5px]">
        <Skeleton className="w-4 h-4 rounded-full" />
        <Skeleton className="w-8 h-4 rounded" />
        <Skeleton className="w-32 h-2 rounded" />
      </div>
      <div className="flex items-center gap-[5px]">
        <Skeleton className="w-4 h-4 rounded-full" />
        <Skeleton className="w-8 h-4 rounded" />
        <Skeleton className="w-32 h-2 rounded" />
      </div>
    </div>
  );
};

export default MarketDataSkeleton;
