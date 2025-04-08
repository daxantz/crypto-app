import React from "react";
import Image from "next/image";
import comparsion from "@/public/icons/comparison.svg";
type CompareButtonProps = {
  isComparing: boolean;
  setIsComparing: React.Dispatch<React.SetStateAction<boolean>>;
};
const CompareButton = ({ isComparing, setIsComparing }: CompareButtonProps) => {
  return (
    <button
      onClick={() => setIsComparing((isComparing) => !isComparing)}
      className="bg-[#232336] py-3 px-6 rounded-md flex gap-2"
    >
      {" "}
      {isComparing && <span>X Exit Comparison</span>}
      <Image
        className={`${isComparing && "hidden"}`}
        src={comparsion}
        alt="comparison icon"
      />{" "}
      <span className={`${isComparing && "hidden"}`}>Compare</span>
    </button>
  );
};

export default CompareButton;
