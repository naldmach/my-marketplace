"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "../../components/AuthProvider";
import { supabase } from "../../lib/supabaseClient";

interface Listing {
  id: string;
  title: string;
  price?: string;
  image_url?: string;
  created_at?: string;
  description?: string;
  location?: string;
  category?: string;
}

export default function YourListingsPage() {
  const { user, loading } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [fetching, setFetching] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editFields, setEditFields] = useState<Partial<Listing>>({});
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

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

  const handleListingClick = (listing: Listing) => {
    setSelectedListing(listing);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedListing(null);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showModal) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const startEdit = () => {
    if (selectedListing) setEditFields(selectedListing);
    setEditMode(true);
    setEditError(null);
  };

  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListing) return;
    setEditLoading(true);
    setEditError(null);
    const { error } = await supabase
      .from("listings")
      .update({
        title: editFields.title,
        price: editFields.price,
        description: editFields.description,
        location: editFields.location,
        category: editFields.category,
      })
      .eq("id", selectedListing.id);
    setEditLoading(false);
    if (error) {
      setEditError(error.message);
    } else {
      // Update local state
      setListings((prev) =>
        prev.map((l) =>
          l.id === selectedListing.id ? { ...l, ...editFields } : l
        )
      );
      setSelectedListing((prev) => (prev ? { ...prev, ...editFields } : prev));
      setEditMode(false);
    }
  };

  if (loading || (user && fetching)) {
    return <div className="p-8 text-center">Loading...</div>;
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
              className="bg-white rounded-lg border border-border shadow-sm p-4 flex flex-col cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleListingClick(listing)}
            >
              <div className="w-full aspect-square bg-gray-100 rounded mb-3 overflow-hidden flex items-center justify-center relative">
                {listing.image_url ? (
                  <Image
                    src={listing.image_url}
                    alt={listing.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={false}
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

      {/* Modal */}
      {showModal && selectedListing && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleModalClick}
        >
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">
                  {editMode ? "Edit Listing" : selectedListing.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              {editMode ? (
                <form onSubmit={saveEdit} className="space-y-4">
                  <input
                    name="title"
                    value={editFields.title || ""}
                    onChange={handleEditChange}
                    className="border border-border rounded p-2 w-full"
                    placeholder="Title"
                    required
                  />
                  <input
                    name="price"
                    value={editFields.price || ""}
                    onChange={handleEditChange}
                    className="border border-border rounded p-2 w-full"
                    placeholder="Price"
                    required
                  />
                  <input
                    name="location"
                    value={editFields.location || ""}
                    onChange={handleEditChange}
                    className="border border-border rounded p-2 w-full"
                    placeholder="Location"
                    required
                  />
                  <select
                    name="category"
                    value={editFields.category || ""}
                    onChange={handleEditChange}
                    className="border border-border rounded p-2 w-full"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home & Garden">Home & Garden</option>
                    <option value="Sports">Sports</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="Books">Books</option>
                    <option value="Other">Other</option>
                  </select>
                  <textarea
                    name="description"
                    value={editFields.description || ""}
                    onChange={handleEditChange}
                    className="border border-border rounded p-2 w-full"
                    placeholder="Description"
                    rows={3}
                    required
                  />
                  {editError && (
                    <div className="text-red-600 text-sm">{editError}</div>
                  )}
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-semibold"
                      disabled={editLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
                      disabled={editLoading}
                    >
                      {editLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="w-full h-64 bg-gray-100 rounded mb-4 overflow-hidden flex items-center justify-center relative">
                    {selectedListing.image_url ? (
                      <Image
                        src={selectedListing.image_url}
                        alt={selectedListing.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 768px"
                        priority={true}
                      />
                    ) : (
                      <div className="w-full h-full bg-[repeating-linear-gradient(135deg,#d1d5db_0_2px,transparent_2px,transparent_8px)] rounded" />
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-lg font-semibold text-blue-600 mb-1">
                        {selectedListing.price
                          ? `$${selectedListing.price}`
                          : "Price not set"}
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Category:</strong>{" "}
                        {selectedListing.category || "Not specified"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">
                        <strong>Location:</strong>{" "}
                        {selectedListing.location || "Not specified"}
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Listed:</strong>{" "}
                        {selectedListing.created_at
                          ? new Date(
                              selectedListing.created_at
                            ).toLocaleDateString()
                          : "Unknown"}
                      </div>
                    </div>
                  </div>

                  {selectedListing.description && (
                    <div className="mb-4">
                      <div className="font-semibold text-gray-800 mb-2">
                        Description
                      </div>
                      <div className="text-gray-600 whitespace-pre-wrap">
                        {selectedListing.description}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-semibold"
                    >
                      Close
                    </button>
                    <button
                      onClick={startEdit}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
                    >
                      Edit Listing
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
