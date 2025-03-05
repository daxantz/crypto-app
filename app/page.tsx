import CoinCarousel from "@/components/CoinCarousel";
import CoinTable from "@/components/CoinTable";

export default function Home() {
  return (
    <div>
      <CoinCarousel />
      <div className="mt-10">
        <CoinTable />
      </div>

      <p>coins</p>
    </div>
  );
}
