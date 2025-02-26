import React from "react";

const IntervalSelector = ({
  setDays,
  days,
}: {
  setDays: React.Dispatch<React.SetStateAction<string>>;
  days: string;
}) => {
  return (
    <div className="flex gap-2 bg-[#232336] w-[28rem] rounded-sm mt-12">
      <div
        onClick={(e) => setDays((e.target as HTMLInputElement).id)}
        id="1"
        className={`py-2 px-5 rounded-md w-14 ${
          days === "1" ? "btn bg-[#6161D680" : ""
        }`}
      >
        1D
      </div>

      <div
        onClick={(e) => setDays((e.target as HTMLInputElement).id)}
        id="7"
        className={`py-2 px-5 rounded-md w-14 ${
          days === "7" ? "btn bg-[#6161D680]" : ""
        }`}
      >
        7D
      </div>
      <div
        onClick={(e) => setDays((e.target as HTMLInputElement).id)}
        id="14"
        className={`py-2 px-5 rounded-md w-14 ${
          days === "14" ? "btn bg-[#6161D680] " : ""
        }`}
      >
        14D
      </div>
      <div
        onClick={(e) => setDays((e.target as HTMLInputElement).id)}
        id="30"
        className={`py-2 px-5 rounded-md w-14 ${
          days === "30" ? "btn bg-[#6161D680]" : ""
        }`}
      >
        1M
      </div>
      <div
        onClick={(e) => setDays((e.target as HTMLInputElement).id)}
        id="7"
        className={`py-2 px-5 rounded-md w-14 ${
          days === "7" ? "btn bg-[#6161D680]" : ""
        }`}
      >
        1W
      </div>
      <div
        onClick={(e) => setDays((e.target as HTMLInputElement).id)}
        id="365"
        className={`py-2 px-5 rounded-md w-14 ${
          days === "365" ? "btn bg-[#6161D680]" : ""
        }`}
      >
        1Y
      </div>
      <div
        onClick={(e) => setDays((e.target as HTMLInputElement).id)}
        id="1826"
        className={`py-2 px-5 rounded-md w-14 ${
          days === "1826" ? "btn bg-[#6161D680]" : ""
        }`}
      >
        5Y
      </div>
    </div>
  );
};

export default IntervalSelector;
