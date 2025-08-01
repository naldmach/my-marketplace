import Link from "next/link";

const listingTypes = [
  {
    title: "Item for sale",
    description:
      "Sell a single item such as electronics, clothing, or accessories.",
    href: "/create-listing/item",
  },
  {
    title: "Create multiple listings",
    description: "Quickly add several items at once, perfect for bulk sellers.",
    href: "/create-listing/multiple",
  },
  {
    title: "Vehicle for sale",
    description: "List a car, motorcycle, or other vehicle for sale.",
    href: "/create-listing/vehicle",
  },
  {
    title: "Home for sale or rent",
    description: "Post a home, apartment, or property for sale or rent.",
    href: "/create-listing/home",
  },
];

export default function ChooseListingTypePage() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mt-8 mb-10 text-center">
        Choose listing type
      </h1>
      <div className="flex flex-row gap-6 justify-center w-full max-w-5xl">
        {listingTypes.map((type) => (
          <Link
            key={type.title}
            href={type.href}
            className="flex flex-col items-center bg-white rounded-lg border border-border shadow-sm px-8 py-8 w-64 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-[repeating-linear-gradient(135deg,#d1d5db_0_2px,transparent_2px,transparent_8px)] rounded-full" />
            </div>
            <div className="font-bold text-center mb-1 text-lg">
              {type.title}
            </div>
            <div className="text-xs text-muted-foreground text-center">
              {type.description}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
