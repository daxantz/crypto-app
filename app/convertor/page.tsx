import ConvertorContainer from "@/components/ConvertorContainer";
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
    <div className="flex flex-col gap-10">
      <PageSelector />
      <div>
        <h2>Online currency convertor</h2>
        <p>4/25/25 12:23</p>
        <ConvertorContainer data={data} />
      </div>
    </div>
  );
};

export default page;
