"use client";
import { useState } from "react";

export default function CreateHomePage() {
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-50 min-h-screen">
      {/* Left: Form Card */}
      <div className="w-full max-w-sm bg-white rounded-lg border border-border p-6 flex flex-col gap-4 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">
          Create Home for Sale or Rent
        </h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Address"
            className="border border-border rounded p-2 text-sm"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price"
            className="border border-border rounded p-2 text-sm"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="border border-border rounded p-2 text-sm"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold w-full mt-2"
          >
            Create Listing
          </button>
        </form>
      </div>
      {/* Right: Preview Card */}
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white rounded-lg border border-border p-6 flex flex-col gap-4 shadow-sm">
          <div className="w-full h-64 bg-blue-100 rounded mb-4 flex items-center justify-center border border-blue-200">
            <div className="w-full h-full bg-[repeating-linear-gradient(135deg,#60a5fa_0_2px,transparent_2px,transparent_8px)] rounded" />
          </div>
          <div className="font-bold text-xl mb-1">{address || "Address"}</div>
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
