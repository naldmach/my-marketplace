"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabaseClient";

export default function CreateItemPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Vehicles",
    "Books",
    "Other",
  ];
  const [category, setCategory] = useState(categories[0]);

  // Redirect to login if not logged in
  if (!loading && !user) {
    router.replace("/login");
    return null;
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    let image_url = null;
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 8)}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("listing-images")
        .upload(fileName, imageFile);
      if (uploadError) {
        setError("Image upload failed: " + uploadError.message);
        setSubmitting(false);
        return;
      }
      const { data: publicUrlData } = supabase.storage
        .from("listing-images")
        .getPublicUrl(fileName);
      image_url = publicUrlData.publicUrl;
    }
    const { error: insertError } = await supabase.from("listings").insert([
      {
        title,
        price,
        description,
        image_url,
        seller_email: user.email,
        category,
      },
    ]);
    setSubmitting(false);
    if (insertError) {
      setError("Failed to create listing: " + insertError.message);
    } else {
      router.push("/your-listings");
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-50 min-h-screen">
      {/* Left: Form Card */}
      <div className="w-full max-w-sm bg-white rounded-lg border border-border p-6 flex flex-col gap-4 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Create Item for Sale</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-border rounded p-2 text-sm"
          />
          <input
            type="text"
            placeholder="Title"
            className="border border-border rounded p-2 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Price"
            className="border border-border rounded p-2 text-sm"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="border border-border rounded p-2 text-sm"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <select
            className="border border-border rounded p-2 text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold w-full mt-2"
            disabled={submitting}
          >
            {submitting ? "Creating..." : "Create Listing"}
          </button>
        </form>
      </div>
      {/* Right: Preview Card */}
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white rounded-lg border border-border p-6 flex flex-col gap-4 shadow-sm">
          <div className="w-full h-64 bg-blue-100 rounded mb-4 flex items-center justify-center border border-blue-200 overflow-hidden">
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-[repeating-linear-gradient(135deg,#60a5fa_0_2px,transparent_2px,transparent_8px)] rounded" />
            )}
          </div>
          <div className="font-bold text-xl mb-1">{title || "Title"}</div>
          <div className="text-lg font-semibold mb-1">
            {price ? `$${price}` : "Price"}
          </div>
          <div className="text-xs text-muted-foreground mb-2">
            Listed just now
          </div>
          <div className="font-bold text-sm mb-1">Description</div>
          <div className="text-sm mb-4">
            {description || "No description yet."}
          </div>
        </div>
      </div>
    </div>
  );
}
