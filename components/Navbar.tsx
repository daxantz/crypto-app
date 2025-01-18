import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/Logo.png";
import home from "@/public/icons/home-2.png";
import portfolio from "@/public/icons/portfolio.png";
import sun from "@/public/icons/sun.png";
import currency from "@/public/icons/currency.png";
import search from "@/public/icons/search.png";
const Navbar = () => {
  return (
    <nav className="flex justify-between border border-orange-400">
      <div className="flex justify-center items-center gap-2">
        <Image src={logo} alt="logo" />
        <span>Crypto App</span>
      </div>
      <div className="flex gap-6">
        <div className="flex gap-2 justify-center items-center">
          <Image src={home} alt="home-icon" />
          Home
          <Link href={"/"}></Link>
        </div>

        <div className="flex gap-2 justify-center items-center">
          <Image src={portfolio} alt="home-icon" />
          <Link href={"/portfolio"}>Portfolio</Link>
        </div>
      </div>
      <div className="border border-purple-500 flex gap-6 flex-shrink-0 ">
        <div className="flex justify-center items-center">
          <Image src={search} alt="search-icon" />
          <input
            className="bg-[#191925] px-4 py-2 w-80 h-12"
            type="text"
            placeholder="Search..."
          />
        </div>

        <div className="flex py-3 px-4 bg-[#191925] gap-2 justify-center items-center">
          <Image src={currency} alt="dollar-sign" />
          <select className="bg-[#191925]" name="currencies" id="currencies">
            <option>USD</option>
            <option>GBP</option>
            <option>EUR</option>
            <option>BTC</option>
            <option>ETH</option>
          </select>
        </div>

        <button className="bg-[#191925] w-12 h-12 flex items-center justify-center">
          <Image src={sun} alt="sun-icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
