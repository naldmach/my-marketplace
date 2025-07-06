import { supabase } from "../../../lib/supabaseClient";
import Image from "next/image";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: listing } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();

  if (!listing) {
    return <div className="p-8 text-center">Listing not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="w-full h-96 bg-gray-100 relative">
          {listing.image_url ? (
            <Image
              src={listing.image_url}
              alt={listing.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority={true}
            />
          ) : (
            <div className="w-full h-full bg-[repeating-linear-gradient(135deg,#d1d5db_0_2px,transparent_2px,transparent_8px)] flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
          <div className="text-2xl font-semibold text-blue-600 mb-4">
            ${listing.price}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <strong>Category:</strong> {listing.category}
            </div>
            <div>
              <strong>Location:</strong> {listing.location || "Not specified"}
            </div>
            <div>
              <strong>Listed:</strong>{" "}
              {new Date(listing.created_at).toLocaleDateString()}
            </div>
            <div>
              <strong>Seller:</strong> {listing.seller_email}
            </div>
          </div>
          {listing.description && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap">
                {listing.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
