import PortfolioContainer from "@/components/PortfolioContainer";
import PortfolioDialog from "@/components/PortfolioDialog";

const Page = () => {
  return (
    <div className="relative">
      <section className="flex justify-between">
        <h2 className="text-2xl font-medium hidden sm:block">Portfolio</h2>
        <PortfolioDialog />
      </section>
      <PortfolioContainer />
    </div>
  );
};

export default Page;
