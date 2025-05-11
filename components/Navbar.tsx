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
    <nav className="flex justify-between py-2 px-4">
      <div className="self-center hidden sm:flex sm:gap-4">
        <Image src={logo} alt="logo" className="w-8 h-5 self-center" />
        <span className="hidden sm:block sm:text-xl">Logoipsm</span>
      </div>
      <div className="hidden lg:flex items-center gap-6">
        <div className=" flex gap-[10px]">
          <Image src={home} alt="home-icon" />
          <Link href={"/"}>Home</Link>
        </div>

        <div className="flex gap-[10px]">
          <Image src={portfolio} alt="home-icon" />
          <Link href={"/portfolio"}>Portfolio</Link>
        </div>
      </div>
      <div>
        <div className="flex gap-2">
          <SearchInput />

          <div className="bg-[#191925] py-3 px-4 rounded-md flex">
            <Image
              className="hidden sm:block"
              src={currency}
              alt="dollar-sign"
            />
            <CurrencySelector />
          </div>

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
