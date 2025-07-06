"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Listing = {
  id: string;
  title: string;
  price: string;
  location: string;
  image_url?: string;
};

const MarketplaceGrid: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      const { data, error } = await supabase
        .from("listings")
        .select("id, title, price, location, image_url")
        .order("created_at", { ascending: false });
      if (error) {
        setError(error.message);
      } else {
        setListings(data || []);
      }
      setLoading(false);
    }
    fetchListings();
  }, []);

  if (loading)
    return <div className="p-8 text-center">Loading listings...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!listings.length)
    return <div className="p-8 text-center">No listings found.</div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <Link
          key={listing.id}
          href={`/listing/${listing.id}`}
          className="bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden"
        >
          <div className="w-full aspect-[4/3] bg-blue-100 flex items-center justify-center border-b border-border">
            {listing.image_url ? (
              <img
                src={listing.image_url}
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
