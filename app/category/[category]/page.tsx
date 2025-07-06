import MarketplaceGrid from "../../../components/MarketplaceGrid";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryName = category.replace(/-/g, " ");
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
      </h1>
      <MarketplaceGrid />
      <div>Listings for {categoryName} (placeholder)</div>
    </div>
  );
}
