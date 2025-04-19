import CoinConvertor from "@/components/CoinConvertor";
import PageSelector from "@/components/PageSelector";

const page = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_CRYPTO_URL}coins/markets?vs_currency=usd&page=1&per_page=50`,
    {
      method: "GET",
      next: { revalidate: 3600 },
      cache: "force-cache",
    }
  );
  const data = await res.json();

  return (
    <>
      <PageSelector />
      <div>
        <h2>Online currency convertor</h2>
        <p>4/25/25 12:23</p>
        <div className="flex flex-1 border border-red-500 gap-6">
          <CoinConvertor color="#191932" sellOrBuy="sell" coins={data} />
          <CoinConvertor color="#1E1932" sellOrBuy="buy" coins={data} />
        </div>
      </div>
    </>
  );
};

export default page;
