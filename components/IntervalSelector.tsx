import { useSearchParams, useRouter } from "next/navigation";

import React from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const IntervalSelector = ({
  setDays,
}: {
  setDays: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  function handleClick(value: string) {
    setDays(value);
    params.set("days", value);
    router.push(`?${params.toString()}`, { scroll: false });
  }
  return (
    <ToggleGroup
      type="single"
      defaultValue="30"
      onValueChange={handleClick}
      className="border bg-[#a7a7d0] dark:border-none dark:bg-[#232336] sm:w-[28rem] rounded-sm mt-4 sm:mt-12 justify-around "
    >
      <ToggleGroupItem
        value="1"
        id="1"
        aria-label="Toggle bold"
        aria-description="1"
        className="dark:data-[state=on]:bg-[#6161D680]"
      >
        1D
      </ToggleGroupItem>
      <ToggleGroupItem
        value="7"
        aria-label="Toggle italic"
        className="dark:data-[state=on]:bg-[#6161D680]"
      >
        1W
      </ToggleGroupItem>
      <ToggleGroupItem
        value="14"
        aria-label="Toggle strikethrough"
        className="dark:data-[state=on]:bg-[#6161D680]"
      >
        14D
      </ToggleGroupItem>
      <ToggleGroupItem
        value="30"
        aria-label="Toggle strikethrough"
        className="dark:data-[state=on]:bg-[#6161D680]"
      >
        1M
      </ToggleGroupItem>
      <ToggleGroupItem
        value="365"
        aria-label="Toggle strikethrough"
        className="dark:data-[state=on]:bg-[#6161D680] "
      >
        1Y
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
export default IntervalSelector;
