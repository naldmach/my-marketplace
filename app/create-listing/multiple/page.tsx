"use client";
import { useState } from "react";

export default function CreateMultiplePage() {
  const [listings, setListings] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const lines = listings.split("\n").filter(Boolean);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-50 min-h-screen">
      {/* Left: Form Card */}
      <div className="w-full max-w-sm bg-white rounded-lg border border-border p-6 flex flex-col gap-4 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Create Multiple Listings</h1>
        <form className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-border rounded p-2 text-sm"
          />
          <textarea
            placeholder="Paste your listings here (one per line)"
            className="border border-border rounded p-2 text-sm"
            rows={6}
            value={listings}
            onChange={(e) => setListings(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold w-full mt-2"
          >
            Create Listings
          </button>
        </form>
      </div>
      {/* Right: Preview Card */}
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white rounded-lg border border-border p-6 flex flex-col gap-4 shadow-sm">
          <h2 className="font-bold text-lg mb-2">Preview</h2>
          {lines.length === 0 ? (
            <div className="text-gray-500">No listings yet.</div>
          ) : (
            <ul className="space-y-2">
              {lines.map((line, idx) => (
                <li
                  key={idx}
                  className="border border-blue-200 rounded p-3 bg-blue-50 flex items-center gap-4"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded flex items-center justify-center overflow-hidden">
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
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
