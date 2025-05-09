import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/Logo.png";
import home from "@/public/icons/home-2.png";
import portfolio from "@/public/icons/portfolio.png";

import currency from "@/public/icons/currency.png";

import { ModeToggle } from "./ModeToggle";
import SearchInput from "./SearchInput";
import CurrencySelector from "./CurrencySelector";
const Navbar = () => {
  return (
    <nav className="flex justify-between  px-[72px] py-4">
      <div className="flex justify-center items-center gap-2">
        <Image src={logo} alt="logo" />
        <span>Logoipsm</span>
      </div>
      <div className="flex gap-6">
        <div className="flex gap-2 justify-center items-center">
          <Image src={home} alt="home-icon" />

          <Link href={"/"}>Home</Link>
        </div>

        <div className="flex gap-2 justify-center items-center">
          <Image src={portfolio} alt="home-icon" />
          <Link href={"/portfolio"}>Portfolio</Link>
        </div>
      </div>
      <div className=" flex gap-6 flex-shrink-0 relative ">
        <SearchInput />

        <div className="flex py-3 px-4 bg-[#CCCCFA66] dark:bg-[#191925] gap-2 justify-center items-center rounded-md">
          <Image src={currency} alt="dollar-sign" />
          <CurrencySelector />
        </div>

        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
