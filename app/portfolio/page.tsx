import PortfolioContainer from "@/components/PortfolioContainer";
import PortfolioDialog from "@/components/PortfolioDialog";

const Page = () => {
  return (
    <div>
      <section className="flex justify-between">
        <h2 className="text-2xl font-medium">Portfolio</h2>
        <PortfolioDialog />
      </section>
      <PortfolioContainer />
    </div>
  );
};

export default Page;
