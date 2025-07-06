import { supabase } from "../../../lib/supabaseClient";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: listing, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !listing) {
    return <div className="p-8 text-center text-xl">Listing not found.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-50 min-h-screen">
      {/* Left: Large Image Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl aspect-square bg-white rounded-lg border border-border flex items-center justify-center shadow-sm overflow-hidden">
          {listing.image_url ? (
            <img
              src={listing.image_url}
              alt={listing.title}
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <div className="w-full h-full bg-[repeating-linear-gradient(135deg,#60a5fa_0_2px,transparent_2px,transparent_8px)] rounded" />
          )}
        </div>
      </div>
      {/* Right: Details Card */}
      <div className="w-full max-w-md bg-white rounded-lg border border-border p-6 flex flex-col gap-4 shadow-sm">
        <div className="font-bold text-2xl mb-1">{listing.title}</div>
        <div className="text-xl font-bold mb-2">{listing.price}</div>
        <div className="text-xs text-muted-foreground mb-2">
          Listed 1 hour ago
          <br />
          in {listing.location}
        </div>
        <div className="font-bold text-sm mb-1">Seller Information</div>
        <div className="text-sm mb-4">{listing.seller_email}</div>
        <div className="font-semibold mb-2">Send seller a message</div>
        <textarea
          className="w-full border border-border rounded p-2 mb-2 text-sm"
          rows={3}
          placeholder="I want to buy your bike!"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold w-full">
          Send
        </button>
      </div>
    </div>
  );
}
