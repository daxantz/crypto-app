import React from "react";

const PortfolioItem = () => {
  return (
    <div className="flex rounded-lg">
      <div className="bg-[#191932] w-[23.7rem] py-6 px-4 flex flex-col gap-8 rounded-l-lg">
        <h2 className="font-bold text-2xl">Bitcoin (BTC)</h2>
        <div className=" flex flex-col gap-2">
          <p>Total Value</p>
          <p className="font-bold text-3xl">
            $29,850 USD <span className="text-base text-[#01F1E3]">6.66%</span>
          </p>
          <p className="text-[#D1D1D1] text-sm">Purchased 2/14/25</p>
        </div>
      </div>
      <div className="bg-[#2D2D51] grid grid-cols-2 flex-1 py-6 px-4 gap-5 rounded-r-xl">
        <div className=" border border-[#191932] rounded-lg px-2 py-3">
          <p>$29,000</p>
          <p className="text-[#D1D1D1] text-sm">Current Price</p>
        </div>
        <div className=" border border-[#191932] rounded-lg px-2 py-3">
          <p>$29,000</p>
          <p className="text-[#D1D1D1] text-sm">24h%</p>
        </div>
        <div className="border border-[#191932] rounded-lg px-2 py-3">
          <div className="flex items-end gap-5">
            <span className="text-[#01F1E3]">44%</span>{" "}
            <progress
              className="progress-bar success flex-1   "
              max={100}
              value={40}
            />
          </div>
          <p className="text-[#D1D1D1] text-sm">Market cap vs volume</p>
        </div>
        <div className=" border border-[#191932] rounded-lg px-2 py-3">
          <p>$29,000</p>
          <p className="text-[#D1D1D1] text-sm">Circ supply vs max supply</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;
