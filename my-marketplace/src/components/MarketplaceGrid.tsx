import React from "react";
import Link from "next/link";

export const mockListings = Array.from({ length: 16 }).map((_, i) => ({
  id: i + 1,
  title: "Lorem ipsum dolor sit",
  price: i === 0 ? "$99" : "$2,300",
  location: "Palo Alto, CA",
  description: "This is a sample description for the item.",
  seller: i % 2 === 0 ? "Wei Gu" : "Greg Wientjes",
  image: "https://placehold.co/400x300/60a5fa/fff?text=Photo",
}));

const MarketplaceGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {mockListings.map((listing) => (
        <Link
          key={listing.id}
          href={`/listing/${listing.id}`}
          className="bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden"
        >
          <div className="w-full aspect-[4/3] bg-blue-100 flex items-center justify-center border-b border-border">
            {listing.image ? (
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[repeating-linear-gradient(135deg,#60a5fa_0_2px,transparent_2px,transparent_8px)]" />
            )}
          </div>
          <div className="p-4 flex flex-col gap-1">
            <div className="font-bold text-lg">{listing.price}</div>
            <div className="text-sm font-semibold">{listing.title}</div>
            <div className="text-xs text-muted-foreground">
              {listing.location}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MarketplaceGrid;
