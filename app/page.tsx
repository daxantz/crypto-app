import CoinCarousel from "@/components/CoinCarousel";
import CoinTable from "@/components/CoinTable";
import PageSelector from "@/components/PageSelector";

export default function Home() {
  return (
    <div>
      <PageSelector />
      <CoinCarousel />
      <div className="mt-10">
        <CoinTable />
      </div>
    </div>
  );
}
