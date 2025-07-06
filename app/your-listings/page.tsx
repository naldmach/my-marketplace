"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/AuthProvider";
import { supabase } from "../../lib/supabaseClient";

interface Listing {
  id: string;
  title: string;
  price?: string;
  image_url?: string;
  created_at?: string;
}

export default function YourListingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setFetching(true);
      supabase
        .from("listings")
        .select("*")
        .eq("seller_email", user.email)
        .order("created_at", { ascending: false })
        .then(({ data }) => {
          setListings(data || []);
          setFetching(false);
        });
    }
  }, [user]);

  if (loading || (user && fetching)) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Your Listings</h1>
      {listings.length === 0 ? (
        <div className="text-gray-500">
          You have not created any listings yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-lg border border-border shadow-sm p-4 flex flex-col"
            >
              <div className="w-full aspect-square bg-gray-100 rounded mb-3 overflow-hidden flex items-center justify-center">
                {listing.image_url ? (
                  <img
                    src={listing.image_url}
                    alt={listing.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-[repeating-linear-gradient(135deg,#d1d5db_0_2px,transparent_2px,transparent_8px)] rounded" />
                )}
              </div>
              <div className="font-bold text-lg mb-1">{listing.title}</div>
              <div className="text-blue-600 font-semibold mb-1">
                {listing.price ? `$${listing.price}` : ""}
              </div>
              <div className="text-xs text-gray-500">
                {listing.created_at?.slice(0, 10)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
